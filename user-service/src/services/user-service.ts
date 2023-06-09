import AuthUtils from "../utils/auth-utils"
import IUserInputs from "../interfaces/interfaces"
import UserRepository from "../database/repository/user-repository"


class UserService {

    utils: AuthUtils
    repository: UserRepository

    constructor() {

        this.utils = new AuthUtils()
        this.repository = new UserRepository()
    }
    
    async register(userInputs: IUserInputs):Promise<IUserInputs> {
        const { username, email, password, avatar, social_media_links, iban } = userInputs
        const id = this.utils.idGenerator()
        const hashedPassword = await this.utils.generateHashedPassword(password)
        const user = await this.repository.register({ id, username, email, password: hashedPassword, avatar, social_media_links, iban }) 
        
        return user;
  
    }

    async login(userInputs: IUserInputs):Promise<IUserInputs> {
        const { email, password } = userInputs

        const user = await this.repository.getUserByEmail(email)
        const correctPassword:boolean = await this.utils.comparePasswords(password, user.password)
        if(!correctPassword) throw new Error("Passwords do not match")

        return user;

    }

    async getUserById(id: string) {
        return await this.repository.getUserById(id)
    }

    async changePassword(id: string, password: string) {
        const hashedPassword = await this.utils.generateHashedPassword(password)
        return await this.repository.changePassword(id, hashedPassword)
    }

    async updateSocialMediaLinks(id: string, links: string) {
        return await this.repository.updateSocialMediaLinks(id, links)
    }
}

export default UserService