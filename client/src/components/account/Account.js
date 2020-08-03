import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
// import { Link } from 'react-router-dom';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import paypal from '../layout/Payment';




const Account = ({ getCurrentProfile, auth, profile: { profile, loading }}) => {
    window.scrollTo(0, 0);

    const [formData, setFormData] = useState({
        amount: ''
      });
    
      const {
          amount
      } = formData;
    
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = e =>{
          e.preventDefault();
      }

    useEffect(() => {
        getCurrentProfile();

    }, [getCurrentProfile]);
        
    return loading || profile === null ? <Spinner /> : 

        <Fragment>

            <div className="profile-grid my-1">
                <div className="profile-top bg-primary p-2">
                    <h1 className="large">Welcome: {profile.user.first_name} {' '} {profile.user.last_name} </h1>
                    <h3>email: {profile.user.email}</h3>
                    <h3>Password: xxxxxxx</h3>
                </div>
                <div className="profile-about bg-light p-2">
                    <h2 className="text-primary">Funds: {profile.user.account_amount.display}</h2>

                    <h2>Add Funds $$$</h2>



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

                        <input type="submit" className="btn btn-primary my-1" />
                    </form>

                    <div id="paypal-button-container"></div>
                    <paypal payment={formData} />
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