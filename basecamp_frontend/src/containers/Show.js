import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getShow, deleteShow} from "../store/actions/shows";
import {Link} from 'react-router-dom';
import SeasonList from './SeasonList';

class Show extends Component {
    componentDidMount() {
        this.props.getShow(this.props.match.url.split("/").pop());
    }

    handleDelete = () => {
        this.props.deleteShow(this.props.show.title);
        this.props.history.push('/shows');
    };

    render() {
        const {show, currentUser} = this.props;
        return (
            <div>
                <div className='d-flex flex-row justify-content-around'>
                    <div className='d-flex flex-column col-md-10 col-sm-12'>
                        <div className='d-flex justify-content-around mb-3 mt-3'>
                            {currentUser.user.username === 'admin' && (
                                <Link to={`/${this.props.match.url.split("/").pop()}/update`}
                                      className='btn btn-warning'>Update show</Link>)}
                            {currentUser.user.username === 'admin' && (
                                <a className='btn btn-danger' onClick={this.handleDelete}>Delete show</a>)}
                        </div>
                        <div>
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column mr-auto justify-content-between'>
                                    <h1>{show.title}</h1>
                                    <h3>{show.subtitle}</h3>
                                    <h4>Show started in {show.dateOfStart}</h4>
                                    <h5>It has {show.userRating}/10 rating</h5>
                                </div>
                                <div className='img-thumbnail  w-50 align-self-end'>
                                    <img src={show.posterImage} alt="Poster" className='img-fluid'/>
                                </div>
                            </div>
                            <p>{show.shortDescription}</p>
                            <p>{show.longDescription}</p>
                        </div>
                    </div>
                    <SeasonList {...this.props}/>
                </div>
                <div className='embed-responsive embed-responsive-21by9'>
                    <iframe id="ytplayer" type="text/html"
                            src={`http://www.youtube.com/embed/${show.videoFragment}?autoplay=0`}
                            frameBorder="0" title={show._id} className='embed-responsive-item' allowFullScreen/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        show: state.shows.show,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {getShow, deleteShow})(Show);