import React, { Component } from 'react';
import $ from 'jquery';
import bootstrap from 'bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';

const divStylePaddingBottom = {
    paddingBottom: "50px",
};

const divStyleBox = {
    width: "50%",
};

const divStyleNone = {
    display: "none",
};

const floatLeft = {
    float: "left",
}

const verticalAlign = {
    padding: "7px 0",
}

class PmacsLoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            token: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.goToTheMinRegister = this.goToTheMinRegister.bind(this)
        this.goToTheEmailRememberPass = this.goToTheEmailRememberPass.bind(this)
    }

    componentDidMount() {
        console.log("React version: "+React.version);
    }

    onSubmit(values) {
        let user = {
            userName: values.userName,
            password: values.password
        }
        UserDataService.authenticateUser(user)
        .then(response => {
                if(response.data.code === 100){
                    this.setState({
                        userName: response.data.user.userName,
                        token: response.data.user.token
                    })
                    //this.props.history.push(`/panel/:${this.state.token}`);
                    this.props.history.push({
                        pathname: '/panel',
                        //search: '?query=abc',
                        state: { userName: this.state.userName, token: this.state.token }
                    })
                }
                else{
                    if(response.data.code === 666){
                        if(response.data.message === 'authenticationFailed'){
                            $('.alert').show();
                            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Login ou Senha inválidos.');
                        }
                        else{
                            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                        }
                        console.log(response.data.description);
                    }
                }
            }
        )
        .catch(error => {
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    validate(values) {
        let errors = {}
        if (!values.userName) {
            errors.userName = 'Entre com seu Login'
        } else if (values.userName.length > 50) {
            errors.userName = 'Login grande demais'
        }

        if (!values.password) {
            errors.password = 'Entre com sua Senha'
        }
    
        return errors
    }

    goToTheMinRegister() {
        this.props.history.push(`/registroMinimo`)
    }

    goToTheEmailRememberPass() {
        this.props.history.push(`/lebreteSenhaEmail`)
    }

    render() {
        let userName = "";
        let password = "";

        return (
            <div className="container" style={divStyleBox}>
                <SimpleModal ref="simpleModal" />

                <div style={divStylePaddingBottom}></div>
                <div style={divStyleNone} className="alert alert-warning" role="alert">
                    Login ou Senha inválidos.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Formik 
                    initialValues={{userName, password}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="userName" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Login</label>
                                <Field className="form-control" type="text" name="userName" maxLength="50" />
                            </fieldset>
                            <ErrorMessage name="password" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Senha</label>
                                <Field className="form-control" type="password" name="password" />
                            </fieldset>
                            <div style={divStylePaddingBottom}>
                                <div style={floatLeft}>
                                    <button className="btn btn-success" type="submit">Login</button>
                                </div>
                                <div className="right" style={verticalAlign}>
                                    <a href="#0" onClick={this.goToTheEmailRememberPass}>Esqueci minha senha</a>
                                </div>
                            </div>
                        </Form>
                    )
                }
                </Formik>

                <div className="center">
                    <button className="btn btn-warning" type="butom" onClick={this.goToTheMinRegister}>Ainda não tem cadastro. Clique aqui</button>
                </div>
        
            </div>
        )
    }
}

export default PmacsLoginComponent