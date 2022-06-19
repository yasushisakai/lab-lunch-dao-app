import { FC } from "react"

type IPastVote = {
    id: string,
    name: string,
    when: number,
    footprint: number,
    cater: string
}

type IPastVoteItemProps = {
    pastVote: IPastVote
}

const PastVoteItem: FC<IPastVoteItemProps> = ({pastVote}) =>{
    const {id, name, when:timestamp, footprint, cater} = pastVote;

    const when = new Date(timestamp);

    return(<div className="card flex flex-row">
        <div className="flex-1 flex flex-col">
            <div className="text-xs">{when.toDateString()}</div>
            <div className="font-bold">{name}</div>
            <div className="text-xs">{cater}</div>
        </div>
        <div className="flex flex-col text-center justify-center">
            <div className="font-bold">{footprint}</div>
            <div className="text-xs">kgCo2e</div>
        </div>
    </div>)
}


export default PastVoteItem;