import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt, { JwtPayload } from "jsonwebtoken"


class AuthUtils {

async generateHashedPassword(password:string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
    
    }

idGenerator():string {
    const id = crypto.randomBytes(12).toString('hex')
    return id
}

async generateAccessToken(id:string | undefined, role: string | undefined):Promise<string> {
    try {
      const secret = process.env.JWT_ACCESS

    if (!secret) {
        throw new Error("There is no accessToken secret")
      }

     const token = await jwt.sign({ id, role }, secret, { expiresIn: "11m" })
     return token;
    } catch(err) {
      throw new Error("Access token generate process failed")
    }
}

async generateRefreshToken(id:string | undefined, role: string | undefined):Promise<string> {
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

async getNewToken(refreshToken: string): Promise<string> {
  const secret = process.env.JWT_REFRESH

  if (!secret) {
    throw new Error("There is no refreshToken secret");
  }

  try {
    const user = jwt.verify(refreshToken, secret) as JwtPayload
    const token = this.generateAccessToken(user.id, user.role)
    return token;    

    
  } catch (err:any) {
    throw new Error(err.message);
  }

  throw new Error("Unable to generate new token");
}

async verifyAccessToken(token: string): Promise<JwtPayload> {
  const secret = process.env.JWT_ACCESS
  if(!secret) throw new Error("There is no token secret")
  const user = await jwt.verify(token, secret) as JwtPayload
  return user;
  
}

}

export default AuthUtils
