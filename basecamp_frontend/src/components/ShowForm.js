import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addShow, updateShow} from "../store/actions/shows";
import {removeError} from "../store/actions/errors";

class ShowForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subtitle: '',
            dateOfStart: '',
            posterImage: '',
            longDescription: '',
            shortDescription: '',
            priority: '',
            videoFragment: '',
            userRating: '',
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const action = this.props.match.url.split("/").pop();
        const showTitle = this.props.match.url.split("/")[1];
        switch (action) {
            case 'new':
                this.props.addShow(this.state);
                break;
            case 'update':
                this.props.updateShow(
                    showTitle,
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
            title: '',
            subtitle: '',
            dateOfStart: '',
            posterImage: '',
            longDescription: '',
            shortDescription: '',
            priority: '',
            videoFragment: '',
            userRating: '',
        });
        this.props.history.push(`/shows`);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const {
            title,
            subtitle,
            dateOfStart,
            posterImage,
            longDescription,
            shortDescription,
            priority,
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
                            <h2>{this.props.match.url.split("/").pop() === 'new' ? 'Add show' : 'Update show'}</h2>
                            {errors.message && (
                                <div className='alert alert-danger'>
                                    {errors.message}
                                </div>)}
                            <label htmlFor="title">Title (ex. Game of thrones):</label>
                            <input className='form-control'
                                   id='title'
                                   name='title'
                                   onChange={this.handleChange}
                                   value={title}
                                   type="text"
                            />
                            <label htmlFor="subtitle">Subtitle:</label>
                            <input className='form-control'
                                   id='subtitle'
                                   name='subtitle'
                                   onChange={this.handleChange}
                                   value={subtitle}
                                   type="text"
                            />
                            <label htmlFor="dateOfStart">Date of start:</label>
                            <input className='form-control'
                                   id='dateOfStart'
                                   name='dateOfStart'
                                   onChange={this.handleChange}
                                   value={dateOfStart}
                                   type="text"
                            />
                            <label htmlFor="posterImage">Poster image (url):</label>
                            <input className='form-control'
                                   id='posterImage'
                                   name='posterImage'
                                   onChange={this.handleChange}
                                   value={posterImage}
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
                            <label htmlFor="priority">Priority (yes or no):</label>
                            <select className='form-control'
                                    id='priority'
                                    name='priority'
                                    onChange={this.handleChange}
                                    value={priority}>
                                <option value='no'>No</option>
                                <option value='yes'>Yes</option>
                            </select>
                            <label htmlFor="videoFragment">Video fragment (only youtube id`s, ex. "m5r8jsoZE3Q"):</label>
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

export default connect(mapStateToProps, {addShow, updateShow, removeError})(ShowForm);