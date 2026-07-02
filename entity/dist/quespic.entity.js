"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuesPic = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var typeorm_1 = require("typeorm");
var ques_entity_1 = require("./ques.entity");
var QuesPic = /** @class */ (function () {
    function QuesPic() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], QuesPic.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: 'longtext', nullable: true })
    ], QuesPic.prototype, "uri");
    __decorate([
        typeorm_1.CreateDateColumn({ nullable: true })
    ], QuesPic.prototype, "createTime");
    __decorate([
        typeorm_1.UpdateDateColumn({ nullable: true })
    ], QuesPic.prototype, "updateTime");
    __decorate([
        typeorm_1.ManyToOne(function () { return ques_entity_1.Question; }, function (question) { return question.quesPic; })
    ], QuesPic.prototype, "question");
    QuesPic = __decorate([
        typeorm_1.Entity({ name: 'quespic' })
    ], QuesPic);
    return QuesPic;
}());
exports.QuesPic = QuesPic;
