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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user-service"));
const auth_utils_1 = __importDefault(require("../utils/auth-utils"));
const service = new user_service_1.default();
const utils = new auth_utils_1.default();
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, social_media_links } = req.body;
                const user = yield service.register(req.body);
                const accessToken = yield utils.generateAccessToken(user.id, user.role);
                const refreshToken = yield utils.generateRefreshToken(user.id, user.role);
                res.cookie("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 1000 * 3600 * 7 * 24 });
                res.status(201).json(Object.assign(Object.assign({}, user), { accessToken }));
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield service.login(req.body);
                const accessToken = yield utils.generateAccessToken(user.id, user.role);
                const refreshToken = yield utils.generateRefreshToken(user.id, user.role);
                res.cookie("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 1000 * 3600 * 7 * 24 });
                const { password } = user, others = __rest(user, ["password"]);
                res.status(200).json(Object.assign(Object.assign({}, others), { accessToken }));
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("refreshToken", { path: "/" });
                res.status(203).json("logged out");
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                const accessToken = yield utils.getNewToken(refreshToken);
                res.status(200).json({ token: accessToken });
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        });
    }
}
exports.default = UserController;
