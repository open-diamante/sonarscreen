//
// Author:       Brian Fromme
// Copyright:    Copyright 2020, Gnu Public License - Version 2.0
// Credits:      Brian Fromme, Bryan Gartner, Darren Soothill
// Maintainer:   Brian Fromme
// Status:       Prototype
// Description:  Sonar form component - leveraged from grommet-sandbox
//

import React from "react";
//import ReactDOM from 'react-dom';

// grommet
import {
    Box,
    Button,
    Form,
    FormField,
    Grid,
    RangeInput,
    Select,
    Text,
    TextInput,
} from 'grommet';
import { FormAdd } from 'grommet-icons';

//
// The form UI
//

// Simple True/False selector
function TrueFalse() {
    const [value, setValue] = React.useState('true');
    return (
      <Select
          options={['true', 'false']}
          value={value}
          onChange={({ option }) => setValue(option)}
        />
    );
}


// UI data
const USECASE_ARCHIVE = 'Archive';
const USECASE_MIXED = 'Mixed';

// Simple UseCase selector
function UseCase(props) {
    const [value, setValue] = React.useState({USECASE_ARCHIVE});
    return (
      <Select
          options={[{USECASE_ARCHIVE}, {USECASE_MIXED}]}
          value={USECASE_ARCHIVE}
          onChange={({ option }) => setValue(option)}
          {...props}
        />
    );
}

// NOTE: This hack manages placement of Text ouptut.  Change for various fonts, etc.
const OUTPUT_MARGINS = {"vertical":"0px", "horizontal":"10px", "top":"0px", "bottom":"0px", "left":"10px", "right":"0px"};
const OUTPUTAREA_MARGINS = {"vertical":"0px", "horizontal":"0px", "top":"0px", "bottom":"0px", "left":"0px", "right":"10px"};

// OutputMessageArea - note there is only one of these
////class OutputMessageArea extends React.Component {
////    constructor(props) {
////        super(props);
////        this.nrDescription = props.desc;
////        this.nrName = props.name;
////        return this;
////    }
////    updateOutputMessage(msg) {
////        return (
////            <OutputMessage desc={msg} name={this.nrName} />
////        );
////    }
////}

function OutputMessage(props) {
    // This is the Text area where output messages go
    return (
        <Text color="status-critical" margin={OUTPUT_MARGINS} >
           {props.desc}
        </Text>
    );
}

// the one and only output text area
const DEFAULT_OUTPUT_MESSAGE = "nothing to discuss...";
// const ID_OUTPUT = "output";

// OutputMessageArea - note there is only one of these
class OutputMessageArea extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
          nrDescription: props.desc,
          nrName: props.name,
      }
      return this;
  }

  // Handle a change in the OutputMessageArea
  handleChange(ev) {
      alert("handleChange: OutputMessageArea");
  }

  updateOutputMessage(msg) {
    var nam = this.state.nrName;
    if (!nam) {
        // raise an issue
        alert('updateOutputMessage: no state name');
    }
    return (
        <OutputMessage desc={msg} name={this.state.nrName} />
    );
  }

  updateOutputMessageArea(msg) {
    var newmsg = (msg ? msg : DEFAULT_OUTPUT_MESSAGE);
    var desc = this.state.nrDescription;
    if (!desc) {
        // raise an issue
        alert('updateOutputMessage: no state description');
    }
    return (
        <Box direction="column" pad="small"> <Text> </Text>
            <Box direction="row" border={{ color: 'brand', size: 'small' }} background="light-3" pad="small">
              <Text weight="bold" truncate={true} margin={OUTPUTAREA_MARGINS} >
                  {desc}
              </Text>
              {this.updateOutputMessage(newmsg)}
            </Box>
        </Box>
    );
  }

  outputErrorOrWarning(message, err) {
    // Display an error or warning message
    alert('outputErrorOrWarning: ' + message);
    var outputMess;
    if (err) {
        // preceed with: Error:
        outputMess = 'Error: ' + message;
    }
    else {
        // preceed with: Warning:
        outputMess = 'Warning: ' + message;
    }
    // Update just the Text area
    return this.updateOutputMessage(outputMess);
  }

  render() {
    return (this.updateOutputMessageArea(''));
  }
}    // end of class OutputMessage


