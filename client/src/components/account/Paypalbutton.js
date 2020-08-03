import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
// import { enterPayment } from '../../actions/payment'
import axios from 'axios';

const updatePayment = ( order, amount, data ) => {

    console.log('called111111111')
    console.log(order)
    console.log(data)
    console.log('called111111111')
    const payment = {
      data: data,
      order: order,
      to: 'accounts_receivable',
      amount: amount, 
      display: '$'+amount+'.00'
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        axios.post('/api/payments', payment, config);
        
    }catch (err){
        const errors = err.response.data.errors;
        console.log(errors)
    }
};

class PayPalBtn extends React.Component {

    render() {
      const { amount, onSuccess, currency } = this.props;
        return (
            <PayPalButton
              amount={amount}
              currency={currency}
              onSuccess={(details, data) => onSuccess(updatePayment(details,amount,data))}
            //   onSuccess={(details, data) => onSuccess(details, data)}
              options={{
                clientId: "sb-lifoq2790211@business.example.com"
              }}
          />
        );
    }
}

export default PayPalBtn;
