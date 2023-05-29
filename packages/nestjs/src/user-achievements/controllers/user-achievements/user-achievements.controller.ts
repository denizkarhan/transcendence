import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AchievementsService } from 'src/achievements/service/achievements/achievements.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { UserAchievementDto } from 'src/user-achievements/dtos/user-achievements.dto';
import { UserAchievementsService } from 'src/user-achievements/services/user-achievements/user-achievements.service';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('user-achievements')
@ApiTags('user-achievements')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserAchievementsController {

    constructor(private userService: UsersService, private userAchievementsService: UserAchievementsService, private achievementsService: AchievementsService,) {}
    
    @Post('addAchievement/:id')
    @UseFilters(ExceptionHandleFilter)
    async addUserAchievement(@Param('id') id:number, @Request() req) {
        const achievement = await this.achievementsService.getArchievementById(id);
        if (!achievement) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return await this.userAchievementsService.addAchievement(id, req.user);
    }

    @Get()
    @UseFilters(ExceptionHandleFilter)
    @UseInterceptors(ClassSerializerInterceptor)   
    async getUserAchievements(@Request() req) {
        const user = await this.userService.findById(req.user.Id);
        if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        return await this.userAchievementsService.getUserAchievements(user);
    }

}
