import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSeason, deleteSeason} from "../store/actions/seasons";
import {Link} from 'react-router-dom';
import EpisodeList from './EpisodeList';

class Season extends Component {
    componentDidMount() {
        this.props.getSeason(this.props.match.url.split("/")[1], this.props.match.url.split("/").pop());
    }

    handleDelete = () => {
        this.props.deleteSeason(this.props.match.url.split("/")[1], this.props.match.url.split("/").pop());
        this.props.history.push(`/${this.props.match.url.split("/")[1]}`);
    };

    render() {
        const {season, currentUser} = this.props;
        return (
            <div>
                <div className='d-flex flex-row justify-content-around'>
                    <div className='d-flex flex-column col-md-10 col-sm-12'>
                        <div className='d-flex justify-content-around mb-3 mt-3'>
                            {currentUser.user.username === 'admin' && (
                                <Link
                                    to={`/${this.props.match.url.split("/")[1]}/${this.props.match.url.split("/").pop()}/update`}
                                    className='btn btn-warning'>Update season</Link>)}
                            {currentUser.user.username === 'admin' && (
                                <a className='btn btn-danger' onClick={this.handleDelete}>Delete season</a>)}
                        </div>
                        <div>
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column mr-auto justify-content-between'>
                                    <h1>Season {season.seasonNumber}</h1>
                                    <h3>Season name: {season.seasonName}</h3>
                                    <h4>Show: {season.relatedShow}</h4>
                                    <h5>It has {season.userRating}/10 rating</h5>
                                </div>
                                <div className='img-thumbnail  w-50 align-self-end'>
                                    <img src={season.featuredImage} alt="FeaturedImage" className='img-fluid'/>
                                </div>
                            </div>
                            <p>{season.shortDescription}</p>
                            <p>{season.longDescription}</p>
                        </div>
                    </div>
                    <EpisodeList {...this.props}/>
                </div>
                <div className='embed-responsive embed-responsive-21by9'>
                    <iframe id="ytplayer" type="text/html"
                            src={`http://www.youtube.com/embed/${season.videoFragment}?autoplay=0`}
                            frameBorder="0" title={season._id} className='embed-responsive-item' allowFullScreen/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        season: state.seasons.season,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {getSeason, deleteSeason})(Season);