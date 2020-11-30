import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
// import ReactPlayer from 'react-player/youtube'

const Filler = (props) => {
    return <div className="filler" style={{width: `${props.percentage}%`}} ></div>
}

const EditProfile = ({ getCurrentProfile, auth, profile: { profile, loading }}) => {
    window.scrollTo(0, 0);

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

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

    let percentage = 45;
    
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
    <h4>Experience: Next Level 46</h4><div className="progress-bar"><Filler percentage={percentage} /></div>
    <h4>Amount on Account: {profile.account_amount.display}</h4>
    <div className="buttons">
        <Link to='account' className="btn btn-dark">Update Account Info</Link><Link to='account' className="btn btn-dark">Check Achievements</Link>
    </div>

    {/* <p>Seattle, WA</p>
    <div className="icons my-1">
      <Link to="" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-globe fa-2x"></i>
      </Link>
      <Link to="" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter fa-2x"></i>
      </Link>
      <Link to="" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook fa-2x"></i>
      </Link>
      <Link to="" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin fa-2x"></i>
      </Link>
       <Link to="" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube fa-2x"></i>
      </Link>
      <Link to="" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram fa-2x"></i>
      </Link>
    </div> */}
  </div>


  <div className="profile-about bg-light p-2">
    <h2 className="text-primary">{profile.user.username}'s Bio</h2>
    <p className="p-1">
        {profile.bio}
    </p>
    <div className="buttons p-1">
        <Link to='UpdateProfile' className="btn btn-dark">Update Profile</Link>
    </div>
    <div className="line"></div>
    <h2 className="text-primary">Known User Names</h2>


    <div className="known_as">
      {profile.known_as.map((name, index) => (
          <div className="p-1" key={index}><i className="fa fa-check"></i> {name}</div>
      ))}
    </div>
    {/* <div className="buttons">
        <Link to='register' className="btn btn-dark">Edit Names</Link>
    </div> */}

    <div className="line"></div>
    <h2 className="text-primary">Games</h2>

    <div className="games">
        <div className="p-1"><i className="fa fa-check"></i> WOW</div>
        <div className="p-1"><i className="fa fa-check"></i> Escape From Tarkov</div>
        <div className="p-1"><i className="fa fa-check"></i> Rocket League</div>
        <div className="p-1"><i className="fa fa-check"></i> Quake Champions</div>
        <div className="p-1"><i className="fa fa-check"></i> Smite</div>

    </div>
    <div className="buttons">
        <Link to='register' className="btn btn-dark">Edit Games</Link>
    </div>
  </div>

  <div className="profile-tabs bg-light p-2">
    {/* <Tabs>
        <TabList>
        <Tab>Videos</Tab>
        <Tab>Gallery</Tab>
        </TabList>
    
        <TabPanel>
        <div className="buttons">
            <Link to='register' className="btn btn-dark">Add Video</Link>
        </div>
        <h2>Streaming</h2>
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
        {/* <div> */}
        {/* <Player
            playsInline
            poster="/assets/poster.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        />
        </div> */}
        {/*<h2>Video Grid</h2>
        </TabPanel>
        <TabPanel>
        <div className="buttons">
            <Link to='register' className="btn btn-dark">Add Image</Link>
        </div>

        <h2>Gallery Grid</h2>
        <Fragment>
            <Gallery images={IMAGES}/>
        </Fragment>
        </TabPanel>
    </Tabs> */}
  </div>

  <div className="profile-tournaments bg-light p-2">
    <div className="buttons m-bottom-1">
        <Link to='/CreateTournament' className="btn btn-primary">Start Tournament</Link>
    </div>
        {/* <Tabs>
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
        </Tabs> */}
    </div>


  {/* <div className="profile-exp bg-white p-2">
    <h2 className="text-primary">Experience</h2>
    <div>
      <h3 className="text-dark">Microsoft</h3>
      <p>Oct 2011 - Current</p>
      <p><strong>Position: </strong>Senior Developer</p>
      <p>
        <strong>Description: </strong>Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
        ipsam, sapiente suscipit dicta eius velit amet aspernatur
        asperiores modi quidem expedita fugit.
      </p>
    </div>
    <div>
      <h3 className="text-dark">Sun Microsystems</h3>
      <p>Nov 2004 - Nov 2011</p>
      <p><strong>Position: </strong>Systems Admin</p>
      <p>
        <strong>Description: </strong>Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
        ipsam, sapiente suscipit dicta eius velit amet aspernatur
        asperiores modi quidem expedita fugit.
      </p>
    </div>
  </div> */}

  {/* <div className="profile-edu bg-white p-2">
    <h2 className="text-primary">Education</h2>
    <div>
      <h3>University Of Washington</h3>
      <p>Sep 1993 - June 1999</p>
      <p><strong>Degree: </strong>Masters</p>
      <p><strong>Field Of Study: </strong>Computer Science</p>
      <p>
        <strong>Description: </strong>Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
        ipsam, sapiente suscipit dicta eius velit amet aspernatur
        asperiores modi quidem expedita fugit.
      </p>
    </div>
  </div> */}

  {/* <div className="profile-github">
    <h2 className="text-primary my-1">
      <i className="fab fa-github"></i> Github Repos
    </h2>
    <div className="repo bg-white p-1 my-1">
      <div>
        <h4><Link to="" target="_blank"
            rel="noopener noreferrer">Repo One</Link></h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellat, laborum!
        </p>
      </div>
      <div>
        <ul>
          <li className="badge badge-primary">Stars: 44</li>
          <li className="badge badge-dark">Watchers: 21</li>
          <li className="badge badge-light">Forks: 25</li>
        </ul>
      </div>
    </div>
    <div className="repo bg-white p-1 my-1">
      <div>
        <h4><Link to="" target="_blank"
            rel="noopener noreferrer">Repo Two</Link></h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellat, laborum!
        </p>
      </div>
      <div>
        <ul>
          <li className="badge badge-primary">Stars: 44</li>
          <li className="badge badge-dark">Watchers: 21</li>
          <li className="badge badge-light">Forks: 25</li>
        </ul>
      </div>
    </div>
  </div>
</div> */}
</div>
        </Fragment>
}

EditProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(EditProfile);