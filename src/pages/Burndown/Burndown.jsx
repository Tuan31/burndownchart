import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Row, Col, Button } from 'reactstrap';
//import { DateRange } from 'react-date-range';
//import DayPicker, { DateUtils } from 'react-day-picker';
import DatePicker from 'react-datepicker';


import './Burndown.scss';

class Burndown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      startDate: '',
      endDate: '',
    };
  }

  handleSubmit = (e) => {
    localStorage.setItem('totalScore', e.target.total_score.value);
    localStorage.setItem('sprintName', e.target.sprintname.value);
  }


  handleChange = value => this.setState({ value })

  // handleSelect = range => {
  //   console.log('>>>>>', range);
  //   //this.setState({ range });
  // }

  // handleDayClick(day) {
  //   const range = DateUtils.addDayToRange(day, this.state);
  //   console.log('>>>>', range);
  //   //this.setState(range);
  // }

  handleChangeStart = (startDate) => {
    this.setState({ startDate: startDate });
    localStorage.setItem('startDate', startDate);
  }

  handleChangeEnd = (endDate) => {
    this.setState({ endDate: endDate });
    localStorage.setItem('endDate', endDate);
  }
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="burndown">
        <Row className="burndown-row">
          <Col className="col col-12 col-sm-12">
            <div className="burndown-box">
              <Form className="form-submit" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label className="form-label">Sprint Name:</Label>
                  <Input className="input-form" type="text" name="sprintname" />
                </FormGroup>
                <FormGroup>
                  <Label className="form-label">Start_Date:</Label>
                  <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    isClearable={true}
                    placeholderText="Select start date"
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-label">End_Date:</Label>
                  <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    minDate={this.state.startDate}
                    isClearable={true}
                    placeholderText="Select end date"
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-label">Total Score:</Label>
                  <Input className="input-form" type="text" name="total_score" />
                </FormGroup>
                <Button type="submit" outline color="secondary" className="submit-btn">Submit</Button>
              </Form> 
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Burndown;
