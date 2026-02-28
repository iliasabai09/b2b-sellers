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

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
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

    const member = await this.prisma.companyMember.findUnique({
      where: {
        userId_companyId: { userId, companyId },
      },
      select: { role: true, status: true },
    });

    if (!member) throw new ForbiddenException('Not a company member');
    if (member.status !== 'ACTIVE')
      throw new ForbiddenException('Member inactive');

    if (!requiredRoles.includes(member.role as ROLE)) {
      throw new ForbiddenException('Insufficient role');
    }

    // можно сохранить, чтобы дальше не дергать БД
    // req.companyMember = member;

    return true;
  }
}
