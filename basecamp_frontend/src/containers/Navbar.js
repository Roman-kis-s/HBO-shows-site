import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from "../store/actions/auth";

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <Link to='/' className='navbar-brand'>HBO</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarNav">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <Link to='/shows' className='nav-link'>Shows</Link>
                        </li>
                    </ul>
                        {this.props.currentUser.isAuthenticated ? (
                            <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item img-thumbnail text-center">
                                        <img
                                            className='img-fluid avatar'
                                            src={this.props.currentUser.user.profileImageUrl}
                                            alt="this.props.currentUser.user.username"
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <a  className='nav-link'>{this.props.currentUser.user.username}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={this.logout} className='nav-link'>Logout</a>
                                    </li>
                            </ul>
                        ) : (
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/signup' className='nav-link'>Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signin' className='nav-link'>Signin</Link>
                                </li>
                            </ul>
                        )}
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {logout})(Navbar);