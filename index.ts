import { getReturnsInfo } from "./utils";

await getReturnsInfo("Solana");
await getReturnsInfo("Bitcoin");

// setTimeout(async () => {
//     await createOrder("buy", "IOSTINR", 0.5, 200, Math.random().toString());
//     await new Promise((r) => setTimeout(r, 4000));
//     await cancelAllOrders("IOSTINR");
// }, 3000);
