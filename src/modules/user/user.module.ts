import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FilesModule } from '@core/modules/file/files.module';

@Module({
  imports: [FilesModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
