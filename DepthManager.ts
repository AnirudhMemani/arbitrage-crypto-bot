export class DepthManager {
    private market: string;
    private bids: {
        [key: string]: string;
    };
    private asks: {
        [key: string]: string;
    };
    constructor(market: string) {
        this.bids = {};
        this.asks = {};
        this.market = market;

        setInterval(() => {
            this.pollMarket();
        }, 2500);
    }

    async pollMarket() {
        const res = await fetch(
            `https://public.coindcx.com/market_data/orderbook?pair=${this.market}`
        );

        const depth = await res.json();
        //@ts-ignore
        this.bids = depth.bids;
        //@ts-ignore
        this.asks = depth.asks;
    }

    async getRelevantDepth() {
        let highestBid = -100;
        let lowestAsk = 10000000;
        Object.keys(this.bids).map((x) => {
            if (parseFloat(x) > highestBid) {
                highestBid = parseFloat(x);
            }
        });

        Object.keys(this.asks).map((x) => {
            if (parseFloat(x) < lowestAsk) {
                lowestAsk = parseFloat(x);
            }
        });
        return {
            highestBid,
            lowestAsk,
        };
    }
}
