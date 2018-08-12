import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPriorityShow} from "../store/actions/shows";
import PriorityShow from '../components/PriorityShow';

class Homepage extends Component {
    componentDidMount() {
        this.props.getPriorityShow();
    }


    render() {
        return (
            <div className='mt-5 mb-5'>
                <PriorityShow {...this.props.priorityShow}/>
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
        priorityShow: state.shows.priorityShow
    };
}

export default connect(mapStateToProps, {getPriorityShow})(Homepage);