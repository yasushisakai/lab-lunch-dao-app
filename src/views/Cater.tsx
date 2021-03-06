import { PublicKey } from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CaterMenuItem from "../components/CaterMenuItem";
import Wrapper from "../components/Wrapper";
import { CaterAccount, MenuItem } from "../model";
import { WalletContext } from "../workspace";

const Cater = () => {
    const { caterId } = useParams();
    const { program } = useContext(WalletContext);
    const [cater, setCater] = useState<null | CaterAccount>(null)
    const [menus, setMenus] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (program && caterId) {
                // cater
                const c = await program.account.caterItem.fetch(new PublicKey(caterId));
                // the menus
                const ms = await program.account.menuItem.all([{
                    memcmp: {
                        offset: 8,
                        bytes: caterId
                    }
                }]);
                setMenus(ms.map(m => m.account));
                setCater(c);
            }
        }

        fetchData();
    }, [caterId, program]);


    const menu = () => menus.map(m => <CaterMenuItem key={m.name} menu={m} />);

    if (cater) {
        return (
            <Wrapper>
        <div className="flex flex-col space-y-4">
            <h1>{cater.name}</h1>
            <div className="flex flex-col space-y-3">
                {menu()}
            </div>
        </div>
        </Wrapper>
        )
    } else {
        return <div>cater info loading</div>
    }
};

export default Cater;