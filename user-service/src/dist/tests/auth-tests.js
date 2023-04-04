"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
const fixtures_1 = require("./fixtures");
const auth_utils_1 = __importDefault(require("../utils/auth-utils"));
(0, chai_1.should)();
chai_1.default.use(chai_http_1.default);
const utils = new auth_utils_1.default();
class AuthTests {
    login() {
        describe("POST /auth/login", () => {
            it("login process should work perfectly", (done) => {
                chai_1.default.request(server_1.default).post("/auth/login").send({ email: fixtures_1.correctUser.email, password: fixtures_1.correctUser.password }).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("id");
                    res.body.should.have.property("username");
                    res.body.should.not.have.property("password");
                    res.body.should.have.property("accessToken");
                    res.body.should.have.property("role");
                    res.should.have.cookie("refreshToken");
                    done();
                });
            });
        });
    }
    logout() {
        describe("POST /auth/logout", () => {
            it("should delete cookies successfuly", (done) => {
                chai_1.default.request(server_1.default).post("/auth/logout").end((err, res) => {
                    res.should.have.status(203);
                    res.body.should.not.have.cookie();
                    done();
                });
            });
        });
    }
    refreshToken() {
        describe("POST /auth/refresh", () => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield utils.generateRefreshToken(fixtures_1.correctUser.id, fixtures_1.correctUser.role);
            it("should return new  access token when given a valid refresh token", (done) => {
                chai_1.default.request(server_1.default).post("/auth/refresh").set("Cookie", `refreshToken=${refreshToken}`).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("token");
                    done();
                });
            });
        }));
    }
    runAllTests() {
        this.login();
        this.logout();
        this.refreshToken();
    }
}
exports.default = AuthTests;
