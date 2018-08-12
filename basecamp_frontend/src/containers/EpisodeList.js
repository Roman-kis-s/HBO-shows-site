import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllEpisodes} from "../store/actions/episodes";
import EpisodeItem from '../components/EpisodeItem';
import {Link} from 'react-router-dom';

class EpisodeList extends Component {
    componentDidMount() {
        this.props.getAllEpisodes(this.props.match.url.split("/")[1], this.props.match.url.split("/").pop());
    }

    render() {
        const {episodes, currentUser} = this.props;
        let episodeList = episodes.map(episode => (
            <EpisodeItem
                key={episode._id}
                showTitle={this.props.match.url.split("/")[1]}
                seasonNumber={this.props.match.url.split("/").pop()}
                episodeNumber={episode.episodeNumber}
                episodeName={episode.episodeName}
            />
        ));
        return (
            <div>
                {currentUser.user.username === 'admin' && (<Link
                    to={`/${this.props.match.url.split("/")[1]}/${this.props.match.url.split("/")[2]}/episode/new`}
                    className='btn btn-success mb-3 mt-3'>Add new episode</Link>)}
                <br/>
                <div className='justify-content-center align-items-center'>
                    {episodeList}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        episodes: state.episodes.episodes,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {getAllEpisodes})(EpisodeList);

