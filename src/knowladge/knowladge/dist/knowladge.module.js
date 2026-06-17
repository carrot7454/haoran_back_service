"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.KnowladgeModule = void 0;
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
var common_1 = require("@nestjs/common");
var knowladge_controller_1 = require("./knowladge.controller");
var typeorm_1 = require("@nestjs/typeorm");
var knowladge_entity_1 = require("entity/knowladge.entity");
var knowladge_service_1 = require("./knowladge.service");
var class_entity_1 = require("entity/class.entity");
var KnowladgeModule = /** @class */ (function () {
    function KnowladgeModule() {
    }
    KnowladgeModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([knowladge_entity_1.KnowladgeEntity, class_entity_1.ClassEntity])],
            controllers: [knowladge_controller_1.KnowladgeController],
            providers: [knowladge_service_1.KnowladgeService]
        })
    ], KnowladgeModule);
    return KnowladgeModule;
}());
exports.KnowladgeModule = KnowladgeModule;
