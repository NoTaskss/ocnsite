export function FormatNumber(num, dec) {
    if(!num){return 0}
    if (num >= 1e12) return (num / 1e12)?.toFixed(dec ? dec : 1)?.replace(/\.0$/, '') + 'T';
    if (num >= 1e9) return (num / 1e9)?.toFixed(dec ? dec : 1)?.replace(/\.0$/, '') + 'B';
    if (num >= 1e6) return (num / 1e6)?.toFixed(dec ? dec : 1)?.replace(/\.0$/, '') + 'M';
    if (num >= 1e3) return (num / 1e3)?.toFixed(dec ? dec : 1)?.replace(/\.0$/, '') + 'K';
    if (num < 1e3) return (num)?.toFixed(dec ? dec : 1)
    return num?.toString();
  }

export function FormatToCommaFixed(num){
  return parseFloat(num?.toFixed(2))?.toLocaleString()?.replace(/\.([0-9])$/, ".$10");
}

export function ShortenPublicKeyString(key){
  return key?.slice(0,4)+"..."+key.slice(key.length - 4, key.length)
}