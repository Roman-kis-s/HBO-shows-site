import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeError} from "../store/actions/errors";
import {addEpisode, updateEpisode} from "../store/actions/episodes";


class EpisodeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            episodeName: '',
            episodeNumber: '',
            relatedShow: '',
            relatedSeason: '',
            longDescription: '',
            shortDescription: '',
            featuredImage: '',
            videoFragment: '',
            userRating: '',
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const action = this.props.match.url.split("/").pop();
        const relatedShow = this.props.match.url.split("/")[1];
        const relatedSeason = this.props.match.url.split("/")[2];
        const episodeNumber = this.props.match.url.split("/")[3];
        switch (action) {
            case 'new':
                this.props.addEpisode(relatedShow, relatedSeason, this.state);
                break;
            case 'update':
                this.props.updateEpisode(
                    relatedShow,
                    relatedSeason,
                    episodeNumber,
                    Object.keys(this.state)
                        .filter(key => this.state[key])
                        .reduce((obj, key) => {
                            obj[key] = this.state[key];
                            return obj;
                        }, {})
                );
                break;
            default:

        }
        this.setState({
            episodeName: '',
            episodeNumber: '',
            relatedShow: '',
            relatedSeason: '',
            longDescription: '',
            shortDescription: '',
            featuredImage: '',
            videoFragment: '',
            userRating: '',
        });
        this.props.history.push(`/${relatedShow}/${relatedSeason}`);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const {
            episodeName,
            episodeNumber,
            relatedShow,
            relatedSeason,
            longDescription,
            shortDescription,
            featuredImage,
            videoFragment,
            userRating
        } = this.state;
        const {errors, history, removeError} = this.props;

        history.listen(() => {
            removeError();
        });

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{this.props.match.url.split("/").pop() === 'new' ? 'Add episode' : 'Update episode'}</h2>
                            {errors.message && (
                                <div className='alert alert-danger'>
                                    {errors.message}
                                </div>)}
                            <label htmlFor="episodeName">Episode name:</label>
                            <input className='form-control'
                                   id='episodeName'
                                   name='episodeName'
                                   onChange={this.handleChange}
                                   value={episodeName}
                                   type="text"
                            />
                            <label htmlFor="episodeNumber">Episode number (only one digit ex. 4):</label>
                            <input className='form-control'
                                   id='episodeNumber'
                                   name='episodeNumber'
                                   onChange={this.handleChange}
                                   value={episodeNumber}
                                   type="text"
                            />
                            <label htmlFor="relatedShow">Related show (ex. Game of thrones):</label>
                            <input className='form-control'
                                   id='relatedShow'
                                   name='relatedShow'
                                   onChange={this.handleChange}
                                   value={relatedShow}
                                   type="text"
                            />
                            <label htmlFor="relatedSeason">Related season (only one digit ex. 4):</label>
                            <input className='form-control'
                                   id='relatedSeason'
                                   name='relatedSeason'
                                   onChange={this.handleChange}
                                   value={relatedSeason}
                                   type="text"
                            />
                            <label htmlFor="longDescription">Long description:</label>
                            <textarea className='form-control'
                                      id='longDescription'
                                      name='longDescription'
                                      onChange={this.handleChange}
                                      value={longDescription}
                            />
                            <label htmlFor="shortDescription">Short description:</label>
                            <textarea className='form-control'
                                      id='shortDescription'
                                      name='shortDescription'
                                      onChange={this.handleChange}
                                      value={shortDescription}
                            />
                            <label htmlFor="featuredImage">Featured image:</label>
                            <input className='form-control'
                                   id='featuredImage'
                                   name='featuredImage'
                                   onChange={this.handleChange}
                                   value={featuredImage}
                                   type="text"
                            />
                            <label htmlFor="videoFragment">Video fragment (only youtube id`s, ex.
                                "m5r8jsoZE3Q"):</label>
                            <input className='form-control'
                                   id='videoFragment'
                                   name='videoFragment'
                                   onChange={this.handleChange}
                                   value={videoFragment}
                                   type="text"
                            />
                            <label htmlFor="userRating">User rating (from 1 to 10):</label>
                            <input className='form-control'
                                   id='userRating'
                                   name='userRating'
                                   onChange={this.handleChange}
                                   value={userRating}
                                   type="number"
                                   min='1' max='10'
                            />
                            <br/>
                            <button type='submit'
                                    className='btn btn-primary btn-block btn-lg'>{this.props.match.url.split("/").pop() === 'new' ? 'Add' : 'Update'}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, {addEpisode, updateEpisode, removeError})(EpisodeForm);