"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ length: 100, unique: true, nullable: true })
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ "default": 0 })
    ], User.prototype, "auth");
    __decorate([
        typeorm_1.Column({ length: 100, nullable: true, unique: true })
    ], User.prototype, "nickname");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], User.prototype, "isDeleted");
    __decorate([
        typeorm_1.Column({ "default": 0 })
    ], User.prototype, "level");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], User.prototype, "ctime");
    __decorate([
        typeorm_1.UpdateDateColumn({ type: 'timestamp' })
    ], User.prototype, "utime");
    User = __decorate([
        typeorm_1.Entity({ name: 'users' })
    ], User);
    return User;
}());
exports.User = User;
