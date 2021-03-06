import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ItemList from './ListOfItems.js'
import SubmitSnackBar from './Submit.js'

import './App.css';


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

const persons = [
    {value: 0, name: 'Oliver Hansen'},
    {value: 1, name: 'Van Henry'},
    {value: 2, name: 'April Tucker'},
    {value: 3, name: 'Ralph Hubbard'},
    {value: 4, name: 'Omar Alexander'},
    {value: 5, name: 'Carlos Abbott'},
    {value: 6, name: 'Miriam Wagner'},
    {value: 7, name: 'Bradley Wilkerson'},
    {value: 8, name: 'Virginia Andrews'},
    {value: 9, name: 'Kelly Snyder'},
  ];

class EventSummary extends Component{
    constructor(props){
        super(props);

        this.state = {
            EventAddress: null,
            EventDate: null,
            EventTime: null,
            EventType: null,
            EventPeepNames: [],
            EventPeepCount: null,


        }
    }
}

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
        this.state = { value12: null};
    }


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

class PartyTypeTable extends Component {
    state = {
      height: '300px',
      selected: [3],
      types:[]
    };
    componentDidMount(){
      fetch('/get_tables_data/event_categories/category_id')
        .then(res=> res.json())
        .then(types => this.setState({types}));
    }
    
    isSelected = (index) => {
      return this.state.selected.indexOf(index) !== -1;
    };
  
    handleRowSelection = (selectedRows) => {
      this.setState({
        selected: selectedRows,
      });
    };
  
    render() {
      return (
        <div>
          <h2 style={styles.headline} style={{textAlign: 'center'}}>Select type of event</h2>   
            <Table onRowSelection={this.handleRowSelection} height={this.state.height}>
              <TableBody>
              {this.state.types.map(type=>
                <TableRow selected={this.isSelected(type.category_id)}>
                  <TableRowColumn>{type.category_name}</TableRowColumn>
                </TableRow>
              )}
              </TableBody>
            </Table>
        </div>
      );
    }
  }

class SelectFriends extends Component {
    state = {
      values: [],
    };
  
    handleChange = (event, index, values) => this.setState({values});
  
    selectionRenderer = (values) => {
      switch (values.length) {
        case 0:
          return '';
        case 1:
          return persons[values[0]].name;
        default:
          return `${values.length} friends invited`;
      }
    }
  
    menuItems(persons) {
      return persons.map((person) => (
        <MenuItem
          key={person.value}
          insetChildren={true}
          checked={this.state.values.indexOf(person.value) > -1}
          value={person.value}
          primaryText={person.name}
        />
      ));
    }
  
    render() {
      return (
        <SelectField
          multiple={true}
          hintText="Select a name"
          value={this.state.values}
          onChange={this.handleChange}
          selectionRenderer={this.selectionRenderer}
        >
          {this.menuItems(persons)}
        </SelectField>
      );
    }
  }

  /**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class SubmitButton extends Component {
    state = {
      open: false,
    };
  
    handleOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    };
  
    render() {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}>
        </FlatButton>,
      ];
  
      return (
        <div>
          <RaisedButton label="Sumbit" onClick={this.handleOpen} />
          <Dialog
            title="Lets do this"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Ready to party?
          </Dialog>
          
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
          style={{
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Tab style={{flexWrap:'wrap'}}label="When & Where" value={0} />
          <Tab style={{flexWrap:'wrap'}}label="Event Type" value={1} />
          <Tab style={{flexWrap:'wrap'}}label="Invite" value={2} />
          <Tab style={{flexWrap:'wrap'}}label="Items" value={3} />
          <Tab style={{flexWrap:'wrap'}}label="Finish" value={4} />
        </Tabs>
        <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
        >
            <div style={{textAlign: 'center'}}>
                <div>
                    <h2 style={styles.headline} style={{textAlign: 'center'}}>When and where?</h2> 
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
                <PartyTypeTable/>
            </div>

            <div style={styles.slide}>
                <h2 style={styles.headline} style={{textAlign: 'center'}}>Invite your peeps</h2> 
                <SelectFriends/>
            </div>

            <div style={styles.slide}>
                <h2 style={styles.headline} style={{textAlign: 'center'}}>Items page</h2>
                <ItemList/> 
            </div>

            <div style={styles.slide} style={{textAlign: 'center'}}>
                <h2 style={styles.headline} style={{textAlign: 'center'}}>Summary page</h2>
                <SubmitButton /> 
            </div>

        </SwipeableViews>
      </div>
    );
  }
}