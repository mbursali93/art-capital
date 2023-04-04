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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthUtils {
    generateHashedPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            return hashedPassword;
        });
    }
    idGenerator() {
        const id = crypto_1.default.randomBytes(12).toString('hex');
        return id;
    }
    generateAccessToken(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.JWT_ACCESS;
                if (!secret) {
                    throw new Error("There is no accessToken secret");
                }
                const token = yield jsonwebtoken_1.default.sign({ id, role }, secret, { expiresIn: "11m" });
                return token;
            }
            catch (err) {
                throw new Error("Access token generate process failed");
            }
        });
    }
    generateRefreshToken(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.JWT_REFRESH;
            if (!secret) {
                throw new Error("There is no refreshToken secret");
            }
            const token = yield jsonwebtoken_1.default.sign({ id, role }, secret, { expiresIn: "7d" });
            return token;
        });
    }
    comparePasswords(inputPassword, databasePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield bcryptjs_1.default.compare(inputPassword, databasePassword);
            return result;
        });
    }
    getNewToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.JWT_REFRESH;
            if (!secret) {
                throw new Error("There is no refreshToken secret");
            }
            try {
                const user = jsonwebtoken_1.default.verify(refreshToken, secret);
                const token = this.generateAccessToken(user.id, user.role);
                return token;
            }
            catch (err) {
                throw new Error(err.message);
            }
            throw new Error("Unable to generate new token");
        });
    }
}
exports.default = AuthUtils;
