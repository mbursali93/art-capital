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
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Database {
    constructor() {
        // this.pool = new Pool({
        //     host: "postgres",
        //     user: process.env.POSTGRES_USER,
        //     password: process.env.POSTGRES_PASSWORD,
        //     database: process.env.POSTGRES_DB,
        //     port: 5431
        // });
        this.pool = new pg_1.Pool({
            host: "localhost",
            user: "postgres",
            password: "rachel123",
            database: "artcapital",
            port: 5432
        });
    }
    createTable() {
        const tablePath = path_1.default.join(__dirname, 'models/user-table.sql');
        const sql = fs_1.default.readFileSync(tablePath, 'utf8');
        this.pool.query(sql);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.pool.connect();
                this.createTable();
                console.log("Database connection is successful");
            }
            catch (e) {
                console.log(e.message);
                process.exit(1);
            }
            finally {
                //if(client) client.release()
            }
        });
    }
}
exports.default = Database;
