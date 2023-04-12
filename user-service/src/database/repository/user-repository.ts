import IUserInputs from "../../interfaces/interfaces";
import Database from "../db";
import query from "../queries/user-query"

class UserRepository {
    db:Database
    constructor() {
        this.db = new Database()
    }
    async register(userInputs: IUserInputs):Promise<IUserInputs> {
        const { id, username, email, password, social_media_links, iban } = userInputs
        const user = await this.db.pool.query(query.registerUser, [id, username, email, password, social_media_links, iban])
        
        return user.rows[0]
      
    }

    async getUserByEmail(email:string):Promise<IUserInputs> {
        const user = await this.db.pool.query(query.getUserByEmail, [email])
        return user.rows[0]
    }

    async getUserIBAN(id:string) :Promise<string> {
        const iban = await this.db.pool.query(query.getUserIBAN, [id])
        return iban.rows[0]
    }
 }

export default UserRepository