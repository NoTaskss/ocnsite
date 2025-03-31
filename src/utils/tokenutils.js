export async function GetTokenTopHolders(mintAd, tokenSupply){

    var topHolders = []

    const tokenMint = new PublicKey(mintAd)

    var result = {
        score: 0,
        risks: [],
    };

        topHolders = await connection.getTokenLargestAccounts(tokenMint, "confirmed")
        topHolders = topHolders.value

        var holderKeys = []
        topHolders.forEach((h) => holderKeys.push(h.address))
        var shortenList = holderKeys //.slice(0,5)
        var accountInfo = await connection.getMultipleParsedAccounts(holderKeys)

        // //IS ATA ACCOUNT FOR TOKEN
        // console.log("TOP HOLDER KEY --- ", topHolders[0].address.toString(), " --- ", topHolders.length, " ---- ",  new Date())

        
        //console.log("HOLDER TRANS ==== ", walletTransactions)

        accountInfo.value.forEach((a, k) => topHolders[k].data = a?.data?.parsed)

        //const poolOpenTimeMilliseconds = markets?.[0]?.data?.poolOpenTime.toNumber()
    
        _analyseHolders(result, topHolders, tokenSupply)

        return {topHolders, result}
}