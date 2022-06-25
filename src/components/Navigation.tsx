import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faListCheck, faFileCirclePlus, faPersonCirclePlus, faPersonCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { WalletContext } from '../workspace';
import { useContext, useEffect } from 'react';
import { shortenAddress } from '../util';

const Navigation = () => {

    const { address } = useContext(WalletContext);

    useEffect(()=>{
        if(!address){
            return
        }
    },[address]);

    const walletIcon = () => {
        let iconType = faPersonCircleXmark;
        let addressLabel = "disconnected";
        if (address !== null) {
            iconType = faPersonCirclePlus;
            addressLabel = shortenAddress(address);
        }

        return (
            <div className="navi-item flex flex-col">
                <FontAwesomeIcon icon={iconType} size="2x"/>
                {addressLabel}
            </div>
        );
    }

    return (
        <nav className="flex flex-row justify-between">
            <Link to="/">
                <div className="navi-item">
                    <FontAwesomeIcon icon={faHouse} size="2x" />
                    home
                </div>
            </Link>
            <Link to="/list">
                <div className="navi-item">
                    <FontAwesomeIcon icon={faListCheck} size="2x" />
                    list
                </div>
            </Link>
            <Link to="propose">
                <div className="navi-item">
                    <FontAwesomeIcon icon={faFileCirclePlus} size="2x" />
                    propose
                </div>
            </Link>
            <Link to="status">
                {walletIcon()}
            </Link>
        </nav>
    )
}

export default Navigation;
