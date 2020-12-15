//
// Author:       Brian Fromme
// Copyright:    Copyright 2020, Gnu Public License - Version 2.0
// Credits:      Brian Fromme, Bryan Gartner, Darren Soothill
// Maintainer:   Brian Fromme
// Status:       Prototype
// Description:  Sonar main module
//

import React from "react";
import { FormClose, HostMaintenance, Update } from 'grommet-icons';
import {
    Box,
    Button,
    Collapsible,
    Grommet,
    Heading,
    Layer,
    ResponsiveContext,
} from 'grommet';

import FormComponent from './FormComponent';

//
// Definitions
// 
const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '12px',
            height: '14px',
        },
    },
};

//
// The User Interface
//

const AppName = "Sonar Sizing Tool";

const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
    />
);


// App - note there is only one of these instances
class App extends React.Component {
    // 
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
            formComponent: null
        }
        return this;
    };

    setShowSidebar(val) {
        // thus begins the attempt to track the visual state
        // but, the value "showSidebar" must also be a trigger for the UI behavior
        this.setState({setShowSidebar: {val}});
    }

    render() {
        var fc = <FormComponent />;
        this.state.formComponent = fc;
        return (
          <Grommet theme={theme} themeMode="dark">
          <ResponsiveContext.Consumer>
            {size => (
            <Box fill>
              <AppBar>
                <Heading level='3' margin='none'>{AppName}</Heading>
                <HostMaintenance />
                <Button icon={<Update />} onClick={() => this.setShowSidebar(!this.state.showSidebar)} />
              </AppBar>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                <Box flex align='left' justify='left' direction="column" border={{color:'brand', size:'small'}} pad="medium">
                {this.state.formComponent}
                </Box>
                {(!this.state.showSidebar || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={this.state.showSidebar}>
                    <Box flex width='large' background='light-2' elevation='small' align='center' justify='center' >
                      sizing results
                    </Box>
                  </Collapsible>
                ): (
                  <Layer>
                    <Box background='light-2' tag='header' justify='end' align='center' direction='row' >
                      <Button icon={<FormClose />} onClick={() => this.setShowSidebar(false)} />
                    </Box>
                    <Box fill background='light-2' align='center' justify='center' >
                      foobar
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
            )}
          </ResponsiveContext.Consumer>
          </Grommet>
        );
    }   // end render()
}

export default App;

