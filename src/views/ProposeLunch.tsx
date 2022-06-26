import { useEffect, useContext, useState, ChangeEvent } from "react";
import { WalletContext } from "../workspace";
import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { LabLunchDao } from "../types/lab_lunch_dao";
import { checkDueInput } from "./ProposeCater";
import { BN } from "bn.js";
import { newKeyPair } from "../util";
import Wrapper from "../components/Wrapper";


type Option = {
    publicKey: PublicKey,
    name: string,
}

const ProposeLunch = () => {

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [options, setOptions] = useState<Option[]>([]);
    const { list, program, group, address } = useContext(WalletContext);
    const [dueTime, setDueTime] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [dueString, setDueString] = useState("");
    const [targetString, setTargetString] = useState("");
    const [message, setMessage] = useState("");
    const [caterOption, setCaterOption] = useState<null | PublicKey>(null);

    useEffect(() => {
        if (!list || !program) return;

        getCaterOptions(list, program);

    }, [list, program]);

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

            setDueString(newDueString);
            const [due, dMessage] = checkDueInput(newDueString);
            const [target, tMessage] = checkDueInput(targetString);

            if (due && target && caterOption) {
                setButtonDisabled(false);
                setMessage("");
            } else {
                setButtonDisabled(true);
                let m = [];
                if (dMessage !== "") {
                    m.push(`due date: ${dMessage}`);
                }
                if (tMessage !== "") {
                    m.push(`target: ${tMessage}`);
                }
                setMessage(m.join(', '));
            }


        }
    };


    const getCaterOptions = async (list: PublicKey, program: Program<LabLunchDao>) => {
        const caters = await program.account.caterItem.all([{
            memcmp: {
                offset: 8,
                bytes: list.toBase58()
            }
        }]);

        setOptions(caters.map(c => ({ publicKey: c.publicKey, name: c.account.name })));
    }

    const handleTargetDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsDate;
        if (value!) {
            const [year, month, day] = [value.getFullYear(), value.getUTCMonth(), value.getUTCDate()]
            const newTargetString = `${year}-${month + 1}-${day}`;
            setTargetString(newTargetString);
            const [target, tMessage] = checkDueInput(newTargetString);
            const [due, dMessage] = checkDueInput(dueString);

            if (due && target && caterOption) {
                setButtonDisabled(false);
                setMessage("");
            } else {
                setButtonDisabled(true);
                let m = [];
                if (dMessage !== "") {
                    m.push(`due date: ${dMessage}`);
                }
                if (tMessage !== "") {
                    m.push(`target: ${tMessage}`);
                }
                setMessage(m.join(', '));
            }
        }
    };

    const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
        setCaterOption(new PublicKey(e.target.value));
        const [target, tMessage] = checkDueInput(targetString);
        const [due, dMessage] = checkDueInput(dueString);

        if (due && target && caterOption) {
            setButtonDisabled(false);
            setMessage("");
        } else {
            setButtonDisabled(true);
            let m = [];
            if (dMessage !== "") {
                m.push(`due date: ${dMessage}`);
            }
            if (tMessage !== "") {
                m.push(`target: ${tMessage}`);
            }
            setMessage(m.join(', '));
        }
    }

    const showOptions = () => options.map((o) => (<option key={o.publicKey.toBase58()} value={o.publicKey.toBase58()}>{o.name}</option>));

    const submit = async () => {
        if (program && address && group && caterOption) {
            try {
                const voteDue = new BN(((new Date(dueString)).valueOf() / 1000).toFixed());
                const topic = newKeyPair();
                setButtonDisabled(true);
                const target = new Date(targetString);
                const month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
                const [y, m, d] = [target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate()];
                const when = `${month[m]} ${d}, ${y}`;
                await program.methods.createLunchTopic(voteDue, when)
                    .accounts({
                        topic: topic.publicKey,
                        owner: address,
                        cater: caterOption,
                        group,
                    }).signers([topic]).rpc();
            } catch {
                setMessage("something went wrong.");
            }
        }
    }

    return (<Wrapper>
        <h1>Plan a Lunch</h1>

        <div className="flex flex-col space-y-5 mt-5">
            <div className="flex flex-col">
                <p className="font-bold text-lg">this is a lunch for:</p>
                <p>date:</p>
                <input onChange={handleTargetDateChange} type="date" />
            </div>
            <div className="flex flex-col">
                <p className="font-bold text-lg">people can vote until:</p>
                <p>date:</p>
                <input onChange={handleChange} id="date" type="date" />
                <p>time:</p>
                <input onChange={handleChange} id="time" type="time" />
            </div>
            <div className="flex flex-col">
            </div>
            <div className="flex flex-col">
                <p className="font-bold text-lg">cuisine:</p>
                <select onChange={handleOption}>
                    {showOptions()}
                </select>
            </div>
            <div className="text-negative font-bold text-xs text-right">
                {message}
            </div>
            <div className="flex flex-row justify-end">
                <button onClick={submit} disabled={buttonDisabled} className="card flex-none font-bold px-5 disabled:card-disabled">submit</button>
            </div>
        </div>

    </Wrapper>)
};

export default ProposeLunch;