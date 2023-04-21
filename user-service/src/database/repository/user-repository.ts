import IUserInputs from "../../interfaces/interfaces";
import Database from "../db";
import query from "../queries/user-query"

class UserRepository {

    private db:Database

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

    async updateUserSells(id: string) :Promise<void> {
        await this.db.pool.query(query.updateUserSells, [id])
    }

    async getUserById(id:string) :Promise<IUserInputs>  {
    const user = await this.db.pool.query(query.getUserById, [id])
    return user.rows[0]
 }

    async changePassword(id: string, password:string): Promise<IUserInputs> {
        const user = await this.db.pool.query(query.updateUserPassword, [password, id])
        return user.rows[0]
    }

    async updateSocialMediaLinks(id:string, links: string) {
        const updatedLinks = await this.db.pool.query(query.updateSocialMediaLinks, [id, [links]])
        return updatedLinks
    }
}

export default UserRepository