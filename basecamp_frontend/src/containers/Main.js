import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Homepage from './Homepage';
import AuthForm from '../components/AuthForm';
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import withAuth from '../hocs/withAuth';
import ShowList from './ShowList';
import Show from './Show';
import ShowForm from '../components/ShowForm';
import SeasonForm from '../components/SeasonForm';
import Season from '../containers/Season';
import EpisodeForm from '../components/EpisodeForm';
import Episode from './Episode';

const Main = props => {
    const {authUser, errors, removeError} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path='/' component={Homepage}/>
                <Route exact path='/shows' render={props => <ShowList {...props}/>}/>

                <Route exact path='/signin' render={props => {
                    return (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText='Log in'
                            heading='Welcome back.'
                            {...props}/>
                    )
                }}/>
                <Route exact path='/signup' render={props => {
                    return (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            signUp
                            buttonText='Sign me up!'
                            heading='Join HBO today.'
                            {...props}/>
                    )
                }}/>

                <Route exact path='/:show' render={props => <Show {...props}/>}/>
                <Route exact path='/show/new' component={withAuth(ShowForm)}/>
                <Route exact path='/:show/update' component={withAuth(ShowForm)}/>


                <Route exact path='/:show/:season' render={props => <Season {...props}/>}/>
                <Route exact path='/:show/season/new' component={withAuth(SeasonForm)}/>
                <Route exact path='/:show/:season/update' component={withAuth(SeasonForm)}/>

                <Route exact path='/:show/:season/:episode' render={props => <Episode {...props}/>}/>
                <Route exact path='/:show/:season/episode/new' component={withAuth(EpisodeForm)}/>
                <Route exact path='/:show/:season/:episode/update' component={withAuth(EpisodeForm)}/>
            </Switch>

        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));