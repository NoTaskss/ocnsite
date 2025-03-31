import {
    ENDPOINT,
    Currency,
    MAINNET_PROGRAM_ID,
    RAYDIUM_MAINNET,
    Token,
    TOKEN_PROGRAM_ID,
    TxVersion,
  } from '@raydium-io/raydium-sdk';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import {Connection, PublicKey} from '@solana/web3.js';

export const connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_API)
export const secure_connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_2_RPC_API)  
export const PROGRAMIDS = MAINNET_PROGRAM_ID;

export const _ENDPOINT = ENDPOINT;

export const RAYDIUM_MAINNET_API = RAYDIUM_MAINNET;

export const makeTxVersion = TxVersion.V0; // LEGACY
  
export const DEFAULT_TOKEN = {
  'SOL': new Currency(9, 'SOL', 'SOL'),
  'WSOL': new Token(TOKEN_PROGRAM_ID, new PublicKey('So11111111111111111111111111111111111111112'), 9, 'WSOL', 'WSOL'),
  'USDC': new Token(TOKEN_PROGRAM_ID, new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), 6, 'USDC', 'USDC'),
  'RAY': new Token(TOKEN_PROGRAM_ID, new PublicKey('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'), 6, 'RAY', 'RAY'),
  'RAY_USDC-LP': new Token(TOKEN_PROGRAM_ID, new PublicKey('FGYXP4vBkMEtKhxrmEBcWN8VNmXX8qNgEJpENKDETZ4Y'), 6, 'RAY-USDC', 'RAY-USDC'),
}

export const RAYDIUM_WALLET_ADD = "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"

export const OCN_PRESALE_WALLET = new PublicKey("njn1so89wFgpL2jNAARMooHYE1RkHN9Fwe8xcTaZXUG")


export const OCN_PRESALE_SOURCE_WALLET = new PublicKey("ANMRCS7qnBTtR3TNCqJ2RywXsce9w3ACSe5hHpPy8wDy")

export const OCN_TOKEN = new Token(TOKEN_2022_PROGRAM_ID, new PublicKey('F4Ug9nbhB8Qz89QLsBvcCet4XBcStZHpZgs57fZjKCDB'), 6, 'OCN', 'OCN')

export const GAS_OPTIONS = 
[
  {"index": 0, "display": "Level 1", "value": 0.0023, "units": 101000, "microLamps": 23000149},
  {"index": 1, "display": "Level 2", "value": 0.003, "units": 102000, "microLamps": 30200298},
  {"index": 2, "display": "Level 3", "value": 0.0045, "units": 103000, "microLamps": 43200298},
  {"index": 3, "display": "Level 4", "value": 0.01, "units": 108000, "microLamps": 100000023},
  {"index": 4, "display": "Level 5", "value": 0.02, "units": 108000, "microLamps": 190000023},
  {"index": 5, "display": "Level 6", "value": 0.03, "units": 108000, "microLamps": 280000020}
]
// [
//   {
//       index: 0,
//       display:"Normal",
//       value: 0.00002,
//       units: 90000,
//       microLamps: 121377
//   },
//   {
//       index: 1,
//       display:"Fast",
//       value: .00013,
//       units: 101337,
//       microLamps: 1203491
//   },
//   {
//       index: 2,
//       display:"Rapid",
//       value: .0023,
//       units: 101000,
//       microLamps: 23000149
      
//   }
// ]