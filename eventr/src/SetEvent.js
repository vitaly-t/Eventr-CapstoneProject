import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';



const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

class DateSelector extends Component {
      constructor(props) {
        super(props);
    
        this.state = {
          controlledDate: null,
        };
      }
    
      handleChange = (event, date) => {
        this.setState({
          controlledDate: date,
        });
      };
    
      render() {
        return (
          <DatePicker
            hintText="Select Date"
            value={this.state.controlledDate}
            onChange={this.handleChange}
          />
        );
      }
    }
class TimeSelector extends Component {
          constructor(props) {
            super(props);
            this.state = {value24: null, value12: null};
          }
        
          handleChangeTimePicker24 = (event, date) => {
            this.setState({value24: date});
          };
        
          handleChangeTimePicker12 = (event, date) => {
            this.setState({value12: date});
          };
        
          render() {
            return (
              <div>
                <TimePicker
                  format="ampm"
                  hintText="Set Time"
                  value={this.state.value12}
                  onChange={this.handleChangeTimePicker12}
                />
              </div>
            );
          }
        }

export class SetEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div className='seteventtoggle'>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Location/Date/Time" value={0} />
          <Tab label="Type of Event" value={1} />
          <Tab label="Invite!" value={2} />
          <Tab label="Items needed!" value={3} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
            <div>
                <div>
                    <h2 style={styles.headline}>Where and when?</h2>
                    <hr/>
                    Type in the details below.<br />
                    <TextField
                        floatingLabelText="Address"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                </div>
                <div>
                    <DateSelector/>
                </div>
                <div>
                    <TimeSelector/>
                </div>
            </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}