import React, { Component } from 'react';
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

class PmacsEmailRememberPass extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userName:'',
            email: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let user = {
            userName: values.userName,
            email: values.email
        }
        UserDataService.rememberPass(user)
        .then(response => {
                if(response.data.code === 100){
                    this.refs.simpleModal.modalOpen('Email Enviado', 'Um email com instruções de recuperação de senha foi enviado para ' + values.email, 'Por favor, siga as instruções.');
                }
                else{
                    if(response.data.code === 666){
                        if (response.data.message === 'emailNotMatch'){
                            this.refs.simpleModal.modalOpen('Erro grave', 'Email informado não corresponde ao email cadastrado.', 'Esse incidente será reportado.');
                        } else if (response.data.message === 'org.apache.axis2.databinding.ADBException'){
                            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'É possível que esse usuário não exista.');
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
        }

        if (!values.email) {
            errors.email = 'Entre com seu Email'
        }
    
        return errors
    }

    render() {
        let userName = "";
        let email = "";

        return (
            <div className="container" style={divStyleBox}>
                <SimpleModal ref="simpleModal" />

                <div style={divStylePaddingBottom}></div>

                <div>
                    <p>Para recuperar sua senha, por favor informe seu Login e o email que foi cadastrado na sua conta.</p>
                </div>

                <Formik 
                    initialValues={{userName, email}}
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
                            <ErrorMessage name="email" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Email</label>
                                <Field className="form-control" type="email" name="email" maxLength="50" />
                            </fieldset>
                            <div style={divStylePaddingBottom}>
                                <button className="btn btn-success" type="submit">Enviar</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        )
    }
}

export default PmacsEmailRememberPass