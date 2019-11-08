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

class PmacsLoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            token: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.goToTheMinRegister = this.goToTheMinRegister.bind(this)
    }

    componentDidMount() {
        console.log("React version: "+React.version);
    }

    onSubmit(values) {
        let user = {
            username: values.username,
            password: values.password
        }
        UserDataService.authenticateUser(user)
        .then(response => {
                this.setState({
                    username: response.data.username,
                    token: response.data.token
                })
                if(this.state.token){
                    //this.props.history.push(`/panel/:${this.state.token}`);
                    this.props.history.push({
                        pathname: '/panel',
                        //search: '?query=abc',
                        state: { username: this.state.username, token: this.state.token }
                    })
                }
                else{
                    $('.alert').show();
                    console.log("Autenticação falhou. Acesso Negado");
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
        if (!values.username) {
            errors.username = 'Entre com um Nome'
        } else if (values.username.length > 200) {
            errors.username = 'Nome grande demais por favor abrevie'
        }

        if (!values.password) {
            errors.password = 'Entre com uma Senha'
        }
    
        return errors
    }

    goToTheMinRegister() {
        this.props.history.push(`/registroMinimo`)
    }

    render() {
        let username = "";
        let password = "";

        return (
            <div className="container" style={divStyleBox}>
                <SimpleModal ref="simpleModal" />

                <div style={divStylePaddingBottom}></div>
                <div style={divStyleNone} className="alert alert-warning" role="alert">
                    Login ou senha inválidos.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Formik 
                    initialValues={{username, password}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="username" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Login</label>
                                <Field className="form-control" type="text" name="username" />
                            </fieldset>
                            <ErrorMessage name="password" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Senha</label>
                                <Field className="form-control" type="password" name="password" />
                            </fieldset>
                            <div style={divStylePaddingBottom}>
                                <button className="btn btn-success" type="submit">Login</button>
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