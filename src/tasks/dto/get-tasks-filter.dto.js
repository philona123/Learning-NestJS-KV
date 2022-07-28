"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetTasksFilterDto = void 0;
var class_validator_1 = require("class-validator");
var task_model_1 = require("../task.model");
var GetTasksFilterDto = /** @class */ (function () {
    function GetTasksFilterDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(task_model_1.TaskStatus)
    ], GetTasksFilterDto.prototype, "status");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], GetTasksFilterDto.prototype, "search");
    return GetTasksFilterDto;
}());
exports.GetTasksFilterDto = GetTasksFilterDto;
