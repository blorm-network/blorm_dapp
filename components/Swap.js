import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Swap.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Select from 'react-select';
import { components } from 'react-select';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import HopProtocol from '../lib/hopprotocol';
import { chains as chainOptions } from '../lib/chains';
import { tokens as tokenOptions } from '../lib/tokens';

const formatOptionLabel = ({ value, label, image }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src={image} alt={value} width={30} height={30} />
        {label}
    </div>
);

const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '3px',
        backgroundColor: '#ebebeb',
        border: 'gray solid 1px',
        outline: 'gray auto 2px',
        height: '95%',

    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'gray',
    }),
    menu: (provided) => ({
        ...provided,
        width: '25vw', // 50% of viewport width
        // height: '66vh', // 30% of viewport height
        position: 'fixed',
        top: '16vh', // 20% from the top of the viewport
        left: '37.5vw', // 25% from the left of the viewport
        borderRadius: '10px',
        border: 'gray solid 1px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#ebebeb' : 'white',
        color: 'black',
        padding: '3.5vh 3.5vw',
        height: '10vh',
        width: '100% - 1vw',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: '1.4em',
        fontWeight: 'bold',
        borderRadius: '10px',
        margin: '1vh .5vw',
        boxSizing: 'border-box',

    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',
    }),
    MenuList: (provided) => ({
        ...provided,
        marginLeft: '20px',
        height: '66vh',
    }),
};



const Swap = () => {
    const chainOptionsArray = chainOptions.map(chain => ({
        value: chain.id,
        label: chain.name,
        image: chain.image,
        rpcUrl: chain.rpcUrl,
        denom: chain.denom,
        symbol: chain.symbol,
        decimals: chain.decimals
    }));

    const tokenOptionsArray = Object.values(tokenOptions).map(token => ({
        value: token.symbol,
        image: token.image,
        chainId: token.chainId,
        decimals: token.decimals
    }));

    useEffect(() => {
        setChain1(chainOptions[0]);
        setChain2(chainOptions[0]);
    }, []);

    useEffect(() => {
        setToken1(Object.values(tokenOptions)[0]);
        setToken2(Object.values(tokenOptions)[0]);
    }, []);

    const [menuPortalTarget, setMenuPortalTarget] = useState(null);
    const [chain1, setChain1] = useState(chainOptionsArray[0]);
    const [token1, setToken1] = useState(tokenOptionsArray[0]);
    const [chain2, setChain2] = useState(chainOptionsArray[1]);
    const [token2, setToken2] = useState(tokenOptionsArray[1]);
    const [token1Balance, setToken1Balance] = useState('0');
    const [token2Balance, setToken2Balance] = useState('0');

    const handleToken1BalanceChange = (event) => {
        setToken1Balance(event.target.value);
    };

    const handleToken2BalanceChange = (event) => {
        setToken2Balance(event.target.value);
    };


    const SelectChain = (props) => (
        <components.MenuList {...props}>
            <div style={{ textAlign: 'center', width: '100%', padding: '10px', fontWeight: 'bold' }}>Select Chain</div>
            {props.children}
        </components.MenuList>
    );

    const SelectToken = (props) => (
        <components.MenuList {...props}>
            <div style={{ textAlign: 'center', width: '100%', padding: '10px', fontWeight: 'bold' }}>Select Token</div>
            {props.children}
        </components.MenuList>
    );
    const [recipient, setRecipient] = useState('0x0c778e66efa266b5011c552C4A7BDA63Ad24C37B');

    const handleRecipientUpdate = (event) => {
        setRecipient(event.target.value);
    }

    const hopProtocolRef = useRef();

    const handleSwap = () => {
        // log the state variables
        console.log('chain1:', chain1);
        console.log('chain2:', chain2);
        console.log('token1:', token1);
        console.log('token1Balance:', token1Balance);

        // check if chain1 and chain2 are set to valid chain names
        if (chain1.value && chain2.value && hopProtocolRef.current) {
            hopProtocolRef.current.sendTransaction();
        } else {
            console.error('Please select valid chains before swapping.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.section_from}>
                <span>From:</span>
                <div>
                    <button>tx history</button>
                    <button>settings</button>
                </div>
            </div>
            <div className={styles.section_from_currency}>
                <div className={styles.currency_dropdown_container}>
                    <Select
                        options={chainOptionsArray.map(chain => ({ value: chain.value }))}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={chain1.value}
                        onChange={setChain1}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectChain }}
                    />
                    <Select
                        options={tokenOptionsArray.map(token => ({ value: token.value }))}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={token1.value}
                        onChange={setToken1}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectToken }}
                    />
                </div>
                <div className={styles.balance}>
                    <textarea value={token1Balance} onChange={handleToken1BalanceChange} />
                </div>
            </div>
            <div className={styles.section_to}>
                <span>To:</span>
            </div>
            <div className={styles.section_to_currency}>
                <div className={styles.currency_dropdown_container}>
                    <Select
                        options={chainOptionsArray.map(chain => ({ value: chain.value }))}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={chain2.value}
                        onChange={setChain2}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectChain }}
                    />
                    <Select
                        options={tokenOptionsArray.map(token => ({ value: token.value }))}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={token2.value}
                        onChange={setToken2}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectToken }}
                    />
                </div>
                <div className={styles.balance}>
                    <textarea value={token2Balance} onChange={handleToken2BalanceChange} />
                </div>
            </div>
            <div className={styles.section_recipient}>
                <textarea placeholder="Recipient" onChange={handleRecipientUpdate}/>
            </div>
            <div className={styles.section_trade_button}>
                <button onClick={handleSwap}>Swap</button>
                <HopProtocol ref={hopProtocolRef} fromChain={chain1.value} toChain={chain2.value} token={token1.value} amount={token1Balance} recipient={recipient}/>
            </div>
        </div>
    );
};

export default Swap;