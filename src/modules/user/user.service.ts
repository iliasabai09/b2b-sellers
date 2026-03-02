import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { UpdateUserDto } from '@modules/user/dto/requests/update-user.dto';
import { FileService } from '@core/modules/file/file.service';
import { encodeBaseImgUrl } from '@shared/utils/encodeBaseImgUrl';
import { CURRENT_USER_QUERY } from '@modules/user/query/current-user.query';
import { ICurrentUser } from '@modules/user/interfaces/res/current-user.interface';
import { IExistsUser } from '@modules/user/interfaces/res/exists-user.interface';
import { EXISTS_USER_QUERY } from '@modules/user/query/exists-user.query';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService,
  ) {}

  async getCurrentUser(userId: number) {
    const user = (await this.prismaService.user.findUnique({
      where: { id: userId },
      select: CURRENT_USER_QUERY,
    })) as ICurrentUser;

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      ...user,
      photoUrl: user.photoUrl ? encodeBaseImgUrl(user.photoUrl) : '',
    };
  }

  async updateMe(
    userId: number,
    dto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const exists = (await this.prismaService.user.findUnique({
      where: { id: userId },
      select: EXISTS_USER_QUERY,
    })) as IExistsUser;
    if (!exists) throw new NotFoundException('User not found');
    let photoUrl: string | undefined;
    if (file) {
      photoUrl =
        (await this.fileService.updateFile(
          file,
          'profile-photo',
          exists.photoUrl || '',
        )) || '';
    }

    const data = {
      ...dto,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
    };

    if (Object.values(data).every((v) => v === undefined)) {
      throw new BadRequestException('No fields to update');
    }

    const user = (await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...dto,
        photoUrl,
      },
      select: CURRENT_USER_QUERY,
    })) as ICurrentUser;
    return {
      ...user,
      photoUrl: user.photoUrl ? encodeBaseImgUrl(user.photoUrl) : '',
    };
  }
}
