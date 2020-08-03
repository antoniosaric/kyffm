import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTournamentById } from '../../actions/tournament';
import { addResultSolo } from '../../actions/result';
import Spinner from '../layout/Spinner';



const ResultsSolo = ({ getTournamentById, tournament: { tournament, loading }, addResultSolo, auth, history, match }) => {

    useEffect(() => {
        getTournamentById(match.params.id);
    }, [getTournamentById, match.params.id]);

    window.scrollTo(0, 0);

    const [formData, setFormData] = useState({ winner: '' });
    // const submitCompetitors = tournament.competitors;

    const {
      winner
    } = formData;
    
    // const handleChange = e => {
    //     if (["payout", "result", "user_id"].includes(e.target.className) ) {
    //       let competitors = [...formData]   
    //       competitors[e.target.dataset.id][e.target.className] = e.target.value
    //       this.setState({ competitors }, () => console.log(...formData))
    //     } else {
    //       this.setState({ [e.target.name]: e.target.value })
    //     }
    //   }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // const minusPot = e => { tournament.pot = tournament.pot - e.target.value };

    const onSubmit = e =>{
        e.preventDefault();
        let competitors = {}
        let competitorArr = []
        for( let i = 0; i < tournament.competitors.length; i++ ){
            let tempObj = {};
            if(tournament.competitors[i].user_id === formData.winner){
                tempObj["user_id"] = tournament.competitors[i].user_id;
                tempObj["result"] = "winner";
                tempObj["payout"] = tournament.pot;
            }else{
                tempObj["user_id"] = tournament.competitors[i].user_id;
                tempObj["result"] = "loser";
                tempObj["payout"] = 0;
            }
            competitorArr.push(tempObj);
        }
        competitors['competitors'] = competitorArr;
        addResultSolo( competitors, match.params.id );
    }

    return loading || tournament === null ? <Spinner /> : 
    <Fragment>
      <h1 className="large text-white">Post Results For: {tournament.title}</h1>
        <h3>Pot: {tournament.pot}</h3>
        <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="p-1">
            <div className="box">
                <div className="form-group">
                    <select name="winner" value={winner} onChange={e=> onChange(e)}>
                        <option value="0">* Select Winner</option>
                        {tournament.competitors.map((competitor, index) => (
                            <option value={competitor.user_id} key={index}>{competitor.username}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" Link to={`/tournaments/tournament/${match.params.id}`}>Go Back</Link>
      </form>
    </Fragment>

}

ResultsSolo.propTypes = {
  auth: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  resultsSolo: PropTypes.func.isRequired,
  getTournamentById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    tournament: state.tournament
})

export default connect(mapStateToProps, { getTournamentById, addResultSolo })( withRouter(ResultsSolo));


     
            // <div className="p-1" key={index}>
            //     <div className="box">
            //         <p><input type="text" placeholder="payout" name="user_id" data-id={index} value={competitor.user_id} disabled = "disabled" style={{display: 'none'}}/>{competitor.username}</p>
            //         <div className="form-group">
            //             <select name="result" value={result} onChange={e=> onChange(e)} data-id={index}>
            //                 <option value="0">* Select Winner</option>
            //                 <option value="1st place">1st Place</option>
            //                 <option value="2nd place">2nd Place</option>
            //                 <option value="3rd place">3rd Place</option>
            //                 <option value="participation award">participation award</option>
            //             </select>

            //             <div className="form-group">
            //                 <input type="number" min='0' data-id={index} placeholder="payout" name="payout" value={payout} onChange={e => { onChange(e); minusPot(e) } }/>
            //             </div>
            //         </div>
            //     </div>
            // </div>