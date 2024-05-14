import React, { useState, useEffect } from 'react';
import styles from '../styles/Interface.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Select from 'react-select';
// import { text } from 'stream/consumers';
import { components } from 'react-select';
import Image from 'next/image';

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

const currencyOptions2 = [
    { value: 'BTC', label: 'BTC' },
    { value: 'ETH', label: 'ETH' },
    { value: 'LTC', label: 'LTC' },
];

let networkOptions = [];

const Interface = () => {
    const [menuPortalTarget, setMenuPortalTarget] = useState(null);
    const [selection1, setSelection1] = useState(null);
    const [selection2, setSelection2] = useState(null);
    const [selection3, setSelection3] = useState(null);
    const [selection4, setSelection4] = useState(null);

    useEffect(() => {
        fetch('/network/networkList.json')
            .then(response => response.json())
            .then(data => {
                networkOptions = data.networkOptions;
                setSelection1(networkOptions[0]);
                setSelection3(networkOptions[0]);
            })
            .catch(error => console.error('Error:', error));

        setMenuPortalTarget(document.body);
    }, []);

    const SelectNetwork = (props) => (
        <components.MenuList {...props}>
            <div style={{ textAlign: 'center', width: '100%', padding: '10px', fontWeight: 'bold' }}>Select Network</div>
            {props.children}
        </components.MenuList>
    );

    const SelectToken = (props) => (
        <components.MenuList {...props}>
            <div style={{ textAlign: 'center', width: '100%', padding: '10px', fontWeight: 'bold' }}>Select Token</div>
            {props.children}
        </components.MenuList>
    );


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
                        options={networkOptions}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={selection1}
                        onChange={setSelection1}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectNetwork }}
                    />
                    <Select
                        options={currencyOptions2}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={selection2}
                        onChange={setSelection2}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectToken }}
                    />
                </div>
                <div className={styles.balance}>
                    <span>0</span>
                </div>
            </div>
            <div className={styles.section_to}>
                <span>To:</span>
            </div>
            <div className={styles.section_to_currency}>
                <div className={styles.currency_dropdown_container}>
                    <Select
                        options={networkOptions}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={selection3}
                        onChange={setSelection3}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectNetwork }}
                    />
                    <Select
                        options={currencyOptions2}
                        className={styles.currency_dropdown}
                        styles={customStyles}
                        menuPortalTarget={menuPortalTarget}
                        defaultValue={selection4}
                        onChange={setSelection4}
                        menuPosition="fixed"
                        formatOptionLabel={formatOptionLabel}
                        components={{ MenuList: SelectToken }}
                    />
                </div>
                <div className={styles.balance}>
                    <span>0</span>
                </div>
            </div>
            <div className={styles.section_trade_button}>
                <ConnectButton />
            </div>

        </div>
    );
};

export default Interface;