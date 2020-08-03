import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { createTournament } from '../../actions/tournament';



const CreateTournament = ({ profile: { profile, loading }, createTournament, auth, getCurrentProfile, history }) => {

    window.scrollTo(0, 0);

    const [formData, setFormData] = useState({
        title: '',
        summary: '',	
        type: '',	
        status: '',	
        buyin: '',	
        start_date: '',	
        end_date: '',
        maximum_players: '',
        minimum_players: '',
        game_id: ''
    });

    const {
      title,
      summary,	
      type,	
      status,	
      buyin,	
      start_date,	
      end_date,
      maximum_players,
      minimum_players,
      game_id
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e =>{
      formData.status = 'active';
      e.preventDefault();
      createTournament( formData, history );
    }

    return (
    <Fragment>
      <h1 className="large text-white">Create A Tournament</h1>

      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <select name="game_id" value={game_id} onChange={e=> onChange(e)}>
            <option value="0">* Select A Game</option>
            <option value="5f1004205f93f71f8a8f89f3">Quake Champions</option>
          </select>
        </div>

        <div className="form-group">
          <select name="type" value={type.value} onChange={e=> onChange(e)}>
            <option value="0">* Select A Game Type</option>
            <option value="1v1">One vs One</option>
            <option value="teamdeathmatch">team deathmatch</option>
            <option value="deathmatch">deathmathc</option>
            <option value="freeforall">free for all</option>
          </select>
        </div>

        <div className="form-group">
          <input type="text" placeholder="title" name="title" value={title} onChange={e=> onChange(e)}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="summary" name="summary" value={summary} onChange={e=> onChange(e)}/>
        </div>

        <div className="form-group">
          <input type="number" placeholder="minimum_players" name="minimum_players" value={minimum_players} onChange={e=> onChange(e)}/>
          <input type="number" placeholder="maximum_players" name="maximum_players" value={maximum_players} onChange={e=> onChange(e)}/>

        </div>

        <div className="form-group">
          <input type="datetime-local" placeholder="start time" name="start_date" value={start_date} onChange={e=> onChange(e)}/>
          <input type="datetime-local" placeholder="end time" name="end_date" value={end_date} onChange={e=> onChange(e)}/>

        </div>

        <div className="form-group">
          <input type="number" placeholder="buyin" name="buyin" value={buyin} onChange={e=> onChange(e)}/>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/profile/edit">Go Back</Link>
      </form>
    </Fragment>
    )
}

CreateTournament.propTypes = {
  createTournament: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createTournament, getCurrentProfile })( withRouter(CreateTournament));
