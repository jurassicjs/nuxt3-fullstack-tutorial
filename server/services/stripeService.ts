import { SubPostRes } from '~/types/SubPostRes';
import { updateStripeCustomerId } from "~/server/database/repositories/userRespository"
import { IUser } from '~/types/IUser';
import Stripe from 'stripe';

const config = useRuntimeConfig()
const stripe = new Stripe(config.private.stripeSecretKey, null);

export async function getSubscribeUrl(lookupKey: string, user: IUser): Promise<SubPostRes> {
 
 const customerEmail = user.email

 const price = await stripe.prices.retrieve(
  lookupKey
 );

 let shouldUpdateUser = false

 if(!user.stripeCustomerId) {
  shouldUpdateUser = true
  const customer = await stripe.customers.create({ email: customerEmail })
  user.stripeCustomerId = customer.id
 }

 const session = await stripe.checkout.sessions.create({
  billing_address_collection: 'auto',
  line_items: [
   {
    price: price.id,
    quantity: 1,

   },
  ],
  mode: 'subscription',
  success_url: `${config.public.appDomain}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${config.public.appDomain}/subscribe/cancel`,
  customer: user.stripeCustomerId
 });

 return {url: session.url, user, shouldUpdateUser}
}