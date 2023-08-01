import React from 'react';
import { AddMoney } from '@/context/AddMoneyContext';
import getFormattedDate from '@/components/utils/getFormattedDate';
import { lastFourDigits } from '@/helpers/lastFourDigits';

interface Props {
    deposit: AddMoney
}

const TransactionOk = (props: Props) => {

    let { deposit } = props;

    const firstContainerStyle = {
        width: '370px',
        color: '#272727',
        backgroundColor: '#C1FE36',
        paddingTop: "20px",
        padding: '5px',
        height: '90px',
    };
    const titleStyle = {
        backgroundColor: '#272727',
        color: 'white',
    };
    const secondContainerStyle = {
        width: '370px',
        color: '#C1FE36',
        padding: '5px',
        backgroundColor: '#272727',
    };
    const dateStyle = {
        color: "white",
        paddingLeft: "20px"
    };
    const thirdContainerStyle = {
        backgroundColor: 'white',
        borderRadius: '5px',
        color: 'black',
        padding: '5px',
        margin: '5px'
    };

    return (
        <div>
            <div style={firstContainerStyle}>
                <h2>Digital <span style={titleStyle}>Money House</span></h2>
            </div>
            <div style={secondContainerStyle}>
                <h3 style={{paddingLeft: "20px"}}>Comprobante de Depósito</h3>
                <p style={dateStyle}>{getFormattedDate(deposit.dated)}</p>
                <div style={thirdContainerStyle}>
                    <p style={{paddingLeft: "20px"}}>Depósito</p>
                    <h2 style={{paddingLeft: "20px"}}>${deposit.amount}</h2>
                    <hr />
                    <p style={{paddingLeft: "30px"}}>* De: </p>
                    <h2 style={{paddingLeft: "40px"}}>{deposit.card_type}</h2>
                    <h4 style={{paddingLeft: "40px"}}>Terminada en: {lastFourDigits(deposit.card_number)}</h4>
                    <p style={{paddingLeft: "30px"}}>* Para :</p>
                    <h2 style={{paddingLeft: "40px"}}>Cuenta Propia</h2>
                </div>
            </div>
        </div>
    );
};

export default TransactionOk;