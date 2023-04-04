"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_test_1 = __importDefault(require("./auth-test"));
const server_1 = __importDefault(require("../server"));
const test = new auth_test_1.default(server_1.default);
test.login();
