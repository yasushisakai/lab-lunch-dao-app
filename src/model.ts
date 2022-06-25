import { PublicKey } from "@solana/web3.js"
import BN from "bn.js"

export type CaterAccount = {
    name: string,
    menus: any[]
}

export interface CaterInfo {
    name: string,
    menu: MenuItem[]
}

export interface Topic {
    publicKey: PublicKey,
    name: string,
    description: string,
    voteDue: BN,
    seqNo: BN,
    options: PublicKey[],
    quorum: number,
    finalized: boolean,
    voteNum: number
}

export enum TopicType {
    Cater,
    Lunch,
}

export interface MenuItem {
    name: string,
    footPrint: number,
    cost: number
}
