import Stripe from "stripe";


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
}

export default PaymentUtils;