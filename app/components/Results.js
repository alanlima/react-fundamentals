import React, { Component } from 'react';
import QueryString from 'query-string';
import Api from 'utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from 'components/PlayerPreview';
import Loading from 'components/loading';

function Profile(props){
    const info = props.info;
    return (
        <PlayerPreview
            avatar={info.avatar_url}
            username={info.login}>

            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>

        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired,
}

function Player(props) {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign: 'center' }}>Score: {props.score}</h3>

            <Profile info={props.profile}/>
        </div>
    );
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}

class Results extends Component {
    constructor(props){
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        const players = QueryString.parse(this.props.location.search);

        Api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function(results){
            if(results == null){
                return this.setState({
                    error: 'Looks like there was error. Check that both users exists on GitHub',
                    loading: false
                });
            }

            this.setState({
                winner: results[0],
                loser: results[1],
                error: null,
                loading: false
            });

            console.log('results', results);
        }.bind(this));
    }

    render(){
        const error = this.state.error;
        const winner = this.state.winner;
        const loser = this.state.loser;
        const loading = this.state.loading;

        if(loading === true) {
            return <Loading />;
        }

        if(error){
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player 
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile} />
                
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile} />
            </div>
        )
    }
}

module.exports = Results;