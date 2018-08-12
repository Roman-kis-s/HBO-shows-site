import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllShows} from "../store/actions/shows";
import ShowItem from '../components/ShowItem';
import {Link} from 'react-router-dom';


class ShowList extends Component {
    componentDidMount() {
        this.props.getAllShows();
    }

    render() {
        const {shows, currentUser} = this.props;
        let showList = shows.map(show => (
            <ShowItem
                key={show._id}
                title={show.title}
                shortDesc={show.shortDescription}
                posterImage={show.posterImage}
                subtitle={show.subtitle}
            />
        ));
        return (
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-center mb-3 mt-3'>
                    {currentUser.user.username === 'admin' && (
                        <Link to='/show/new' className='btn btn-success'>Add new show</Link>)}
                </div>
                <div className='d-flex flex-row flex-wrap'>
                    {showList}
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        shows: state.shows.shows,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {getAllShows})(ShowList);