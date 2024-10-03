const { fetchFirmQuote, fetchLiquiditySources } = require('./api');

async function runChallenge() {
    const sellToken = "0x5300000000000000000000000000000000000004";  // WETH
    const buyToken = "0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32";  // wstETH
    const sellAmount = "100000000000000000000";  // 100 WETH

    console.log("Fetching firm quote...");
    const quote = await fetchFirmQuote(sellToken, buyToken, sellAmount);

    if (quote) {
        console.log("Firm quote response: ");
        console.log(`Buy Token Amount: ${quote.buyAmount}`);
        console.log("Liquidity Breakdown: ");

        const fills = quote.route?.fills || [];
        fills.forEach((fill, index) => {
            console.log(`${index + 1}. Source: ${fill.source}, Proportion: ${fill.proportionBps / 100}%`);
        });

        console.log(`Buy Token Buy Tax: ${quote.tokenMetadata?.buyToken?.buyTaxBps / 100 || 0}%`);
        console.log(`Sell Token Sell Tax: ${quote.tokenMetadata?.sellToken?.sellTaxBps / 100 || 0}%`);
    }

    console.log("\nFetching liquidity sources on Scroll...");
    const liquiditySources = await fetchLiquiditySources();

    if (liquiditySources) {
        console.log("Available liquidity sources on Scroll:");
        liquiditySources.forEach(source => console.log(source));
    }
}

runChallenge();
