"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AppModule = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var axios_1 = require("@nestjs/axios");
var typeorm_1 = require("@nestjs/typeorm");
var questions_module_1 = require("./questions/questions/questions.module");
var upload_module_1 = require("./upload/upload.module");
var knowladge_module_1 = require("./knowladge/knowladge/knowladge.module");
var auth_module_1 = require("./auth/auth/auth.module");
var path_1 = require("path");
var user_entity_1 = require("entity/user.entity");
var entitiesPaths = [path_1.join(__dirname, '..', 'entity', '*.entity.{ts,js}')];
console.log(entitiesPaths);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                axios_1.HttpModule,
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: '198860',
                    database: 'haoran_study',
                    entities: __spreadArrays(entitiesPaths),
                    synchronize: true,
                    timezone: '+08:00'
                }),
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                knowladge_module_1.KnowladgeModule,
                questions_module_1.QuestionsModule,
                upload_module_1.UploadModule,
                auth_module_1.AuthModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
