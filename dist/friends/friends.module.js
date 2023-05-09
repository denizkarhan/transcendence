"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsModule = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./service/friends/friends.service");
const typeorm_1 = require("@nestjs/typeorm");
const friends_1 = require("../typeorm/entities/friends");
const friends_controller_1 = require("./controllers/friends/friends.controller");
const users_service_1 = require("../users/service/users/users.service");
const users_1 = require("../typeorm/entities/users");
let FriendsModule = class FriendsModule {
};
FriendsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_1.User, friends_1.Friend])],
        controllers: [friends_controller_1.FriendsController],
        providers: [friends_service_1.FriendsService, users_service_1.UsersService]
    })
], FriendsModule);
exports.FriendsModule = FriendsModule;
//# sourceMappingURL=friends.module.js.map