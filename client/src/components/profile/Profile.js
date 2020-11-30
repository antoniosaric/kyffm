import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
import ReactPlayer from 'react-player/youtube';


const Profile = ({ getProfileById, auth, profile: { profile, loading }, match}) => {
    window.scrollTo(0, 0);

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    console.log(profile)

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
        
    return loading || profile === null ? <Spinner /> : 
    
        <Fragment>

            <div className="profile-grid my-1">
                <div className="profile-top bg-primary p-2">
                    <img
                    className="my-1 floatleft"
                    src={profile.profile_pic}
                    alt=""
                    />
                    <h1 className="large">{profile.user.username}</h1>
                    <h4>Level 45</h4>
                </div>


                <div className="profile-about bg-light p-2">
                    <h2 className="text-primary">{profile.user.username}'s Bio</h2>
                    <p>
                        {profile.bio}
                    </p>

                    <div className="line"></div>
                    <h2 className="text-primary">Known User Names</h2>

                    <div className="known_as">
                        {profile.known_as.map((name, index) => (
                            <div className="p-1" key={index}><i className="fa fa-check"></i> {name}</div>
                        ))}
                    </div>

                    <div className="line"></div>
                    <h2 className="text-primary">Games</h2>

                    <div className="games">
                        {profile.games.map((game, index) => (
                            <div className="p-1" key={index}><i className="fa fa-check"></i> {game}</div>
                        ))}
                        <div className="p-1"><i className="fa fa-check"></i> WOW</div>
                        <div className="p-1"><i className="fa fa-check"></i> Escape From Tarkov</div>
                        <div className="p-1"><i className="fa fa-check"></i> Rocket League</div>
                        <div className="p-1"><i className="fa fa-check"></i> Quake Champions</div>
                        <div className="p-1"><i className="fa fa-check"></i> Smite</div>
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
                            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                        <h2>Video Grid</h2>
                        </TabPanel>
                        <TabPanel>

                        <h2>Gallery Grid</h2>
                        <Fragment>
                            <Gallery images={IMAGES}/>
                        </Fragment>
                        </TabPanel>
                    </Tabs>
                </div>

                <div className="profile-tournaments bg-light p-2">
                    <Tabs>
                        <TabList>
                            <Tab>Current Tournaments</Tab>
                            <Tab>Previous Tournaments</Tab>
                        </TabList>
                        <TabPanel>
                            <h2 className="text-primary">Current Tournaments</h2>
                            <Fragment>
                                {profile.tournaments.map((tournament, index) => (
                                    <div key={index}>
                                        <div className="tournaments">
                                            <h3 className="text-dark"><Link to={`/tournaments/tournament/${tournament._id}`}>{tournament.title}</Link></h3>
                                            <p>Start - {tournament.start_date} End - {tournament.end_date}</p>
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        </TabPanel>
                        <TabPanel>
                            <h2 className="text-primary">Previous Tournaments</h2>
                            <Fragment>
                                <div className="tournaments">
                                    <h3 className="text-dark"><Link to={'!#'}>T Name</Link></h3>
                                    <p>Start - End Date</p>
                                    <p>Result</p>
                                </div>
                            </Fragment>
                        </TabPanel>
                    </Tabs>
                </div> */}
            </div>
        </Fragment>
}
 
Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(Profile);