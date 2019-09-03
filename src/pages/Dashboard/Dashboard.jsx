import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from 'react-google-charts';
import { Row, Col, Input, Form, FormGroup, Button } from 'reactstrap';
import { Redirect } from 'react-router';
import DatePicker from 'react-datepicker';

import './Dashboard.scss';
import { formatDate, formatMonth, formatYear, monthEN2TH } from '../../helper';
import { fetchGetCharts } from '../../actions';

const totalscore = localStorage.getItem('totalScore');
const startdate = localStorage.getItem('startDate');
const enddate = localStorage.getItem('endDate');
const startDate = `${formatDate(startdate)} ${monthEN2TH(formatMonth(startdate))} ${formatYear(startdate)}`;
const endDate = `${formatDate(enddate)} ${monthEN2TH(formatMonth(enddate))} ${formatYear(enddate)}`;

const newStartDate = new Date(localStorage.getItem('startDate'));
const newEndDate = new Date(localStorage.getItem('endDate'));


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: [],
      store_data: [],
      redirect: false,
    };
    props.dispatch(fetchGetCharts());
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { getCharts } = this.props;

    if (nextProps.getCharts && nextProps.getCharts !== getCharts) {
      
      const store_data = [];
      nextProps.getCharts.forEach(ele => {
        store_data.push([
          new Date(ele.date), ele.idealData, ele.sum,
        ]);
      });
      this.setState({ store_data });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const date = e.target.date.value;
    const dailyScore = e.target.dailyscore.value;

    const new_date = new Date(date);
    const start = new Date(startdate);
    
    let row2 = [];
    row2 = JSON.parse(localStorage.row2 || 'null') || [];
    let score = dailyScore;

    let storeData = {
      'date': new_date.toISOString(),
      'idealData': '-',
      'score': score,
      'sum': totalscore - score,
    };
  
    function pushToArray(arr, obj) {
      const index = arr.findIndex((e) => e.date === obj.date);
      if (index === -1) {
        arr.push(obj);
      } else {
        arr[index] = obj;
      }
    }
  
    pushToArray(row2, storeData);
      
    row2.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1 );
    localStorage['row2'] = JSON.stringify(row2);

    for (;start <= new_date; start.setDate(start.getDate()+1)) {
      let row2 = [];
      row2 = JSON.parse(localStorage.row2 || 'null') || [];

      let Sum = totalscore;
      row2.map(item => {
        item.sum = Sum - item.score;
        Sum = Sum - item.score;
        return item;
      });
      let score = 0;
      let storeData = {
        'date': start.toISOString(),
        'idealData': '-',
        'score': score,
        'sum': Sum,
      };

      const updateArr = function pushToArray(arr, obj) {
        const index = arr.findIndex((e) => e.date === obj.date);
        if (index === -1) {
          arr.push(obj);
        }
      };
       
      updateArr(row2, storeData);

      row2.sort((a, b) => (a.date > b.date) ? 1 : -1 );
      localStorage['row2'] = JSON.stringify(row2);
      localStorage.setItem('remainScore', Sum);
    }
    this.props.dispatch(fetchGetCharts());
  }

  handleSelectDate = selectDate => {
    this.setState({ selectDate });
  }

  handleClick = () => {
    localStorage.removeItem('row2');
    localStorage.removeItem('remainScore');
    localStorage.removeItem('totalScore');
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    localStorage.removeItem('sprintName');
  
    window.location.reload();
  }
  

  render() {
    const { store_data, redirect } = this.state;
    
    if (redirect) {
      return <Redirect to="/burndown" />;
    }
    
    const columns = [
      { type: 'date', label: 'Day' },
      { type: 'number', label: 'Ideal Burn' },
      { type: 'number', label: 'Actual Burn' },
    ];
    
    const row = [
      { 'date': newStartDate, 'idealData': totalscore, 'score': '-' },
      { 'date': newEndDate, 'idealData': 0, 'score': '-' },
    ];
  
    const rowData = [];
    row.forEach(ele => {
      rowData.push([
        ele.date, ele.idealData, ele.score,
      ]);
    });

    const Data = [columns, ...rowData, ...store_data];

    return (
      <div className="Dashboard">
        <Row className="dashboard-row">
          <Col className="col col-12 col-sm-12 col-lg-4">
            <div className="dashboard-box">
              Sprint Period
              <div className="burndowndate">เริ่ม : {(startdate === null || undefined) ? '-' : startDate}</div>
              <div className="burndowndate">สิ้นสุด : {(enddate === null || undefined) ? '-' : endDate}</div>
            </div>
          </Col>
          <Col className="col col-12 col-sm-12 col-lg-4">
            <div className="dashboard-box">
              <div>
                คะแนนรวมทั้งหมด
              </div>
              <div className="total-score">
                {totalscore ? totalscore : '-'}
              </div>
              <div>
                คะแนนที่เหลือ
              </div>
              <div className="total-score">
                {localStorage.getItem('remainScore') ? localStorage.getItem('remainScore') : '-'}
              </div>
            </div>
          </Col>
          <Col className="col col-12 col-sm-12 col-lg-4">
            <div className="dashboard-box">
              <div>
                Daily Score
              </div>
              <Form onSubmit={this.handleSubmit}>
                <div className="score-date">
                  <DatePicker
                    selected={this.state.selectDate}
                    selectsStart
                    startDate={this.state.selectDate}
                    onChange={this.handleSelectDate}
                    name="date"
                    minDate={new Date(startdate)}
                    maxDate={new Date(enddate)}
                    isClearable={true}  
                    placeholderText="select date"
                  />           
                </div>
                <div className="form-score">
                  <FormGroup>
                    <Input className="input-form" type="number" min="0" max={localStorage.getItem('remainScore')} name="dailyscore" />
                    <Button type="submit" outline color="secondary" className="score-btn">Submit</Button>
                  </FormGroup>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <div className="title">BurnDown Chart</div>
        <div className="chart">
          <Chart
            width={'1200px'}
            height={'450px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={Data}
            options={{
              title: localStorage.getItem('sprintName'),
              hAxis: {
                title: 'Day',
                format: 'dd/MM',
              },
              vAxis: {
                title: 'Score',
              },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <div className="finish-btn">
          <Button type="button" color="danger" className="finish-btn" onClick={this.handleClick}>Finish</Button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getCharts: PropTypes.array,
};

const mapStateToProps = (state) => {
  const {
    getCharts,
  } = state;
  return {
    getCharts: getCharts.data,
  };
};

export default connect(mapStateToProps)(Dashboard);