// NOTE: Also need to change the value of the slide, when the user types here
class NumericValue extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: '#'};
      // const [value, setValue] = React.useState('');
      this.nrDescription = props.desc;
      this.nrProperties = props;
      this.onChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    alert('NumericValue changed: ' + this.state.value);
    this.setState({value: event.target.value});
  }

  render() {
    return (
        <TextInput value={this.state} icon={FormAdd} />
        // onChange={event => setValue(event.target.value)}
    );
  }
}

// NOTE: This hack manages placement of "desc" property passed to InputFormField.  Change for various fonts, etc.
// {"vertical":"20px", "horizontal":"0px", "top":"7px", "bottom":"0px", "left":"0px", "right":"10px"}
//

class NumericRange extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: 0};
      this.nrDescription = props.desc;
      this.nrProperties = props;
      this.onChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    alert('NumericRange changed: ' + this.state.value);
    this.setState({value: event.target.value});
  }

  render() {
    // NOTE: Need to set an initial value for both RangeInput and NumericValue
      // Perhaps that means they should be a single component
    return (
      <Grid
          areas={[
              { name: 'labl', start: [0, 0], end: [0, 0] },
              { name: 'slid', start: [1, 0], end: [1, 0] },
              { name: 'numb', start: [2, 0], end: [2, 0] },
          ]}
          columns={['280px', 'medium', '60px']}
          rows={['50px']}
          gap='small'
        >
        <Box gridArea='labl' background='brand'>
          <Text margin={{"vertical":"10px", "horizontal":"0px", "top":"4px", "bottom":"6px", "left":"5px", "right":"10px"}}>
              {this.nrDescription}
          </Text>
        </Box>
        <Box gridArea='slid' background='none'>
          <RangeInput {...this.nrProperties} />
        </Box>
        <Box gridArea='numb' background='none'>
          <NumericValue  />
        </Box>
      </Grid>
    );
  }
}


// NOTE: This hack manages placement of "desc" property passed to InputFormField.  Change for various fonts, etc.
const TEXT_MARGINS = {"vertical":"20px", "horizontal":"0px", "top":"7px", "bottom":"0px", "left":"0px", "right":"10px"};

// Specific FormField definition
// NOTE:  Make consistent with:  function(props) or class
//
// The component to insert in the FormField. Grommet will add update the form values when this field changes.
// Any additional properties (such as initial value) you pass to FormField will be forwarded to this component.
// The component may be custom as long it supports the properties of name, value, onChange (event => {}),
// while event has either event.value or event.target.value.

class InputFormField extends React.Component {
  constructor(props) {
    super(props);
    this.desc = this.props.desc;
    this.name = this.props.name;
  }

  validate() {
      // TBD
      // function"
      // {
      // regexp:
      // "new RegExp(...),"
      // message:
      // "string"
      // "node,"
      // status:
      // "error"
      // "info"
      // }
  }

  render() {
    // NOTE: don't use the Label feature of the FormField until we can figure out how to position it correctly
    return (
          <Box direction="row">
            <Text margin={TEXT_MARGINS}> {this.props.desc} </Text>
            <FormField name={this.name} htmlFor={this.name} direction='row-responsive' {...this.props} />
          </Box>
    );
  }
}

// UI object IDs
const ID_COLO = "colo";
const ID_USECASE = "usecase";
const ID_CAPREQ = "capreq";
const ID_METACAP = "metacap";
const ID_DRIVECAP = "drivecap";
const ID_DRIVESPER = "drivesper";
const ID_SLOTSPER = "slotsper";
const ID_NVMEPER = "nvmeper";
const ID_DRIVETYPES = "drivetypes";
const ID_MAXFILLCAP = "maxfillcap";
const ID_NMVERATIO = "nvmeratio";
const ID_PROTTYPE = "prottype";
const ID_ECDATA = "ecdata";
const ID_ECPARITY = "ecparity";
const ID_MESSAGES = "outputarea";
// const CLASS_MESSAGES = "outputMessageArea";

