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
exports.AppController = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var common_1 = require("@nestjs/common");
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.login = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var name, password, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('============>login');
                        console.log(body.name);
                        name = body.name, password = body.password;
                        if (!name) {
                            return [2 /*return*/, { code: 500, message: '用户名不能为空' }];
                        }
                        if (!password) {
                            return [2 /*return*/, { code: 500, message: '密码不能为空' }];
                        }
                        return [4 /*yield*/, this.appService.login(body)];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, { code: 500, message: '用户不存在' }];
                        }
                        if (data.password !== password) {
                            return [2 /*return*/, { code: 500, message: '密码错误' }];
                        }
                        return [2 /*return*/, {
                                code: 200,
                                message: '登录成功',
                                data: {
                                    id: data.id,
                                    name: data.name,
                                    nickname: data.nickname,
                                    auth: data.auth,
                                    level: data.level
                                }
                            }];
                }
            });
        });
    };
    AppController.prototype.regist = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var ret, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(body);
                        ret = {
                            code: 500,
                            message: '注册失败',
                            data: null
                        };
                        console.log(body.name);
                        console.log(body.password);
                        console.log(body.nickname);
                        if (!body.name) {
                            ret.message = '用户名不能为空';
                            return [2 /*return*/, ret];
                        }
                        if (!body.password) {
                            ret.message = '密码不能为空';
                            return [2 /*return*/, ret];
                        }
                        if (!body.nickname) {
                            ret.message = '昵称不能为空';
                            return [2 /*return*/, ret];
                        }
                        return [4 /*yield*/, this.appService.regist(body)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            ret.code = 200;
                            ret.message = '注册成功';
                            ret.data = data;
                        }
                        else {
                            ret.code = 500;
                            ret.message = '注册失败';
                        }
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    __decorate([
        common_1.Post('login'),
        __param(0, common_1.Body())
    ], AppController.prototype, "login");
    __decorate([
        common_1.Post('regist'),
        __param(0, common_1.Body())
    ], AppController.prototype, "regist");
    AppController = __decorate([
        common_1.Controller('user')
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
