import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { json } from "stream/consumers"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  // return <h1>teste {JSON.stringify(cart)}</h1>
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)

  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")
  console.log('%c🤪 ~ file: index.tsx:21 : ', 'color: #b3445c', "checkout-container", shippingMethods, paymentMethods);

  if (!shippingMethods
    // || !paymentMethods
  ) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      teste
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      {/* <Payment cart={cart} availablePaymentMethods={paymentMethods} /> */}

      <Review cart={cart} />
    </div>
  )
}
