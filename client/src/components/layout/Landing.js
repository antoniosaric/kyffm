import React from 'react';
import { Link } from 'react-router-dom';
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated }) => {
    window.scrollTo(0, 0);

    if(isAuthenticated){
        // return <Redirect to='/profile/edit' />
        console.log('logged in')
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Kill Your Friends For Money</h1>
                    <p className="lead">The #1 Site For Hosting Online Trounaments</p>
                    <div className="buttons">
                        <Link to='register' className="btn btn-primary">Sign Up</Link>
                        <Link to='login' className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
       </section>
    )
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect( mapStateToProps )(Landing);
