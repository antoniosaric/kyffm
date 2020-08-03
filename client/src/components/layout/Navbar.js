import React, { Fragment } from 'react'
import logo from '../../img/higinbot.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { faUserCircle, faSignOutAlt, faGamepad, faUsers, faIdBadge, faVideo, faChess, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <ul>
            <li>
                <Link to='/profile/edit'>
                
                <span className='hide-sm'>Edit {' '}</span><FontAwesomeIcon icon={faUserCircle} />
                </Link>
            </li>
            <li><a onClick={logout} href='/'><span className='hide-sm'>Logout {' '}</span> <FontAwesomeIcon icon={faSignOutAlt} /></a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login' ><span className='hide-sm'>Login {' '}</span><FontAwesomeIcon icon={faSignInAlt} /></Link></li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
            <div>
                <Link to='/'><img className="height40" src={logo} alt=""/></Link>
                <Link to='/' className="marginleft20px"><i className="fas fa-code"></i>KYFFM</Link>
            </div>
            </h1>
            <ul>
                <li><Link to='/tournaments'><span className='hide-sm'>Tournaments {' '} </span><FontAwesomeIcon icon={faChess} /></Link></li>
                <li><Link to='/streams'><span className='hide-sm'>EBar {' '} </span><FontAwesomeIcon icon={faVideo} /></Link></li>
                <li><Link to='/games'><span className='hide-sm'>Games {' '} </span><FontAwesomeIcon icon={faGamepad} /></Link></li>
                <li><Link to='/teams'><span className='hide-sm'>Teams {' '} </span><FontAwesomeIcon icon={faUsers} /></Link></li>
                <li><Link to='/profiles'><span className='hide-sm'>Profiles  {' '} </span><FontAwesomeIcon icon={faIdBadge} /></Link></li>
            </ul>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
        </nav>  
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);