export async function GetPriceFromJup(mintAd) {
    
    if (mintAd.toString() === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"){
        return 1; // Jup API bases off USDC
    }

    const resp = await fetch(`https://api.jup.ag/price/v2?ids=${mintAd}`).catch((e) => {
        return 0
    });
    
    const priceData = await resp.json();

    if (!priceData?.data[mintAd.toString()]?.price) {
        //console.log(`No price for ${mintAd.toString()}`, priceData);
        return 0;
    }

    return priceData.data[mintAd.toString()].price;
}