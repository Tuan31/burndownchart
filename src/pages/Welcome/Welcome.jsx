import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import './Welcome.scss';

class Welcome extends Component {

  render() {
    return (
      <div className="Welcome">
        <Row className="welcome-row">
          <Col className="col col-12 col-sm-12">
            <div className="welcome-box">
              <div>Welcome To My App!</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Welcome;
