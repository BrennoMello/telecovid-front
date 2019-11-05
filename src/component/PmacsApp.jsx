import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPmacsUsersComponent from './ListPmacsUsersComponent';
import PmacsUserComponent from './PmacsUserComponent';
import PmacsLoginComponent from './PmacsLoginComponent';
import PmacsPanelComponent from './PmacsPanelComponent';
import PmacsMinRegComponent from './PmacsMinRegComponent';
import PmacsCompRegComponent from './PmacsCompRegComponent';


const divStyleCenter = {
    textAlign: "center",
};

class PmacsApp extends Component {
    render() {
        return (
            <Router>
                <>
                <div style={divStyleCenter}>
                    <h1>PMACS</h1>
                </div>
                <Switch>
                    <Route path="/" exact component={PmacsLoginComponent} />
                    <Route path="/users" exact component={ListPmacsUsersComponent} />
                    <Route path="/users/:id" component={PmacsUserComponent} />
                    <Route path="/panel" exact component={PmacsPanelComponent} />
                    <Route path="/registroMinimo" exact component={PmacsMinRegComponent} />
                    <Route path="/registroCompleto" exact component={PmacsCompRegComponent} />
                </Switch>
                </>
            </Router>
        )
    }
}

export default PmacsApp