import React, { useEffect, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTournaments } from '../../actions/tournament';
import TournamentsCard from './TournamentsCard';

const Tournamentsteamall = ({ getTournaments, tournament: { tournaments, loading } }) => {
    window.scrollTo(0, 0);

    useEffect(() => {
        getTournaments()
    }, [getTournaments])

    console.log(tournaments)
    
    return loading ? <Spinner /> : 
        <Fragment>
            <h1 className="large text-white">Current Individual Tournaments</h1>
            <div className="profiles">
                {tournaments.solo.length > 0 ? (
                    tournaments.solo.slice(0,4).map(tournament => (
                        <TournamentsCard key={tournament._id} tournament={tournament} />
                    ))
                ) : <h4 className='text-white'> NO Tournaments FOUND... </h4>}

            </div>
        </Fragment>
}
 
Tournamentsteamall.propTypes = {
    getTournaments: PropTypes.func.isRequired,
    tournament: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tournament: state.tournament
})

export default connect(mapStateToProps, { getTournaments })(Tournamentsteamall);