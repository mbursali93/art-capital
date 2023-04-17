import Stripe from "stripe";
import jwt, { JwtPayload } from "jsonwebtoken"

const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
    apiVersion: '2022-11-15',
  });

class PaymentUtils {

    async payment(amount: number): Promise<void> {
        const charge = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            payment_method: "pm_card_visa",
             confirm: true,
  })
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

  async verifyAccessToken(token:string) {
    try {
      const user = await jwt.verify(token, process.env.JWT_ACCESS || "") as JwtPayload
      return user;
    }catch {
      throw new Error("Something went wrong on verification of access token")
    }
  }
} 

export default PaymentUtils;