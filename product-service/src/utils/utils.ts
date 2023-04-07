import jwt, { JwtPayload } from "jsonwebtoken"

class Utils {

    async verifyAccessToken(token: string): Promise<JwtPayload> {
        const secret = process.env.JWT_ACCESS
        if(!secret) throw new Error("There is no token secret")
        const user = await jwt.verify(token, secret) as JwtPayload
        return user;
        
    }

    generateAccessToken() {
        const id = process.env.CORRECT_TEST_ID
        const secret = process.env.JWT_ACCESS

        if(secret) return jwt.sign({ id, role: "seller" }, secret, { expiresIn: "11m"})
        
    }
}

export default Utils