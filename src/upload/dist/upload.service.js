"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UploadService = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var common_1 = require("@nestjs/common");
var qiniu_1 = require("qiniu");
var axios_1 = require("axios");
var UploadService = /** @class */ (function () {
    function UploadService() {
    }
    UploadService.prototype.uploadFile = function (file) {
        return __awaiter(this, void 0, Promise, function () {
            var accessKey, secretKey, bucketName, auth, options, putPolicy, uploadToken, base64, config, data, dt, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessKey = '2jIO9Fv8KwIB3Sgwgnkmulk8D2c8CqrUDiifsT98';
                        secretKey = 'fF_h_SBOit2y_-yvV_ORsmvmK86uRNYc2ROQSCP7';
                        bucketName = 'shizhiquestions';
                        console.log(accessKey, secretKey, bucketName);
                        auth = new qiniu_1["default"].auth.digest.Mac(accessKey, secretKey);
                        options = {
                            scope: bucketName,
                            expires: 7200
                        };
                        putPolicy = new qiniu_1["default"].rs.PutPolicy(options);
                        uploadToken = putPolicy.uploadToken(auth);
                        base64 = file.base64.replace(/^.*?base64,/, '');
                        config = new qiniu_1["default"].conf.Config();
                        config.zone = qiniu_1["default"].zone.Zone_z1;
                        data = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].request({
                                url: "https://upload-z1.qiniup.com/putb64/-1/keys/" + file.name,
                                method: 'POST',
                                headers: {
                                    Authorization: "UpToken " + uploadToken,
                                    'content-type': 'application/octet-stream'
                                },
                                data: base64
                            })];
                    case 2:
                        dt = _a.sent();
                        data = {
                            code: 200,
                            data: dt.data,
                            message: '上传成功'
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('上传失败', error_1);
                        data = {
                            code: 500,
                            data: error_1 instanceof Error ? error_1.message : String(error_1),
                            message: '上传失败'
                        };
                        return [3 /*break*/, 4];
                    case 4:
                        console.log('--------->data');
                        console.log(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    UploadService = __decorate([
        common_1.Injectable()
    ], UploadService);
    return UploadService;
}());
exports.UploadService = UploadService;
// const fileSize = (str: string): number => {
//   let filesize = 0;
//   if (str.indexOf('=') > 0) {
//     const indexOf = str.indexOf('=');
//     str = str.substring(0, indexOf); //把末尾的’=‘号去掉
//   }
//   filesize = Math.round(str.length - (str.length / 8) * 2);
//   return filesize;
// };
// const saveBase64 = (base64: string): string => {
//   return base64.replace('+', '-').replace('/', '_');
// };
