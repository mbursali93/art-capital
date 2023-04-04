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
const auth_utils_1 = __importDefault(require("../utils/auth-utils"));
const user_repository_1 = __importDefault(require("../database/repository/user-repository"));
class UserService {
    constructor() {
        this.utils = new auth_utils_1.default();
        this.repository = new user_repository_1.default();
    }
    register(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, avatar, social_media_links } = userInputs;
            const id = this.utils.idGenerator();
            const hashedPassword = yield this.utils.generateHashedPassword(password);
            const user = yield this.repository.register({ id, username, email, password: hashedPassword, avatar, social_media_links });
            return user;
        });
    }
    login(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userInputs;
            const user = yield this.repository.getUserByEmail(email);
            const correctPassword = yield this.utils.comparePasswords(password, user.password);
            if (!correctPassword)
                throw new Error("Passwords do not match");
            return user;
        });
    }
}
exports.default = UserService;
