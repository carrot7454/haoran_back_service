"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Question = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var typeorm_1 = require("typeorm");
var quespic_entity_1 = require("./quespic.entity");
var Question = /** @class */ (function () {
    function Question() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Question.prototype, "id");
    __decorate([
        typeorm_1.Column({ length: 100, nullable: true, unique: true })
    ], Question.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: 'longtext', nullable: true })
    ], Question.prototype, "pdfUri");
    __decorate([
        typeorm_1.Column({ type: 'integer', nullable: true })
    ], Question.prototype, "difficulty");
    __decorate([
        typeorm_1.Column({ type: 'integer', nullable: true })
    ], Question.prototype, "knowledgeId");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], Question.prototype, "isdeleted");
    __decorate([
        typeorm_1.OneToMany(function () { return quespic_entity_1.QuesPic; }, function (quesPic) { return quesPic.question; }, {
            cascade: true,
            eager: true
        })
    ], Question.prototype, "quesPic");
    __decorate([
        typeorm_1.CreateDateColumn({ nullable: true })
    ], Question.prototype, "createTime");
    __decorate([
        typeorm_1.UpdateDateColumn({ nullable: true })
    ], Question.prototype, "updateTime");
    Question = __decorate([
        typeorm_1.Entity({ name: 'questions' })
    ], Question);
    return Question;
}());
exports.Question = Question;
