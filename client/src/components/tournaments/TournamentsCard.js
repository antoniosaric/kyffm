import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TournamentsCard = ({
    tournament: {
        _id,
        competitors,
        tournament_pic,
        minimum_players,
        maximum_players,
        type,
        start_date,
        end_date,
        buyin,
        title,
        user,
        game
    }
}) => {
    return (
        <div className="profile bg-light">
            <img
            className="round-img"
            src={tournament_pic}
            alt={title}
            />
            <div>
                <h2>{title}</h2>
                <Link to={`/tournaments/tournament/${_id}`} className="btn btn-primary">View Tournament</Link>
            </div>

            <ul>
                <h3>Competitors</h3>
                {competitors.slice(0,4).map((arr, index) => (
                    <li className="text-primary" key={index}>
                        <i className="fas fa-check"></i> <Link to={`/profiles/profile/${arr.user_id}`}>{arr.user_id === user ? arr.username + ` - Owner` : arr.username }</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

TournamentsCard.propTypes = {
    tournament: PropTypes.object.isRequired
}

export default TournamentsCard;