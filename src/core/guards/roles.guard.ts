import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@core/prisma/prisma.service';
import { ROLE } from '@modules/auth/enums/role.enum';
import { UserReq } from '@shared/types/req-user.type';
import { ROLES_KEY } from '@core/decorators/roles.decorator';
import { RedisService } from '@core/modules/redis/redis.service';

interface Member {
  status: string;
  role: ROLE;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles?.length) return true;

    const req: UserReq = context.switchToHttp().getRequest();

    const userId: number | undefined = req.user?.sub;

    const companyId: number | null | undefined = req.user?.companyId;

    if (!userId) throw new UnauthorizedException('No user in request');
    if (!companyId) throw new ForbiddenException('No active company in token');

    const cacheKey = `companyMember:${userId}:${companyId}`;
    let member = (await this.redisService.getJson(cacheKey)) as Member;
    if (!member) {
      member = (await this.prisma.companyMember.findUnique({
        where: {
          userId_companyId: { userId, companyId },
        },
        select: { role: true, status: true },
      })) as Member;
      await this.redisService.setJson(cacheKey, member, 1000 * 60 * 15);
    }

    if (!member) throw new ForbiddenException('Not a company member');
    if (member.status !== 'ACTIVE')
      throw new ForbiddenException('Member inactive');

    if (!requiredRoles.includes(member.role)) {
      throw new ForbiddenException('Insufficient role');
    }

    // можно сохранить, чтобы дальше не дергать БД
    // req.companyMember = member;

    return true;
  }
}
