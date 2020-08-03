import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfilesCard from './ProfilesCard';

const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {
    window.scrollTo(0, 0);


    useEffect(() => {
        getProfiles()
    }, [getProfiles])
    
    return loading ? <Spinner /> : 
        <Fragment>
            <h1 className="large text-white">Current Profiles</h1>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfilesCard key={profile._id} profile={profile} />
                    ))
                ) : <h4 className='text-white'> NO PROFILES FOUND... </h4>}

            </div>
        </Fragment>
}
 
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);


