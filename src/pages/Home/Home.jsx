import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Row, Col } from 'reactstrap';

import './Home.scss';
import { fetchGetUsers } from '../../actions';

//const isVisited = localStorage.getItem('alreadyVisited');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isVisited: null,
      data: null,
      email: '',
      firstname: '',
      lastname: '',
    };
    props.dispatch(fetchGetUsers());
  }

  // componentWillMount() {
  //     if (isVisited === undefined || isVisited === null) {
  //         this.setState({ redirect: true });
  //         this.setState({ isVisited: localStorage.setItem('alreadyVisited', 1)})
  //     }    
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { getUsers } = this.props;
    
    if (nextProps.getUsers && nextProps.getUsers !== getUsers) {
      this.setState({ 
        email: nextProps.getUsers.data.email,
        firstname: nextProps.getUsers.data.first_name,
        lastname: nextProps.getUsers.data.last_name,
      });
    }
  }

  render() {
    const { redirect, isVisited, firstname, email, lastname } = this.state;
    if (redirect && isVisited !== null) {
      return <Redirect to="/welcome" />;
    }
    return (
      <div>
        <div className="home">
          <div>
            <Row className="profile-row" key={Math.random()}>
              <Col className="col col-12 col-sm-12">
                <div className="profile-box">
                  <div>Firstname : {firstname}</div>
                  <div>Lastname : {lastname}</div>
                  <div>Email : {email}</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
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

export default connect(mapStateToProps)(Home);
