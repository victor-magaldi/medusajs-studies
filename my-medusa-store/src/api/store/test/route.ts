
// import { container } from "@medusajs/framework";
// import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
// import { IPricingModuleService } from "@medusajs/framework/types";
// import { Modules } from "@medusajs/framework/utils";

// export async function GET(
//   req: MedusaRequest,
//   res: MedusaResponse
// ) {
//   const pricingModuleService = container.resolve<IPricingModuleService>(
//     Modules.PRICING
//   )
//   const price = await pricingModuleService.calculatePrices(
//     { id: [] },
//     {
//       context: {
//         currency_code: "BRL",
//         region_id: "reg_01KA4S5NB4V1KA12EJTZ7Z8CX4",
//         cart: {
//           items: [
//             {
//               id: "prod_01KA4PSVJ76NF6856H3ZA3T8Y2",
//               quantity: 1,
//               variant_id: "variant_01KA4PSVPBZMKJNXE4TSPBH1NT",
//             },
//           ],
//         },
//       } as any,
//     }
//   )

//   return res.json({ teste: true }).sendStatus(200);
// }



// import { container } from "@medusajs/framework";
import { ContainerRegistrationKeys, QueryContext } from "@medusajs/framework/utils"
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
// import { IPricingModuleService } from "@medusajs/framework/types";
// import { Modules } from "@medusajs/framework/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  // const { data: products } = await query.graph({
  //   entity: "product",
  //   fields: [
  //     "*"
  //   ],
  //   filters: {
  //     variants: {
  //       id: "variant_01KA4PSVPBZMKJNXE4TSPBH1NT"
  //     }
  //   },
  //   context: {
  //     variants: {
  //       calculated_price: QueryContext({
  //         region_id: "reg_01KA4S2QAA49E32WYJC3BDAD4J",
  //         currency_code: "BRL",
  //       }),
  //     },
  //   },
  // })

  const { data: variants } = await query.graph({
    entity: "product",
    filters: {
      id: "prod_01KA4PSVJ76NF6856H3ZA3T8Y2"
    },
    fields: [
      "*variants.calculated_price,+variants.inventory_quantity"
    ],
    context: {
      region_id: "reg_01KA4S2QAA49E32WYJC3BDAD4J"
    },
    strategy: "select-in"
  })


  return res.json({ variants }).sendStatus(200);
}

