"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TasksService = void 0;
var common_1 = require("@nestjs/common");
var task_model_1 = require("./task.model");
var uuid_1 = require("uuid");
var TasksService = /** @class */ (function () {
    function TasksService() {
        this.tasks = [];
    }
    TasksService.prototype.getAllTasks = function () {
        return this.tasks;
    };
    TasksService.prototype.getTasksWithFilters = function (filterDto) {
        var status = filterDto.status, search = filterDto.search;
        var tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(function (task) { return task.status === status; });
        }
        if (search) {
            tasks = tasks.filter(function (task) {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            });
        }
        return tasks;
    };
    TasksService.prototype.getTaskById = function (id) {
        var found = this.tasks.find(function (task) { return task.id === id; });
        if (!found) {
            throw new common_1.NotFoundException('Task with given id was not found');
        }
        else {
            return found;
        }
    };
    TasksService.prototype.createTask = function (createTaskDto) {
        var title = createTaskDto.title, description = createTaskDto.description; // destructuring assignment
        var task = {
            id: (0, uuid_1.v4)(),
            title: title,
            description: description,
            status: task_model_1.TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    };
    TasksService.prototype.deleteTask = function (id) {
        var found = this.getTaskById(id);
        this.tasks = this.tasks.filter(function (task) { return task.id !== found.id; }); // filter out the task with the given id
    };
    TasksService.prototype.updateTaskStatus = function (id, status) {
        var task = this.getTaskById(id);
        task.status = status;
        return task;
    };
    TasksService = __decorate([
        (0, common_1.Injectable)()
    ], TasksService);
    return TasksService;
}());
exports.TasksService = TasksService;
