const axios = require('axios');
require('dotenv').config();

const BASE_URL = "https://api.0x.org/swap/permit2";

/**
 * Fetches a firm quote using 0x API.
 */
async function fetchFirmQuote(sellToken, buyToken, sellAmount, chainId = '534352') {
    const params = {
        chainId,
        sellToken,
        buyToken,
        sellAmount,
        taker: process.env.USER_TAKER_ADDRESS,
        affiliateAddress: process.env.USER_TAKER_ADDRESS,  // for monetization
        feeRecipient: process.env.USER_TAKER_ADDRESS,      // for surplus collection
        buyTokenPercentageFee: 0.01  // 1% affiliate fee
    };

    const headers = {
        '0x-api-key': process.env.API_KEY,
        '0x-version': 'v2'
    };

    try {
        const response = await axios.get(`${BASE_URL}/quote`, { params, headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching quote: ", error.response?.data || error.message);
        return null;
    }
}

/**
 * Fetches liquidity sources available on Scroll.
 */
async function fetchLiquiditySources(chainId = '534352') {
    const headers = {
        '0x-api-key': process.env.API_KEY,
        '0x-version': 'v2'
    };

    try {
        const response = await axios.get(`${BASE_URL}/sources`, { params: { chainId }, headers });
        return response.data.sources;
    } catch (error) {
        console.error("Error fetching liquidity sources: ", error.response?.data || error.message);
        return null;
    }
}

module.exports = {
    fetchFirmQuote,
    fetchLiquiditySources
};
