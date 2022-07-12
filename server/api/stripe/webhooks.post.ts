import Stripe from 'stripe';
import { handleSubscriptionChange } from '~~/server/services/stripeService';

export default defineEventHandler(async (event) => {

  const stripeEvent = await readBody<Stripe.Event>(event)

  let subscription: Stripe.Subscription | undefined

  const isSubscriptionEvent = stripeEvent.type.startsWith('customer.subscription')

  if(isSubscriptionEvent){
    handleSubscriptionChange(subscription, stripeEvent.created);
    return `handled ${stripeEvent.type}.`
  }

  console.log(`Unhandled event type ${stripeEvent.type}`);

  event.res.statusCode = 400
  
  return `could not handle ${stripeEvent.type}. No functionality set.`
})