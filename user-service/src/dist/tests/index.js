"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_tests_1 = __importDefault(require("./auth-tests"));
const test = new auth_tests_1.default();
// test.login()
// test.logout()
test.runAllTests();
