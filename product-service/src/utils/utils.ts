import jwt, { JwtPayload } from "jsonwebtoken"

class Utils {

    async verifyAccessToken(token: string) {
        const secret = process.env.JWT_ACCESS
        if(!secret) throw new Error("There is no token secret")
        const user = await jwt.verify(token, secret) as JwtPayload
        return user;
        
    }
}

export default Utils