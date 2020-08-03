import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTournaments } from '../../actions/tournament';
import TournamentsCard from './TournamentsCard';

const Tournaments = ({ getTournaments, tournament: { tournaments, loading } }) => {

    useEffect(() => {
        getTournaments()
    }, [getTournaments])
    window.scrollTo(0, 0);
    
    return loading ? <Spinner /> : 
        <Fragment>
            <h1 className="large text-white">Most Recent Individual Tournaments</h1>
            <div className="profiles">
                {tournaments.solo.length > 0 ? (
                    tournaments.solo.slice(0,4).map(tournament => (
                        <TournamentsCard key={tournament._id} tournament={tournament} />
                    ))
                ) : <h4 className='text-white'> NO INDIVIDUAL TOURNAMENTS FOUND... </h4>}

            </div>

            <div className="profiles">
                {tournaments.solo.length > 0 ? (
                    <div className="profile  bg-light">
                        <img
                        className="round-img"
                        // src={tournament_pic}
                        src='https://res.cloudinary.com/dqd4ouqyf/image/upload/v1595868389/default_match_solo.png'
                        alt='fight'
                        />
                        <div>
                            <h2>See More</h2>
                            <Link to={'tournamentssoloall'} className="btn btn-primary">See More</Link>
                        </div>


                        <ul>
                            <h3>See More</h3>
                            <li className="text-primary">
                                <i className="fas fa-check"></i><Link to={'tournamentssoloall'} className="btn btn-primary">See More</Link>
                            </li>
                        </ul>
                    </div>
                ) : '' }


            </div>

            <h1 className="large text-white">Most Recent Team Tournaments</h1>
            <div className="profiles">
                {tournaments.team.length > 0 ? (
                    tournaments.team.slice(0,4).map(tournament => (
                        <TournamentsCard key={tournament._id} tournament={tournament} />
                    ))
                ) : <h4 className='text-white'> NO TEAM TOURNAMENTS FOUND... </h4>}

            </div>

            <div className="profiles">
                {tournaments.team.length > 0 ? (
                    <div className="profile  bg-light">
                        <img
                        className="round-img"
                        // src={tournament_pic}
                        src='https://res.cloudinary.com/dqd4ouqyf/image/upload/v1595868389/default_match_team.png'
                        alt='fight'
                        />
                        <div>
                            <h2>See More</h2>
                            <Link to={'tournamentsteamall'} className="btn btn-primary">See More</Link>
                        </div>


                        <ul>
                            <h3>See More</h3>
                            <li className="text-primary">
                                <i className="fas fa-check"></i><Link to={'tournamentsteamall'} className="btn btn-primary">See More</Link>
                            </li>
                        </ul>
                    </div>
                ) : ''}

            </div>

        </Fragment>
}
 
Tournaments.propTypes = {
    getTournaments: PropTypes.func.isRequired,
    tournament: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tournament: state.tournament
})

export default connect(mapStateToProps, { getTournaments })(Tournaments);