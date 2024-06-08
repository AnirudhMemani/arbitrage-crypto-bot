# Arbitrage trading bot for illiquid crypto markets

A crypto trading bot designed to capitalize on arbitrage opportunities in illiquid crypto markets. The bot is built using Bun for its fast runtime capabilities and CoinDCX APIs for market data and trade execution.

# Features

+ Arbitrage Trading: Identifies and exploits price discrepancies between different markets to generate profit.
+ Market Monitoring: Continuously monitors multiple crypto exchanges for arbitrage opportunities.
+ Automated Trading: Executes buy and sell orders automatically to capitalize on identified arbitrage opportunities.
+ Efficient and Fast: Built with Bun to ensure low-latency performance and quick execution.
+ CoinDCX Integration: Uses CoinDCX APIs for real-time market data and trade execution.

# Tech Stack

+ Runtime: Bun
+ API: CoinDCX
+ Language: TypeScript

## To install dependencies:

```bash
bun install
```

## To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.33. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Key Components

## Config

+ Configuration settings for API keys, trading pairs, and other environment-specific variables are stored in the config directory. This includes sensitive information, so ensure this directory is properly secured.

## Services

Services are responsible for interacting with CoinDCX APIs. This includes fetching market data, placing orders, and managing account information. These services ensure the bot can seamlessly communicate with the exchange.

## Strategies

The core logic for identifying arbitrage opportunities is located in the strategies directory. This includes:

+ Price Discrepancy Detection: Algorithms to detect price differences between markets.
+ Order Execution: Logic to execute buy and sell orders based on detected opportunities.
+ Risk Management: Please keep limits to your account to minimize risk and manage exposure in volatile markets.

## Usage

The bot continuously monitors specified trading pairs across different markets on CoinDCX. When it detects a significant price discrepancy, it will automatically execute trades to exploit the arbitrage opportunity.

# Contributing

We welcome contributions from the community! Please fork the repository and submit a pull request with your changes. Ensure that you follow the code style and include appropriate tests for any new features or bug fixes.
