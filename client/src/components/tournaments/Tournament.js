import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTournamentById } from '../../actions/tournament';
import { addUserToTournament } from '../../actions/tournament';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
// import ReactPlayer from 'react-player/youtube';

const Tournament = ({ getTournamentById, addUserToTournament, auth, tournament: { tournament, loading }, match}) => {

    useEffect(() => {
        getTournamentById(match.params.id);
    }, [getTournamentById, match.params.id]);

    window.scrollTo(0, 0);
    
    const IMAGES =
    [{
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            isSelected: true,
            caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
            caption: "Boats (Jeshu John - designerspics.com)"
    },
    
    {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212
    }]
        
    return loading || tournament === null ? <Spinner /> : 
    
    <Fragment>

        <div className="profile-grid my-1">
            <div className="profile-top bg-primary p-2">
                <img
                className="my-1 floatleft"
                src={tournament.tournament_pic}
                alt=""
                />
                <h3 className="large">{tournament.title}</h3>
                { auth.token ? <button onClick={e => addUserToTournament(match.params.id)}>Join Tournament</button> : '' }
                { auth.token && tournament.status !== 'completed' ? <Link to={`/results/solo/${match.params.id}`}>Submit Results</Link> : '' }
                
            </div>

            <div className="profile-about bg-light p-2">
                <h2 className="text-primary">General Info</h2>
                <p>type: {tournament.type}</p>
                <p>start time: {tournament.start_date}</p><p>end time: {tournament.end_date}</p>
                <p>minimum: {tournament.minimum_players}</p><p>maximum: {tournament.maximum_players}</p>
                <p>buyin: {tournament.buyin}</p><p>current pot: {tournament.pot}</p>
                <div className="line"></div>

                <h2 className="text-primary">Summary/Rules</h2>
                <p>
                    {tournament.summary}
                </p>
                

                <div className="line"></div>
                <h2 className="text-primary">Competitors</h2>
                <div className="competitors">
                { tournament.status !== 'completed' ?                     
                    tournament.competitors.map((competitor, index) => (
                        <div className="p-1" key={index}><i className="fa fa-check"></i> <Link to={`/profiles/profile/${competitor.user_id}`}>{competitor.username}</Link></div>
                    )) : 
                    tournament.competitors.map((competitor, index) => (
                        <div className="p-1" key={index}><i className="fa fa-check"></i> <Link to={`/profiles/profile/${competitor.user_id}`}>{competitor.username} - {competitor.result}</Link></div>
                    ))
                } 


                </div>
            </div>

            {/* <div className="profile-tabs bg-light p-2">
                <Tabs>
                    <TabList>
                    <Tab>Videos</Tab>
                    <Tab>Gallery</Tab>
                    </TabList>
                
                    <TabPanel>
                    <h2>Streaming</h2>
                    <h2>Video Grid</h2>
                    </TabPanel>
                    <TabPanel>

                    <h2>Gallery Grid</h2>
                    <Fragment>
                        <Gallery images={IMAGES}/>
                    </Fragment>
                    </TabPanel>
                </Tabs>
            </div> */}
        </div>
    </Fragment>
}
 
Tournament.propTypes = {
    auth: PropTypes.object.isRequired,
    tournament: PropTypes.object.isRequired,
    getTournamentById: PropTypes.func.isRequired,
    addUserToTournament: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    tournament: state.tournament
})

export default connect(mapStateToProps, { getTournamentById, addUserToTournament })(Tournament);






