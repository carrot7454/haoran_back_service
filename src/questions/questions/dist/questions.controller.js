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
exports.QuestionsController = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var common_1 = require("@nestjs/common");
var QuestionsController = /** @class */ (function () {
    function QuestionsController(questionsService) {
        this.questionsService = questionsService;
    }
    QuestionsController.prototype.addQuestion = function (body) {
        console.log('============>addQuestion', body);
        var data = {
            name: body.name,
            pdfUri: body.pdf,
            knowledgeId: body.knowledgeId,
            difficulty: body.difficulty,
            quesPic: body.pics
        };
        var result = this.questionsService.add(data);
        return result;
    };
    QuestionsController.prototype.getDailyQues = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var data, dt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(body);
                        data = {
                            diffcute: body.diffcute,
                            uid: body.uid
                        };
                        return [4 /*yield*/, this.questionsService.getDailyQuestion(data)];
                    case 1:
                        dt = _a.sent();
                        console.log(dt);
                        if (!dt) {
                            return [2 /*return*/, {
                                    code: 400,
                                    data: '没有数据'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 200,
                                    data: dt
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    QuestionsController.prototype.queryQuestions = function () {
        return __awaiter(this, void 0, Promise, function () {
            var dt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.questionsService.queryQuestions()];
                    case 1:
                        dt = _a.sent();
                        console.log(dt);
                        if (!dt) {
                            return [2 /*return*/, {
                                    code: 400,
                                    data: '没有数据'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 200,
                                    data: dt
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    QuestionsController.prototype.addUserQues = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var data, dt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            id: body.id,
                            userId: body.userId,
                            questionId: body.questionId,
                            pics: body.quesPic.map(function (pic) { return ({ uri: pic }); })
                        };
                        return [4 /*yield*/, this.questionsService.addUserQues(data)];
                    case 1:
                        dt = _a.sent();
                        return [2 /*return*/, dt];
                }
            });
        });
    };
    __decorate([
        common_1.Post('add'),
        __param(0, common_1.Body())
    ], QuestionsController.prototype, "addQuestion");
    __decorate([
        common_1.Post('getDailyQues'),
        __param(0, common_1.Body())
    ], QuestionsController.prototype, "getDailyQues");
    __decorate([
        common_1.Post('queryQuestions')
    ], QuestionsController.prototype, "queryQuestions");
    __decorate([
        common_1.Post('addUserQues'),
        __param(0, common_1.Body())
    ], QuestionsController.prototype, "addUserQues");
    QuestionsController = __decorate([
        common_1.Controller('questions')
    ], QuestionsController);
    return QuestionsController;
}());
exports.QuestionsController = QuestionsController;
