import { cancelAllOrders, createOrder } from "./orders";

// Buy USDT with INR, buy the coin with USDT and then sell the coin for INR
export const buyWithUsdtStrategy = async (
    market: string,
    price: number,
    quantity: number,
    cancel: boolean
) => {
    if (cancel) {
        await cancelAllOrders(market);
        return;
    }

    try {
        await createOrder(
            "buy",
            "USDTINR",
            price,
            quantity,
            Math.random().toString()
        );
    } catch (error) {
        console.log("buyWithUsdtStrategy error:", error);
        await cancelAllOrders(market);
    }
};
