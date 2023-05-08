"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
require("reflect-metadata");
const typeorm_1 = require("@nestjs/typeorm");
const users_1 = require("./typeorm/entities/users");
const users_module_1 = require("./users/users.module");
const achievements_module_1 = require("./achievements/achievements.module");
const stats_module_1 = require("./stats/stats.module");
const match_histories_module_1 = require("./match-histories/match-histories.module");
const user_achievements_module_1 = require("./user-achievements/user-achievements.module");
const friends_1 = require("./typeorm/entities/friends");
const stats_1 = require("./typeorm/entities/stats");
const achievements_1 = require("./typeorm/entities/achievements");
const userAchievements_1 = require("./typeorm/entities/userAchievements");
const matchHistories_1 = require("./typeorm/entities/matchHistories");
const friends_module_1 = require("./friends/friends.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '1',
                database: 'ft_transcendence',
                entities: [users_1.User, friends_1.Friend, stats_1.Stats, achievements_1.Achievements, userAchievements_1.UserAchievements, matchHistories_1.MatchHistories],
                synchronize: true,
            }), users_module_1.UsersModule, achievements_module_1.AchievementsModule, stats_module_1.StatsModule, match_histories_module_1.MatchHistoriesModule, user_achievements_module_1.UserAchievementsModule, friends_module_1.FriendsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map