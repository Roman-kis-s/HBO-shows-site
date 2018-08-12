import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentWillMount() {
            if (this.props.currentUser.user.username !== 'admin') {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.currentUser.user.username !== 'admin') {
                this.props.history.push('/signin');
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {
            currentUser: state.currentUser,
        }
    }

    return connect(mapStateToProps)(Authenticate);
}



