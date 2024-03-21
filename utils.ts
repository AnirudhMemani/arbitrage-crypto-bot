import { DepthManager } from "./DepthManager";
import { marketDetails, type TMarketDetail } from "./orders";

export const AvailableMarkets = {
    Solana: {
        INR_PAIR: "B-SOL_INR",
        USDT_PAIR: "B-SOL_USDT",
        MARKET_INFO: "SOLINR",
    },
    Bitcoin: {
        INR_PAIR: "B-BTC_INR",
        USDT_PAIR: "B-BTC_USDT",
        MARKET_INFO: "BTCINR",
    },
} as const;

export type typeofAvailableMarkets = keyof typeof AvailableMarkets;

export const getReturnsInfo = async (market: typeofAvailableMarkets) => {
    const coin = AvailableMarkets[market];

    const coinInrMarket = new DepthManager(coin.INR_PAIR);

    const usdtInrMarket = new DepthManager("B-USDT_INR");

    const coinUsdtMarket = new DepthManager(coin.USDT_PAIR);

    setInterval(async () => {
        const marketInfo: TMarketDetail | undefined = await marketDetails(
            coin.MARKET_INFO
        );

        const MINIMUM_QUANTITY = marketInfo?.min_quantity;
        let initialInr =
            (await coinInrMarket.getRelevantDepth()).highestBid + 0.001;

        if (MINIMUM_QUANTITY) {
            initialInr *= MINIMUM_QUANTITY;
        }

        console.log("\n\nMinimum order quantity:", MINIMUM_QUANTITY);

        console.log("Initial INR", initialInr);

        console.log(
            `\n\nBuy ${market} with INR, sell ${market} for USDT and then sell USDT for INR:`
        );

        const canGetCoin =
            initialInr /
            ((await coinInrMarket.getRelevantDepth()).lowestAsk + 0.01);

        console.log(
            `\nI can get these many ${market} from my initial INR:`,
            canGetCoin
        );

        const canGetUsdt =
            ((await coinUsdtMarket.getRelevantDepth()).highestBid - 0.01) *
            canGetCoin;

        console.log(
            `I can get these many USDT by selling ${market} for USDT:`,
            canGetUsdt
        );

        const canGetInr =
            ((await usdtInrMarket.getRelevantDepth()).highestBid - 0.01) *
            canGetUsdt;

        console.log(
            "This is the amount of INR I can get from selling USDT:",
            canGetInr
        );

        const PROFIT_OR_LOSS = canGetInr - initialInr;

        console.log(
            `\nProfit or Loss from buying ${market} with INR:`,
            PROFIT_OR_LOSS
        );

        console.log(
            `\n\nBuy USDT with INR, buy ${market} with USDT, sell USDT for INR`
        );

        const canGetUsdt2 =
            initialInr / (await usdtInrMarket.getRelevantDepth()).lowestAsk +
            0.01;

        console.log(
            `\nI can get these many USDT from my initial INR:`,
            canGetUsdt2
        );

        const canGetCoin2 =
            canGetUsdt2 /
            ((await coinUsdtMarket.getRelevantDepth()).lowestAsk + 0.001);

        console.log(`I can buy these many ${market} with USDT`, canGetCoin2);

        const canGetInr2 =
            ((await coinInrMarket.getRelevantDepth()).highestBid - 0.001) *
            canGetCoin2;

        console.log(
            `I can get this much INR from selling the ${market} for INR:`,
            canGetInr2
        );

        const PROFIT_OR_LOSS2 = canGetInr2 - initialInr;

        console.log(
            "\nProfit or Loss from buying SOL with USDT:",
            PROFIT_OR_LOSS2
        );

        console.log(
            "\n-----------------------------------------------------------------------------------------"
        );
    }, 3500);
};
