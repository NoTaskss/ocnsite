export function GetCachedData(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null; // No cache found
  
    const { value, expiry } = JSON.parse(cached);

    if(expiry){
      const now = new Date();
    
      if (now.getTime() > expiry) {
        localStorage.removeItem(key); // Expired, remove cache
        return null;
      }
    }
  
    return value; // Return cached value
}


export function SetCachedDataWithExpire(key, value, expirationInMinutes) {
    const now = new Date();
    const expiry = now.getTime() + expirationInMinutes * 60000; // Convert minutes to milliseconds
  
    localStorage.setItem(key, JSON.stringify({ value, expiry }));
}

export function SetCachedData(key, value) {  
  localStorage.setItem(key, JSON.stringify({ value }));
}

export function DeleteCacheWithKey(key){
  localStorage.removeItem(key);
}

export function AddTokenToCache(newObject, expirationInMinutes){

  const storedObjects = JSON.parse(localStorage.getItem('recentsearches')) || [];

  const existingIndex = storedObjects.findIndex(obj => obj.mintAd === newObject.mintAd);

  if (existingIndex !== -1) {
    // Object exists, remove it
    storedObjects.splice(existingIndex, 1);
  }

  const now = new Date();
  const expiry = now.getTime() + expirationInMinutes * 60000;

  newObject.expiry = expiry

  console.log("ADDED TO CACHE ", newObject)

  storedObjects.push(newObject);
  
  localStorage.setItem('recentsearches', JSON.stringify(storedObjects));
}

export function GetTokenFromCache(mintAd){
  // Retrieve and parse the stored array
  const storedObjects = JSON.parse(localStorage.getItem('recentsearches')) || [];

  console.log("GOT ALL CACHE ", storedObjects)

  // Find the object
  const existingIndex = storedObjects.findIndex(obj => obj.mintAd === mintAd);

  // Object exists,
  if (existingIndex !== -1) {

    if(storedObjects?.[existingIndex]?.expiry){
      const now = new Date();
    
      if(now.getTime() > storedObjects?.[existingIndex]?.expiry) {
        storedObjects.splice(existingIndex, 1);
        localStorage.setItem('recentsearches', JSON.stringify(storedObjects));
        return null;
      }
    }
  }
  

  return storedObjects?.[existingIndex]
}

export function GetRecentSearches(){
  const storedObjects = JSON.parse(localStorage.getItem('recentsearches')) || [];

  return storedObjects
}

export function GetRecentAllTransactions(){
  const storedObjects = JSON.parse(localStorage.getItem('recentTransactions')) || [];

  return storedObjects
}

export function AddTrxToCache(newObject, meta){

  const storedObjects = JSON.parse(localStorage.getItem('recentTransactions')) || [];

  const existingIndex = storedObjects.findIndex(obj => obj.mintAd === newObject.mintAd);

  if (existingIndex !== -1) {
    // Object exists, remove it
    // storedObjects.splice(existingIndex, 1);
    storedObjects[existingIndex].trans.push(newObject)
  }else{
    storedObjects.push({
      mintAd: newObject.mintAd,
      meta: {...meta},
      trans: [newObject]
    });
  }

  console.log("ADDED TO CACHE ", storedObjects)
  
  localStorage.setItem('recentTransactions', JSON.stringify(storedObjects));
}


