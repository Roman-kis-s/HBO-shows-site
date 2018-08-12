import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEpisode, deleteEpisode} from "../store/actions/episodes";
import {Link} from 'react-router-dom';

class Episode extends Component {
    componentDidMount() {
        this.props.getEpisode(this.props.match.url.split("/")[1], this.props.match.url.split("/")[2], this.props.match.url.split("/").pop());
    }

    handleDelete = () => {
        this.props.deleteEpisode(this.props.match.url.split("/")[1], this.props.match.url.split("/")[2], this.props.match.url.split("/").pop());
        this.props.history.push(`/${this.props.match.url.split("/")[1]}/${this.props.match.url.split("/")[2]}`);
    };

    render() {
        const {episode, currentUser} = this.props;
        return (
            <div>
                <div className='d-flex justify-content-around mb-3 mt-3'>
                    {currentUser.user.username === 'admin' && (<Link
                        to={`/${this.props.match.url.split("/")[1]}/${this.props.match.url.split("/")[2]}/${this.props.match.url.split("/").pop()}/update`}
                        className='btn btn-warning'>Update episode</Link>)}
                    {currentUser.user.username === 'admin' && (
                        <a className='btn btn-danger' onClick={this.handleDelete}>Delete episode</a>)}
                </div>
                <div>
                    <div className='d-flex flex-row'>
                        <div className='d-flex flex-column mr-auto justify-content-between'>
                            <h1>Episode {episode.episodeNumber}</h1>
                            <h3>Episode name: {episode.episodeName}</h3>
                            <h3>Show: {episode.relatedShow}</h3>
                            <h3>Season {episode.relatedSeason}</h3>
                            <h5>It has {episode.userRating}/10 rating</h5>
                        </div>
                        <div className='img-thumbnail  w-50 align-self-end'>
                            <img src={episode.featuredImage} alt="FeaturedImage" className='img-fluid'/>
                        </div>
                    </div>
                    <p>{episode.shortDescription}</p>
                    <p>{episode.longDescription}</p>
                    <div className='embed-responsive embed-responsive-21by9'>
                        <iframe id="ytplayer" type="text/html"
                                src={`http://www.youtube.com/embed/${episode.videoFragment}?autoplay=0`}
                                frameBorder="0" title={episode._id} className='embed-responsive-item' allowFullScreen/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        episode: state.episodes.episode,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {getEpisode, deleteEpisode})(Episode);