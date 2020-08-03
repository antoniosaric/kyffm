import React, { useState, useRef, useEffect, Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import enterPayment from '../../actions/payment'

const Payment = ({
  payment: {
    amount
  }
}, enterPayment )  => {
  const [ paidFor, setPaidFor ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ loaded, setLoaded ] = useState(false);

  let paypalRef = useRef();

  const sendToParent = () =>{
    this.props.handlePayment(order); 
  }

  // const updatePayment = ( order, amount ) => {
  //   console.log('called')
  //   const payment = {
  //     data: order,
  //     to: 'accounts_receivable',
  //     amount: amount, 
  //     display: '$'+toString(amount)+'.00'
  //   }

  //   enterPayment(payment);
  // };

  useEffect(() => {

    const script = document.createElement("script");

    script.src="https://www.paypal.com/sdk/js?client-id=AWI0eyJ0twniVLVtLTx1OEjshAwrtabrObuelOzjMIBnzAr6yn0WB5mtWOwCPnUhNmxZTYcKK1eNE60c"
    script.addEventListener("load", ()=>setLoaded(true));
    document.body.appendChild(script); 

    if(loaded){
      setTimeout(()=> {
        window.paypal
        .Buttons({
          createOrder: (data , actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "adding money to account",
                  amount:{
                    currency_code: "USD",
                    value: amount
                  }
                }
              ]
            })
          },
          onApprove: async (data, actions)=>{
            const order = await actions.order.capture();
            sendToParent(order);
            setPaidFor(true);
          },
          onError: function (err) {
            setError(true);
            console.log(err)
          }
        }).render(paypalRef)
      })
    }
  })

  return paidFor ? 
  <Fragment>
    <div>
      <h3> congrats, you have added funds to your account</h3>
    </div>
  </Fragment>
  : 
    
  <Fragment>
    {error ? <div ref={v => (paypalRef = v)} /> : <div>something went wrong</div>}
  </Fragment>
  
}

Payment.propTypes = {
  payment: PropTypes.object.isRequired
}

export default connect(null, { enterPayment })(Payment);
