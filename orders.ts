import request from "request";
import crypto from "crypto";
import { key, secret } from "./config";

const baseurl = "https://api.coindcx.com";

const timeStamp = Math.floor(Date.now());

export type TMarketDetail = {
    coindcx_name: string | null;
    base_currency_short_name: string | null;
    target_currency_short_name: string | null;
    target_currency_name: string | null;
    base_currency_name: string | null;
    min_quantity: number | null;
    max_quantity: number | null;
    max_quantity_market: number | null;
    min_price: number | null;
    max_price: number | null;
    min_notional: number | null;
    base_currency_precision: number | null;
    target_currency_precision: number | null;
    step: number | null;
    order_types: string[] | null;
    symbol: string | null;
    ecode: string | null;
    bo_sl_safety_percent: any | null;
    max_leverage: number | null;
    max_leverage_short: number | null;
    pair: string | null;
    status: string | null;
};

export const createOrder = async (
    side: "buy" | "sell",
    market: string,
    price: number,
    quantity: number,
    clientOrderId: string
): Promise<void> => {
    console.log("placing order");
    return new Promise((resolve, reject) => {
        const body = {
            side,
            order_type: "limit_order",
            market,
            price_per_unit: price,
            total_quantity: quantity,
            timestamp: timeStamp,
            client_order_id: clientOrderId,
        };

        const payload = new Buffer(JSON.stringify(body)).toString();
        const signature = crypto
            .createHmac("sha256", secret)
            .update(payload)
            .digest("hex");

        const options = {
            url: baseurl + "/exchange/v1/orders/create",
            headers: {
                "X-AUTH-APIKEY": key,
                "X-AUTH-SIGNATURE": signature,
            },
            json: true,
            body: body,
        };

        request.post(options, function (error, response, body) {
            if (error) {
                console.log("error while cancelling all orders:", error);
                reject(error);
            } else {
                console.log(body);
                resolve();
            }
        });
    });
};

export const cancelMultipleOrdersById = () => {};

export const marketDetails = async (market: string) => {
    return new Promise<TMarketDetail | undefined>((resolve, reject) => {
        request.get(
            baseurl + "/exchange/v1/markets_details",
            function (error, response, body) {
                if (error) {
                    console.log(
                        "There was an error while fetching market details:",
                        error
                    );
                    reject(error);
                } else {
                    const marketInfo: TMarketDetail[] = JSON.parse(
                        response.body
                    );
                    const sortedData = marketInfo.find(
                        (x) => x.coindcx_name === market
                    );
                    resolve(sortedData);
                }
            }
        );
    });
};

export const cancelAllOrders = async (market: string): Promise<void> => {
    console.log("cancelling order");

    return new Promise((resolve, reject) => {
        const body = {
            market,
            timestamp: timeStamp,
        };

        const payload = new Buffer(JSON.stringify(body)).toString();
        const signature = crypto
            .createHmac("sha256", secret)
            .update(payload)
            .digest("hex");

        const options = {
            url: baseurl + "/exchange/v1/orders/cancel_all",
            headers: {
                "X-AUTH-APIKEY": key,
                "X-AUTH-SIGNATURE": signature,
            },
            json: true,
            body: body,
        };

        request.post(options, function (error, response, body) {
            if (error) {
                console.log("error while cancelling all orders:", error);
                reject(error);
            } else {
                console.log(body);
                resolve();
            }
        });
    });
};
