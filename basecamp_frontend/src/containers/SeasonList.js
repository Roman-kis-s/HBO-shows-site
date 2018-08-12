import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllSeasons} from "../store/actions/seasons";
import SeasonItem from '../components/SeasonItem';
import {Link} from 'react-router-dom';

class SeasonList extends Component {
    componentDidMount() {
        this.props.getAllSeasons(this.props.match.url.split("/").pop());
    }

    render() {
        const {seasons, currentUser} = this.props;
        let seasonList = seasons.map(season => (
            <SeasonItem
                key={season._id}
                showTitle={this.props.match.url.split("/").pop()}
                seasonNumber={season.seasonNumber}
            />
        ));
        return (
            <div>
                {currentUser.user.username === 'admin' && (
                    <Link to={`/${this.props.match.url.split("/").pop()}/season/new`} className='btn btn-success mb-3 mt-3'>Add
                        new season</Link>)}
                <br/>
                <div className='justify-content-center align-items-center'>
                    {seasonList}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        seasons: state.seasons.seasons,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {getAllSeasons})(SeasonList);

