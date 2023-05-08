"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAchievements = void 0;
const typeorm_1 = require("typeorm");
const achievements_1 = require("./achievements");
const users_1 = require("./users");
let UserAchievements = class UserAchievements {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAchievements.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.User, (user) => user.Id),
    __metadata("design:type", users_1.User)
], UserAchievements.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => achievements_1.Achievements),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", achievements_1.Achievements)
], UserAchievements.prototype, "Achivement", void 0);
UserAchievements = __decorate([
    (0, typeorm_1.Entity)({ name: "userAchievements" })
], UserAchievements);
exports.UserAchievements = UserAchievements;
//# sourceMappingURL=userAchievements.js.map