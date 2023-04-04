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
const db_1 = __importDefault(require("../db"));
const auth_query_1 = __importDefault(require("../queries/auth-query"));
class UserRepository {
    constructor() {
        this.db = new db_1.default();
    }
    register(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username, email, password, social_media_links } = userInputs;
            const user = yield this.db.pool.query(auth_query_1.default.registerUser, [id, username, email, password, social_media_links]);
            return user.rows[0];
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.pool.query(auth_query_1.default.getUserByEmail, [email]);
            return user.rows[0];
        });
    }
}
exports.default = UserRepository;
