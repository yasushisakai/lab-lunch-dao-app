import { PublicKey } from "@solana/web3.js";
import { createContext } from "react";
import { Program } from "@project-serum/anchor";
import { LabLunchDao } from "./types/lab_lunch_dao";

export type WalletType = {
    address: PublicKey | null,
    program: Program<LabLunchDao> | null
    group: PublicKey | null,
    list: PublicKey | null,
}

export const emptyContext: WalletType = {
    address: null,
    program: null,
    group: null,
    list: null,
}

export const WalletContext = createContext(emptyContext);