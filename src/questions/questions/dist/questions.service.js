"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.QuestionsService = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var ques_entity_1 = require("entity/ques.entity");
var userques_entity_1 = require("entity/userques.entity");
var typeorm_2 = require("typeorm");
var QuestionsService = /** @class */ (function () {
    function QuestionsService(questionRepository, userquesRepository) {
        this.questionRepository = questionRepository;
        this.userquesRepository = userquesRepository;
    }
    QuestionsService.prototype.add = function (body) {
        var _a;
        var question = this.questionRepository.create({
            name: body.name,
            pdfUri: body.pdfUri,
            difficulty: body.difficulty,
            isdeleted: false,
            quesPic: ((_a = body.quesPic) !== null && _a !== void 0 ? _a : []).map(function (uri) { return ({ uri: uri }); })
        });
        return question;
    };
    QuestionsService.prototype.queryQuestions = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.questionRepository.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QuestionsService.prototype.getDailyQuestion = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var ques, obj, ret, arr, question, i, _ret, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(data);
                        return [4 /*yield*/, this.userquesRepository.find()];
                    case 1:
                        ques = _a.sent();
                        console.log(ques);
                        obj = ques.find(function (item) { return item.is_daily == 1; });
                        console.log(obj);
                        if (!!obj) return [3 /*break*/, 7];
                        arr = ques.map(function (item) { return item.id; });
                        return [4 /*yield*/, this.questionRepository.find({
                                where: {
                                    difficulty: typeorm_2.Between(data.diffcute - 1, data.diffcute + 1),
                                    id: typeorm_2.Not(typeorm_2.In(arr))
                                }
                            })];
                    case 2:
                        question = _a.sent();
                        console.log(question);
                        ret = null;
                        if (question.length) {
                            i = Math.floor(Math.random() * question.length);
                            console.log(i);
                            ret = question[i];
                        }
                        if (!ret) return [3 /*break*/, 6];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.userquesRepository.save({
                                is_daily: 1,
                                quesId: ret.id,
                                uid: data.uid,
                                status: 0,
                                err_times: 0
                            })];
                    case 4:
                        _ret = _a.sent();
                        console.log(_ret);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.questionRepository.findOne({
                            where: { id: obj.quesId }
                        })];
                    case 8:
                        ret = _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/, ret];
                }
            });
        });
    };
    QuestionsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(ques_entity_1.Question)),
        __param(1, typeorm_1.InjectRepository(userques_entity_1.UserQues))
    ], QuestionsService);
    return QuestionsService;
}());
exports.QuestionsService = QuestionsService;
