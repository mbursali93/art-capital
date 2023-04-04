"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AuthTests {
    constructor(server) {
        this.server = server;
    }
    login() {
        describe("POST /auth/login", () => {
            it("login process should works perfectly", () => __awaiter(this, void 0, void 0, function* () {
                const response = yield axios_1.default.get('http://localhost:7005/auth/login');
                response.status.should.equal(200);
                response.data.should.deepEqual({ message: 'Hello World!' });
                response.headers.should.have.property('set-cookie');
            }));
        });
    }
}
exports.default = AuthTests;
