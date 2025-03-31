export {};

declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
        connect: () => Promise<any>;
        disconnect: () => Promise<void>;
        publicKey: {
          toBase58: () => string;
        };
      };
    };
  }
}