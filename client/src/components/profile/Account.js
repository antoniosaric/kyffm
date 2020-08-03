import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import Paypal from '../layout/Payment';
import PayPalBtn from '../../components/account/Paypalbutton';
// import { enterPayment } from '../../actions/payment';

const Account = ({ getCurrentProfile, auth, profile: { profile, loading }}) => {
    window.scrollTo(0, 0);

    // const handlePayment = (order) => {
    //     console.log('called')
    //     const payment = {
    //       data: order,
    //       to: 'accounts_receivable',
    //       amount: amount, 
    //       display: '$'+toString(amount)+'.00'
    //     }
    
    //     enterPayment(payment);
    // }

    const [ complete_purchase, setPurchase ] = useState(false);

    const [formData, setFormData] = useState({
        amount: ''
      });
    
      const {
          amount
      } = formData;
    
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    //   const reload = ( ) => { window.location.reload(); } ;
      const reload = ( ) => {
            window.location.reload();
            setPurchase(true);
         } ;
    
      const onSubmit = e =>{
          e.preventDefault();
      }

    useEffect(() => {
        getCurrentProfile();

    }, [getCurrentProfile]);

    const handleOnClick = ( event ) => {
        event.preventDefault()
        console.log('working')
    }

        
    return loading || profile === null ? <Spinner /> : 

        <Fragment>

            <div className="profile-grid my-1">
                <div className="profile-top bg-primary p-2">
                    <h1 className="large">Name: {profile.user.first_name} {' '} {profile.user.last_name} </h1>
                    <h3>email: {profile.user.email}</h3>
                    <h3>Password: xxxxxxx</h3>
                </div>
                <div className="profile-about bg-light p-2">

                    <div className="buttons p-1">
                        <button onClick={handleOnClick} className="btn btn-dark" type="button">Claim Funds</button>
                    </div>

                    <h2 className="text-primary p-1">Funds: {profile.account_amount.display}</h2>

                    <h2>Add Funds $$$</h2>
                    <p>use: </p>
                    <p>credit card number:4032034189796777</p>
                    <p>exp: 06/24</p>
                    <p>cvv: 682</p>
                    <p>enter all other info however you want</p>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input 
                                type="Number" 
                                placeholder="amount" 
                                name="amount" 
                                value={amount}
                                onChange={e=> onChange(e)}
                                />
                        </div>
                    </form>
                    <p>{amount}</p>           
                    <Fragment>
                        {complete_purchase ?     
                            <div>
                            <h3> congrats, you have added funds to your account</h3>
                            </div> 
                            :
                            <PayPalBtn
                            amount = {amount}
                            currency = {'USD'}
                            onSuccess={reload}
                            
                            />
                        }
                    </Fragment>
                </div>
            </div>
        </Fragment>
}
 
Account.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Account);