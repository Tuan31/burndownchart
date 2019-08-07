import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';
import { fetchGetUsers } from '../../actions';
import UserAvatar from '../Avatar/Avatar';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      avatar: '',
    };
    props.dispatch(fetchGetUsers());
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { getUsers } = this.props;
    if (nextProps.getUsers && nextProps.getUsers !== getUsers) {
      this.setState({ 
        email: nextProps.getUsers.data.email,
        firstname: nextProps.getUsers.data.first_name,
        lastname: nextProps.getUsers.data.last_name,
        avatar: nextProps.getUsers.data.avatar,
      });
    }
  }
  render() {
    const { firstname, lastname, email, avatar } = this.state;
    return (
      <div className="topnav">
        <NavLink className="topbar-menu-item topbar-menu" activeClassName="topbar-menu-active" to="/home">
          <span className="fas fa-home" />
          <span>Home</span>
        </NavLink>
        <NavLink className="topbar-menu-item topbar-menu" activeClassName="topbar-menu-active" to="/burndown">
          <span className="fas fa-columns" />
          <span>BurnDown</span>
        </NavLink>
        <NavLink className="topbar-menu-item topbar-menu" activeClassName="topbar-menu-active" to="/dashboard">
          <span className="fas fa-chart-line" />
          <span>DashBoard</span>
        </NavLink>
        <NavLink className="topbar-menu-item topbar-menu-right" activeClassName="topbar-menu-active">
          <div className="dropdown">
            <UserAvatar size="42" name={firstname ? firstname : '-'} src={avatar} />
            <div className="dropdown-content">
              <div><span className="firstname">{firstname}</span><span className="lastname">{lastname}</span></div>
              <div>{email}</div>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}

Topbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getUsers: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const {
    getUsers,
  } = state;
  return {
    getUsers: getUsers.data,
  };
};

export default connect(mapStateToProps)(Topbar);



