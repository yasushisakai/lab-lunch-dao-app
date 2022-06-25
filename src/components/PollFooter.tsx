import { FC } from "react";

type IPollFooterProps = {
    due: number,
    quora: number,
    current_votes: number;
}

const PollFooter: FC<IPollFooterProps> = ({due, quora, current_votes}) => {
    //TODO: Date.now() can be unreliable
    const timeLeftInHours = ((due*1000 - (new Date()).valueOf()) / (3600*1000)).toFixed()

    return (
        <div className="w-full flex flex-col bg-base p-2 font-bold">
            <div className="flex flex-row justify-between">
                <span>time remaining:</span>
                <span className="text-xl">{timeLeftInHours} hours</span>
            </div>
            <div className="flex flex-row justify-between">
                <span>minimal vote required:</span>
                <span className="text-xl">{current_votes}/{quora}</span>
            </div>
        </div>
    )
};

export default PollFooter;