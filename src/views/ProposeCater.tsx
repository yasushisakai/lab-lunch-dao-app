import { useContext, useState, ChangeEvent, useEffect } from "react";
import { WalletContext } from "../workspace";
import { BN } from "bn.js";
import { newKeyPair } from "../util";

export const checkDueInput = (str: string): [Date|null, string] => {
    const now = new Date();
    let due: Date;
    try {
        due = new Date(str);
    } catch {
        return [null, "invalid date"]
    }

    if (due.toString() === 'Invalid Date') {
        return [null, "invalid date"]
    };

    const minimalVotingPeriod = 5 * 60 * 1000; // 5 min
    if (due.valueOf() - now.valueOf() < minimalVotingPeriod) {
        return [null, "Due time needs to be at least 5 minutes in the future"]
    }
    return [due, ""]
}

const ProposeCater = () => {
    const { address, program, group, list } = useContext(WalletContext);
    const [dueDate, setDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");
    const [dueString, setDueString] = useState<string>("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (!dueDate || !dueTime) return;
    }, [dueDate, dueTime]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsDate;
        const id = e.target.id;

        if (value) {
            let newDueString = "";
            if (id === "time") {
                const [hour, minutes] = [value.getUTCHours(), value.getUTCMinutes()];
                const timeStr = `${hour}:${minutes}`
                setDueTime(timeStr);
                newDueString = "".concat(dueDate || "0000-00-00", " ", timeStr || "00:00");
            } else if (id === "date") {
                const [year, month, day] = [value.getFullYear(), value.getUTCMonth(), value.getUTCDate()];
                const dateStr = `${year}-${month + 1}-${day}`;
                setDueDate(dateStr);
                newDueString = "".concat(dateStr || "0000-00-00", " ", dueTime || "00:00");
            }

            const [due, mes] = checkDueInput(newDueString);
            setMessage(mes);

            if (due) {
                setButtonDisabled(false);
                setDueString(newDueString);
            } else {
                setButtonDisabled(true);
            }
        }
    };


    const submit = async () => {
        if (program && address && group && list) {
            const [due, mes] = checkDueInput(dueString);
            setMessage(mes);
            if (due) {
                const topic = newKeyPair();
                setButtonDisabled(true);
                await program.methods.createCaterTopic(new BN((due.valueOf()/1000).toFixed())).accounts({
                    topic: topic.publicKey,
                    group,
                    caterList: list,
                    owner: address
                }).signers([topic]).rpc();
            }
        }
    }


    return (<>
        <h1>Change Cater List</h1>
        <p>This will create a poll to change the short list of caters. Every Lunch will be picked among this approved list.</p>
        <div className="flex flex-col space-y-4 mt-5">
            <p className="font-bold text-lg">people can vote until:</p>
            <div className="flex flex-col">
                <p className="mb-2">vote due date:</p>
                <input id="date" onChange={handleChange} type="date" />
            </div>
            <div className="flex flex-col">
                <p className="mb-2">vote due time: <span className="text-xs">(optional, if left empty will set to 0:00AM)</span></p>
                <input id="time" onChange={handleChange} type="time" />
            </div>
            <div>
                <p className="text-negative font-bold text-xs text-right">{message}</p>
            </div>
            <div className="flex flex-row justify-end">
                <button onClick={submit} disabled={buttonDisabled} className="card flex-none font-bold px-5 disabled:card-disabled">submit</button>
            </div>
        </div>
    </>
    )
}

export default ProposeCater;