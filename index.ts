import { DepthManager } from "./DepthManager";

const solInrMarket = new DepthManager("B-SOL_INR");

const usdtInrMarket = new DepthManager("B-USDT_INR");

const solUsdtMarket = new DepthManager("B-SOL_USDT");

setInterval(async () => {
    console.log("solInrMarket", await solInrMarket.getRelevantDepth());
    console.log("usdtInrMarket", await usdtInrMarket.getRelevantDepth());
    console.log("solUsdtMarket", await solUsdtMarket.getRelevantDepth());

    // sell sol for inr, buy usdt from inr, buy sol from inr

    const canGetInr = (await solInrMarket.getRelevantDepth()).lowestAsk - 0.01;
    const canGetUsdt =
        canGetInr / (await usdtInrMarket.getRelevantDepth()).lowestAsk;
    const canGetSol =
        canGetUsdt / (await solUsdtMarket.getRelevantDepth()).lowestAsk;

    console.log(`You can convert ${1} Sol into  ${canGetSol} SOl`);
    // Buy Sol from Inr, sell SOl for USDT, sell USDT for Inr

    const initialInr =
        (await solInrMarket.getRelevantDepth()).highestBid + 0.001;
    const canGetUsdt2 = 1 * (await usdtInrMarket.getRelevantDepth()).highestBid;
    const canGetInr2 =
        (await usdtInrMarket.getRelevantDepth()).highestBid * canGetUsdt2;

    console.log(`You can convert ${initialInr} to ${canGetInr2} Inr`);
}, 2000);
