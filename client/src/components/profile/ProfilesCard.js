import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfilesCard = ({
    profile: {
        user: { _id, username },
        status,
        known_as,
        profile_pic
    }
}) => {
    return (
        
        <div className="profile bg-light">
                    <img
                    className="round-img"
                    src={profile_pic}
                    alt={username}
                    />
                    <div>
                        <h2>{username}</h2>
                        <Link to={`/profiles/profile/${_id}`} className="btn btn-primary">View Profile</Link>
                    </div>

                    <ul>
                        <h3>Known As</h3>
                        {known_as.slice(0,4).map((name, index) => (
                            <li className="text-primary" key={index}>
                                <i className="fas fa-check"></i> {name}
                            </li>
                        ))}
                    </ul>
        </div>
    )
}

ProfilesCard.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfilesCard;
