import { PublicKey } from "@solana/web3.js";

export const shortenAddress = (key: PublicKey):string =>{
    return key.toBase58().substring(0,5);
}