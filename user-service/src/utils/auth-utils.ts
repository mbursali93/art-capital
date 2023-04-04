import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from "jsonwebtoken"


class AuthUtils {

async generateHashedPassword(password:string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
    
    }

idGenerator():string {
    const id = crypto.randomBytes(12).toString('hex')
    return id
}

async generateAccessToken(id:string, role: string | undefined):Promise<string> {
    const secret = process.env.JWT_ACCESS

    if (!secret) {
        throw new Error("There is no accessToken secret")
      }

     const token = await jwt.sign({ id, role }, secret, { expiresIn: "11m" })
     return token;
}

async generateRefreshToken(id:string, role: string | undefined):Promise<string> {
    const secret = process.env.JWT_REFRESH

    if (!secret) {
        throw new Error("There is no refreshToken secret")
      }

     const token = await jwt.sign({ id, role }, secret, { expiresIn: "7d" })
     return token;
}

async comparePasswords(inputPassword:string, databasePassword:string):Promise<boolean> {
    const result = await bcrypt.compare(inputPassword, databasePassword)
    return result;
}

async getNewToken(refreshToken:string): Promise<any> {
    const secret = process.env.JWT_REFRESH;

    if (!secret) {
      throw new Error("There is no refreshToken secret");
    }
  
    try {
      const user = await jwt.verify(refreshToken, secret) as { id: string, role: string | undefined }; ;
      if (!user) {
        throw new Error();
      }
      const accessToken = await this.generateAccessToken(user.id, user.role);
      return accessToken;
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
}

}

export default AuthUtils
