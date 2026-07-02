"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnswerquesEntity = void 0;
var typeorm_1 = require("typeorm");
var answerquespic_entity_1 = require("./answerquespic.entity");
var AnswerquesEntity = /** @class */ (function () {
    function AnswerquesEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], AnswerquesEntity.prototype, "id");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], AnswerquesEntity.prototype, "questionId");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], AnswerquesEntity.prototype, "userId");
    __decorate([
        typeorm_1.Column({ nullable: true, "default": 0 })
    ], AnswerquesEntity.prototype, "status");
    __decorate([
        typeorm_1.OneToMany(function () { return answerquespic_entity_1.AnswerquespicEntity; }, function (pic) { return pic.questionid; }, {
            cascade: true,
            eager: true
        })
    ], AnswerquesEntity.prototype, "pics");
    __decorate([
        typeorm_1.CreateDateColumn({ nullable: true })
    ], AnswerquesEntity.prototype, "createTime");
    __decorate([
        typeorm_1.UpdateDateColumn({ nullable: true })
    ], AnswerquesEntity.prototype, "updateTime");
    AnswerquesEntity = __decorate([
        typeorm_1.Entity('answerques')
    ], AnswerquesEntity);
    return AnswerquesEntity;
}());
exports.AnswerquesEntity = AnswerquesEntity;
