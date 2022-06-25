import { PublicKey } from "@solana/web3.js";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CaterAccount } from "../model";
import { batchAddCater, findAddress, stringToBytes } from "../util";
import { shortenAddress } from "../util";
import { WalletContext } from "../workspace";
import caterInfo from "../data/caters.json";
import config from "../config";

const Admin = () => {

    const { program, address } = useContext(WalletContext);
    const [group, setGroup] = useState<null | PublicKey>(null);
    const [groupName, setGroupName] = useState("");
    const [list, setList] = useState<null | PublicKey>(null);
    const [caters, setCaters] = useState<CaterAccount[]>([]);
    const [newMemberAddress, setNewMemberAddress] = useState("");
    const [newQuorum, setNewQuorum] = useState<number>(1);

    useEffect(() => {
        const checkData = async () => {
            if (program && address) {
                const [g] = await findAddress([stringToBytes("group"), stringToBytes(config.groupName)], program);
                const [l] = await findAddress([stringToBytes("cater_list"), g.toBuffer()], program);
                try {
                    const groupAccount = await program.account.group.fetch(g);
                    setGroup(g);
                    setGroupName(groupAccount.name);
                    console.log("group members:", groupAccount.members.map(m => m.toBase58()));
                } catch {
                    setGroup(null);
                    setGroupName("");
                }

                try {
                    const listAccount = await program.account.caterList.fetch(l);
                    setList(l);
                    const loadCaterAccounts = listAccount.caters.map(c => program.account.caterItem.fetch(c));
                    setCaters(await Promise.all(loadCaterAccounts));
                } catch {
                    console.log("couldn't find list");
                    setList(null);
                }

            }
        };

        checkData();
    }, [program, address])



    const initGroup = async () => {
        if (program && address) {
            const [g] = await findAddress([stringToBytes("group"), stringToBytes(config.groupName)], program);
            try {
                await program.methods.initGroup(config.groupName).accounts({
                    group: g,
                    owner: address
                }).rpc();

            } catch {

            }

            const groupAccount = await program.account.group.fetch(g);
            setGroupName(groupAccount.name);
            setGroup(g);
        }
    }

    const initList = async () => {
        if (program && address && group) {
            const [l] = await findAddress([stringToBytes("cater_list"), group.toBuffer()], program);
            try {
                await program.methods.initCaterList()
                    .accounts({
                        list: l,
                        group,
                        owner: address,
                    }).rpc();
            } catch { }

            setList(l);
        }
    }

    const initCaters = async () => {
        if (program && address && group && list) {
            for (let i = 0; i < caterInfo.length; i++) {
                try {
                    await batchAddCater(caterInfo[i], address, list, group, program);
                } catch { }
            }
        }
    }

    const showGroup = () => {
        if (group) {
            return (<div>
                group: <span className="font-bold">{groupName}</span> ({shortenAddress(group)})
            </div>)
        } else {
            return (<div>
                group not loaded
            </div>)
        }
    }

    const showList = () => {
        if (list) {
            return (<div>
                list: {shortenAddress(list)}
                <p className="text-xs">(found {caters.length} caters)</p>
            </div>)
        } else {
            return (<div>
                list not found
            </div>)
        }
    }

    const showCaters = () => {
        if (caters.length !== 0) {
            const showCaters = caters.map(c => (<div key={c.name}>{c.name} ({c.menus.length})</div>))
            return (<div>{showCaters}</div>)
        } else {
            return (<div className="text-xs text-center"> -- no caters -- </div>)
        }
    }

    const newMember = async () => {
        if (program && group && address) {
            const keys = newMemberAddress.split(',').map(c => (new PublicKey(c)))
            if (keys.length > 0) {
                await program.methods.addMembersToGroup(keys).accounts({
                    group,
                    owner: address
                }).rpc();
                setNewMemberAddress("");
            }
        }
    }

    const changeQuorum = async () => {
        if (program && group) {
            await program.methods.updateQuorum(newQuorum).accounts({
                group,
            }).rpc();
            setNewMemberAddress("1");
        }
    }

    const handleChangeNewMember = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMemberAddress(e.target.value);
    }

    const handleQuorumChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuorum(parseInt(e.target.value));
    }

    return (<>
        <div className="flex flex-col p-2 space-y-3">
            <h1>admin</h1>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center">{showGroup()}</div>
                <button onClick={initGroup} className="card">init Group</button>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center">{showList()}</div>
                <button onClick={initList} className="card">init List</button>
            </div>
            <div className="flex flex-col space-y-1.5">
                <div>caters: </div>
                <div>{showCaters()}</div>
                <div className="flex justify-end"><button onClick={initCaters} className="card">init (dummy) Caters</button></div>
            </div>
            <div className="flex flex-col space-y-1.5">
                <div>new member:</div>
                <input type="text" defaultValue={""} onChange={handleChangeNewMember} value={newMemberAddress} />
                <div className="flex flex-row justify-end">
                    <button className="card" onClick={newMember}>add member(s)</button>
                </div>
            </div>
            <div className="flex flex-col space-y-1.5">
                <div>quorum:</div>
                <input type="text" defaultValue="1" onChange={handleQuorumChange} value={newQuorum} />
                <div className="flex flex-row justify-end">
                    <button className="card" onClick={changeQuorum}>change quorum</button>
                </div>
            </div>
        </div>
    </>)
}
export default Admin;