// Labels
const LABEL_COLO = "Co-Location (GW/MDS/MON): ";
const LABEL_USECASE = "Use Case: ";
const LABEL_CAPREQ = "Capacity Required (TB): ";
const LABEL_METACAP = "Metadata Capacity (TB): ";
const LABEL_DRIVECAP = "Drive Capacity (TB): ";
const LABEL_DRIVESPER = "# of Drives / Chassis: ";
const LABEL_SLOTSPER = "# of Populated Slots / Chassis: ";
const LABEL_NVMEPER = "# of NVMe Slots / Chassis: ";
const LABEL_DRIVETYPES = "Drive Types: ";
const LABEL_MAXFILLCAP = "Maximum Fill Capacity %: ";
const LABEL_NMVERATIO = "NVMe Ratio (1:n): ";
const LABEL_PROTTYPE = "Protection Type: ";
const LABEL_ECDATA = "Error Correction - Data: ";
const LABEL_ECPARITY = "Error Correction - Parity: ";
const LABEL_MESSAGES = "Messages: ";


class FormComponent extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.cancelPressed = this.cancelPressed.bind(this);
      this.updatePressed = this.updatePressed.bind(this);
      this.state = {
          outputComponent: null
      };
      return this;
  };

  // Handle a change in one of the form fields
  handleValidation(ev) {
      alert('handleValidation');
  }

  // Handle a change in one of the form fields
  handleChange(ev) {
      // we stored the Output Component in our class
      if (! this.state.outputComponent) {
          alert("no outputComponent");
      }
      else if (this.state.outputComponent && this.state.outputComponent.updateOutputMessage) {
          // this.state.outputComponent.updateOutputMessage('form field element changed');
      }
  }

  // Cancel button callback
  cancelPressed(ev) {
      // we stored the Output Component in our class
      if (! this.state.outputComponent) {
          alert("no outputComponent");
      }
      if (this.state.outputComponent) {
          alert("cancelPressed: outputComponent");
          //this.state.outputComponent.updateOutputMessage('cancel button pressed');
      }
  }

  // Update button callback
  updatePressed(ev) {
      if (! this.state.outputComponent) {
          alert("no outputComponent");
      }
      else {
          alert('updatePressed');
      }
  }

  // Store the passed object - used for OutputMessageArea instance
  storeOutputComponent(obj) {
      if (! obj) {
          alert("storeOutputComponent: no object passed");
      }
      else {
          this.state.outputComponent = obj
          if (this.state.outputComponent == null) {
              alert("storeOutputComponent: no outputComponent after assignment");
          }
      }
  }


  // This defines the form contents
  // NOTE: Can we pass a DOM class ID to the grommet class?
  render() {
    const obj = <OutputMessageArea desc={LABEL_MESSAGES} name={ID_MESSAGES} />;
    this.storeOutputComponent(obj);
    return (
      <Form onSubmit={this.updatePressed} onReset={this.cancelPressed} onChange={this.handleChange} onValidate={this.handleValidation}>
        <InputFormField desc={LABEL_COLO} name={ID_COLO} component={TrueFalse} />
        <InputFormField desc={LABEL_USECASE} name={ID_USECASE} component={UseCase} />

        <NumericRange desc={LABEL_CAPREQ} name={ID_CAPREQ} />
        <NumericRange desc={LABEL_METACAP} name={ID_METACAP} />
        <NumericRange desc={LABEL_DRIVECAP} name={ID_DRIVECAP} />
        <NumericRange desc={LABEL_DRIVESPER} name={ID_DRIVESPER} />
        <NumericRange desc={LABEL_SLOTSPER} name={ID_SLOTSPER} />
        <NumericRange desc={LABEL_NVMEPER} name={ID_NVMEPER} />
        <NumericRange desc={LABEL_DRIVETYPES} name={ID_DRIVETYPES} />
        <NumericRange desc={LABEL_MAXFILLCAP} name={ID_MAXFILLCAP} />
        <NumericRange desc={LABEL_NMVERATIO} name={ID_NMVERATIO} />
        <NumericRange desc={LABEL_PROTTYPE} name={ID_PROTTYPE} />
        <NumericRange desc={LABEL_ECDATA} name={ID_ECDATA} />
        <NumericRange desc={LABEL_ECPARITY} name={ID_ECPARITY} />

        {this.state.outputComponent}

        <Box direction="row" justify="between" margin={{ top: "medium" }}>
          <Button type="reset" label="Cancel" />
          <Button type="submit" label="Update" primary />
        </Box>
      </Form>
    );
  }
}    // end class FormComponent

export default FormComponent;

