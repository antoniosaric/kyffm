import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

export const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        username:'',
        password:'',
        passwordConf:''
    });

    const { first_name, last_name, email, username, password, passwordConf } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== passwordConf){
            setAlert('passwords do not match', 'danger');
        }else{
            register({ first_name, last_name, email, username, password });
        }
    }

    //redirect if registered
    if(isAuthenticated){
        return <Redirect to='/profile/edit' />
    }

    return (
        <Fragment>
            <h1 className="large">Register</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={ e=> onSubmit(e)}>
                <div className="form-group">
                    <small className="form-text">Your first name and last name will not be presented anywhere on this site</small>
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        name="first_name" 
                        value={first_name}
                        onChange={ e => onChange(e) }
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        name="last_name" 
                        value={last_name}
                        onChange={ e => onChange(e) }
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        value={username}
                        onChange={ e => onChange(e) }
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={email}
                    onChange={ e => onChange(e) }
                    required 
                />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={ e => onChange(e) }
                        required 
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConf"
                        value={passwordConf}
                        onChange={ e => onChange(e) }
                        minLength="6"
                        required 
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login' className="text-white">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps, { setAlert, register } )(Register);