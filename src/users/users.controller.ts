import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { ImageUploadService } from '../helper/imageupload.service';
import { Role } from '../constants/roles.enum';
import { HasRoles } from '../auth/has-roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
cloudinary.config({
  cloud_name: 'dr54a7gze',
  api_key: '868275163814591',
  api_secret: 'U0-E-H34SF1Dl1vpyroUU361AUQ',
});
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
    private imageUploadService: ImageUploadService,
  ) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/all')
  getUsers(@Paginate() query: PaginateQuery, @Request() req) {
    return this.userService.findAll();
  }

  // @HasRoles(Role.SuperAdmin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(ValidationPipe)
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.registerUser(createUserDto);
  }

  // @Get('/me')
  // @UseGuards(AuthGuard('jwt'))
  // getUser(@CurrentUser() user: any) {
  //   return this.userService.findUsersById(user.userId);
  // }

  // @HasRoles(Role.ADMIN)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Delete('block/:id')
  // async blockUser(@Param('id') id: string) {
  //   const response = await this.userService.blockUserById(+id);
  //   if (response === null) {
  //     throw new UnauthorizedException('User not found');
  //   } else {
  //     return response;
  //   }
  // }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @UsePipes(ValidationPipe)
  async loginSuperAdmin(@Request() req, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(req.user);
    const access_token = { access_token: result.access_token };
    return access_token;
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // @UsePipes(ValidationPipe)
  // async login(@Request() req, @Body() loginDto: LoginDto) {
  //   const result = await this.authService.login(req.user);
  //   const accessToken = {
  //     access_token: result.access_token,
  //   };
  //   return accessToken;
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Patch('/me')
  // @UseInterceptors(FileInterceptor('avatar'))
  // async updateUserMe(
  //   @CurrentUser() currentUser: any,
  //   @Body() updateUser: UpdateUserDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   const imageuploadUrl = await this.imageUploadService.uploadImage(
  //     file?.path,
  //   );
  //   updateUser.avatar = imageuploadUrl;
  //   const { userId } = currentUser;
  //   return this.userService.pathUserById(userId, updateUser);
  // }

  // @Post('/automigrate')
  // async RunScript(@Body() autoMigrate: AdminAuto): Promise<any> {
  //   const key = 123456;
  //   if (autoMigrate.key === key) {
  //     await this.userService.scriptDb();
  //   } else {
  //     throw new UnauthorizedException();
  //   }
  // }
}
