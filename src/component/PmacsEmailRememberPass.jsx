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
            email: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let user = {
            email: values.email,
        }
        UserDataService.authenticateUser(user)
        .then(response => {
                if(response.data.code === 100){
                    this.refs.simpleModal.modalOpen('Email Enviado', 'Um email com instruções de recuperação de senha foi enviado para ' + values.email, 'Por favor, siga as instruções.');
                }
                else{
                    if(response.data.code === 666){
                        this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor tente mais tarde.');
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
        if (!values.email) {
            errors.userName = 'Entre com um Email'
        }
    
        return errors
    }

    render() {
        let email = "";

        return (
            <div className="container" style={divStyleBox}>
                <SimpleModal ref="simpleModal" />

                <div style={divStylePaddingBottom}></div>

                <Formik 
                    initialValues={{email}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="email" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Email</label>
                                <Field className="form-control" type="email" name="email" maxlength="50" />
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