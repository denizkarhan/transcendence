import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AchievementsService } from 'src/achievements/service/achievements/achievements.service';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { UserAchievementDto } from 'src/user-achievements/dtos/user-achievements.dto';
import { UserAchievementsService } from 'src/user-achievements/services/user-achievements/user-achievements.service';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('user-achievements')
@ApiTags('user-achievements')
export class UserAchievementsController {

    constructor(private userService: UsersService, private userAchievementsService: UserAchievementsService, private achievementsService: AchievementsService,) {}
    
    @Post('addAchievement')
    @UseFilters(ExceptionHandleFilter)
    async addUserAchievement(@Body() userAchievementDto: UserAchievementDto) {
        const user = await this.userService.getUserById(userAchievementDto.userId);
        const achievement = await this.achievementsService.getArchievementById(userAchievementDto.achievementId);
        if (!user || !achievement) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return this.userAchievementsService.addAchievement(userAchievementDto);
    }

    @Get('id/:id')
    @UseFilters(ExceptionHandleFilter)
    @UseInterceptors(ClassSerializerInterceptor)   
    async getUserAchievementsById(@Param('id') id: number) {
        const user = await this.userService.getUserById(id);
        if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        return this.userAchievementsService.getUserAchievementsById(id);``
    }

}
