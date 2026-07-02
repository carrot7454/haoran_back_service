"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuestionsModule = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var common_1 = require("@nestjs/common");
var questions_controller_1 = require("./questions.controller");
var questions_service_1 = require("./questions.service");
var typeorm_1 = require("@nestjs/typeorm");
var ques_entity_1 = require("entity/ques.entity");
var userques_entity_1 = require("entity/userques.entity");
var answerques_entity_1 = require("entity/answerques.entity");
var QuestionsModule = /** @class */ (function () {
    function QuestionsModule() {
    }
    QuestionsModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([ques_entity_1.Question, userques_entity_1.UserQues, answerques_entity_1.AnswerquesEntity])],
            controllers: [questions_controller_1.QuestionsController],
            providers: [questions_service_1.QuestionsService]
        })
    ], QuestionsModule);
    return QuestionsModule;
}());
exports.QuestionsModule = QuestionsModule;
