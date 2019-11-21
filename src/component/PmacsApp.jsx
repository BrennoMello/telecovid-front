import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PmacsUserComponent from './PmacsUserComponent';
import PmacsLoginComponent from './PmacsLoginComponent';
import PmacsPanelComponent from './PmacsPanelComponent';
import PmacsMinRegComponent from './PmacsMinRegComponent';
import PmacsFeedBackEmail from './PmacsFeedBackEmail';
import PmacsCompRegComponent from './PmacsCompRegComponent';
import PmacsTermOfUse from './PmacsTermOfUse';
import PmacsEmailRememberPass from './PmacsEmailRememberPass';
import PmacsChangePass from './PmacsChangePass';

class PmacsApp extends Component {
    render() {
        return (
            <Router>
                <>
                <div className="center">
                    <h1 className="font_1">PMACS</h1>
                </div>
                <Switch>
                    <Route path="/" exact component={PmacsLoginComponent} />
                    <Route path="/users/:id" component={PmacsUserComponent} />
                    <Route path="/panel" exact component={PmacsPanelComponent} />
                    <Route path="/registroMinimo" exact component={PmacsMinRegComponent} />
                    <Route path="/registroMinimo/email" exact component={PmacsFeedBackEmail} />
                    <Route path="/registroCompleto" exact component={PmacsCompRegComponent} />
                    <Route path="/registroCompleto/termoDeUso" exact component={PmacsTermOfUse} />
                    <Route path="/lebreteSenhaEmail" exact component={PmacsEmailRememberPass} />
                    <Route path="/recuperacaoSenha" exact component={PmacsChangePass} />
                </Switch>
                </>
            </Router>
        )
    }
}

export default PmacsApp