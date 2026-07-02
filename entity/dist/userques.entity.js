"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserQues = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var typeorm_1 = require("typeorm");
var UserQues = /** @class */ (function () {
    function UserQues() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], UserQues.prototype, "id");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserQues.prototype, "quesId");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], UserQues.prototype, "uid");
    __decorate([
        typeorm_1.Column({ type: 'integer', nullable: true, "default": 0 })
    ], UserQues.prototype, "status");
    __decorate([
        typeorm_1.Column({ type: 'integer', nullable: true, "default": 0 })
    ], UserQues.prototype, "is_daily");
    __decorate([
        typeorm_1.Column()
    ], UserQues.prototype, "score");
    __decorate([
        typeorm_1.Column({ nullable: true, "default": 0 })
    ], UserQues.prototype, "err_times");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], UserQues.prototype, "c_time");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], UserQues.prototype, "u_time");
    UserQues = __decorate([
        typeorm_1.Entity('userques')
    ], UserQues);
    return UserQues;
}());
exports.UserQues = UserQues;
