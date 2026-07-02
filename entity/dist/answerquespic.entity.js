"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnswerquespicEntity = void 0;
var answerques_entity_1 = require("./answerques.entity");
var typeorm_1 = require("typeorm");
var AnswerquespicEntity = /** @class */ (function () {
    function AnswerquespicEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], AnswerquespicEntity.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: 'longtext', nullable: true })
    ], AnswerquespicEntity.prototype, "uri");
    __decorate([
        typeorm_1.ManyToOne(function () { return answerques_entity_1.AnswerquesEntity; }, function (question) { return question.pics; })
    ], AnswerquespicEntity.prototype, "questionid");
    AnswerquespicEntity = __decorate([
        typeorm_1.Entity('answerquespic')
    ], AnswerquespicEntity);
    return AnswerquespicEntity;
}());
exports.AnswerquespicEntity = AnswerquespicEntity;
