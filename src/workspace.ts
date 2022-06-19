import { PublicKey } from "@solana/web3.js";
import { createContext } from "react";

export type WalletType = {
    address: PublicKey | null
}

export const WalletContext = createContext({address: null} as WalletType);