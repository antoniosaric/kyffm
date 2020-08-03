import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Profiles from './components/profile/Profiles';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/Edit';
import UpdateProfile from './components/profile/UpdateProfile';
import Tournaments from './components/tournaments/Tournaments';
import Tournamentssoloall from './components/tournaments/Tournamentssoloall';
import Tournamentsteamall from './components/tournaments/Tournamentsteamall';
import Resultssolo from './components/results/Resultssolo';
import Tournament from './components/tournaments/Tournament';
import Account from './components/profile/Account';
import CreateTournament from './components/tournaments/CreateTournament';
import PrivateRoute from './components/routing/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [] );
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar/>
            <Route exact path="/" component= { Landing } />
              <section className="container">
                <Alert />
                <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profiles" component={Profiles} />
                  <Route exact path="/profiles/profile/:id" component={Profile} />
                  <Route exact path="/tournaments" component={Tournaments} />
                  <Route exact path="/tournamentssoloall" component={Tournamentssoloall} />
                  <Route exact path="/tournamentsteamall" component={Tournamentsteamall} />
                  <Route exact path="/tournaments/tournament/:id" component={Tournament} />
                  <PrivateRoute exact path="/profile/edit" component={EditProfile} />
                  <PrivateRoute exact path="/results/solo/:id" component={Resultssolo} />
                  <PrivateRoute exact path="/profile/UpdateProfile" component={UpdateProfile} />
                  <PrivateRoute exact path="/CreateTournament" component={CreateTournament} />
                  <PrivateRoute exact path="/profile/account" component={Account} />
                </Switch>
              </section>
            <Footer />
        </Fragment>
      </Router>
    </Provider>
  )};


export default App;

