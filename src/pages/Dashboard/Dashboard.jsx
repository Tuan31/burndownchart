import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Row, Col, Input, Form, FormGroup, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/th';

import './Dashboard.scss';
import { formatDate } from '../../helper';

moment.locale('th');

const columns = [
  { type: 'number', label: 'Day' },
  { type: 'number', label: 'Ideal Burn' },
  { type: 'number', label: 'Actual Burn' },
];

const sprintname = localStorage.getItem('sprintName');
const totalscore = localStorage.getItem('totalScore');
const startdate = localStorage.getItem('startDate');
const enddate = localStorage.getItem('endDate');
const todayscore = localStorage.getItem('todayScore');
const thStartDate = formatDate(startdate);
const thEndDate = formatDate(enddate);

const row = [];

const row2 = [];
// row2.push(JSON.parse(localStorage.getItem('session')));
// localStorage.setItem('session', JSON.stringify(row2));

const a = new Date(startdate);
const b = a.getDate();
const c = new Date(enddate);
const d = c.getDate();

row.push([b,totalscore,'-'], [d,0,'-']);

row2.push(
  [b,'-', 75],
  [b+1,'-', 70],
  [b+2, '-', 55]
);

// let actualScore = localStorage.getItem('actualScore');
// if (actualScore === undefined || actualScore === null) {
//   let row2 = [];
//   row2 = JSON.parse(localStorage.getItem('session'));
//   row2.push([b,'-',totalscore]);
//   localStorage.setItem('session', JSON.stringify(row2));
// }


const Data = [columns, ...row, ...row2];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('todayScore', e.target.today_score.value);
  }

  handleSelectDate = (startDate) => {
    this.setState({ startDate: startDate });
    localStorage.setItem('scoreDate', startDate);
  }

  render() {
    return (
      <div className="dashboard">
        <Row className="dashboard-row">
          <Col className="col col-12 col-sm-12 col-lg-4">
            <div className="dashboard-box">
              Sprint Period
              <div className="burndowndate">Start: {moment(thStartDate).format('DD MMM YYYY')}</div>
              <div className="burndowndate">End: {moment(thEndDate).format('DD MMM YYYY')}</div>
            </div>
          </Col>
          <Col className="col col-12 col-sm-12 col-lg-4">
            <div className="dashboard-box">
              <div>
                Total Scores
              </div>
              <div className="total-score">
                {totalscore}
              </div>
            </div>
          </Col>
          <Col className="col col-12 col-sm-12 col-lg-4">
            <div className="dashboard-box">
              <div>
                Actual Score
              </div>
              <div className="score-date">
                <DatePicker
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  onChange={this.handleSelectDate}
                  isClearable={true}
                  placeholderText="Select date"
                />
              </div>
              <div className="form-score">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Input className="input-form" type="text" name="today_score"/>
                    <Button type="submit" outline color="secondary" className="score-btn">Submit</Button>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
        <div className="title">BurnDown Chart</div>
        <div className="chart">
          <Chart
            width={'1500px'}
            height={'450px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={Data}
            options={{
              title: sprintname,
              hAxis: {
                title: 'Day',
              },
              vAxis: {
                title: 'Score',
              },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
