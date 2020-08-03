import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from '../../actions/profile';

const UpdateProfile = ({ profile: { profile, loading }, auth, updateProfile, getCurrentProfile, history }) => {

    window.scrollTo(0, 0);

    const [formData, setFormData] = useState({
        location: '',
        status: '',
        bio: '',
        known_as: '',
        youtube: '',
        twitter: '',
        twitch: ''
    });

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            status: loading || !profile.status ? '' : profile.status,
            location: loading || !profile.location ? '' : profile.location,
            bio: loading || !profile.bio ? '' : profile.bio,
            known_as: loading || !profile.known_as ? '' : profile.known_as,
            youtube: loading || !profile.social ? '' : profile.youtube,
            twitter: loading || !profile.social ? '' : profile.twitter,
            twitch: loading || !profile.social ? '' : profile.twitch
        })
    }, [loading, getCurrentProfile])

    const {
        location,
        status,
        bio,
        known_as,
        youtube,
        twitter,
        twitch
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>{
        e.preventDefault();
        updateProfile( formData, history, true );
    }

    return(
        <Fragment>
            <h1 className="large text-white">
                Update Your Profile
            </h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status"  value={status} onChange={e=> onChange(e)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Location" 
                        name="location" 
                        value={location}
                        onChange={e=> onChange(e)}
                        />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input  
                        type="text" 
                        placeholder="Known as" 
                        name="known_as" 
                        value={known_as}
                        onChange={e=> onChange(e)}
                        />
                    <small className="form-text">Please use comma separated values (eg.handofgod, virus, dimmondback)</small>
                </div>
                <div className="form-group">
                    <textarea 
                        placeholder="A short bio of yourself" 
                        name="bio"
                        value={bio}
                        onChange={e=> onChange(e)}
                        ></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="form-group ">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input 
                        type="text" 
                        placeholder="Twitter URL" 
                        name="twitter" 
                        value={twitter}
                        onChange={e=> onChange(e)}
                        />
                </div>

                <div className="form-group ">
                    <i className="fab fa-twitch fa-2x"></i>
                    <input 
                        type="text" 
                        placeholder="Twitch URL" 
                        name="twitch" 
                        value={twitch}
                        onChange={e=> onChange(e)}
                        />
                </div>

                <div className="form-group ">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" 
                        placeholder="YouTube URL" 
                        name="youtube" 
                        value={youtube} 
                        onChange={e=> onChange(e)}
                        />
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/profile/edit">Go Back</Link>
            </form>
        </Fragment>
    );
};

UpdateProfile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { updateProfile, getCurrentProfile })( withRouter(UpdateProfile));



