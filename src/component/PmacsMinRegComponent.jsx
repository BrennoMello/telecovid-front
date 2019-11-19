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

class PmacsMinRegComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let user = {
            firstName: values.name.substring(0, values.name.indexOf(' ')),
            lastName: values.name.substring(values.name.indexOf(' ')+1),
            email: values.email
        }
        UserDataService.minimalRegisterUser(user)
        .then(response => {
                if(response.data.code === 100){
                    console.log("MinRegistro:")
                    console.log(response.data.description)
                    this.setState({
                        firstName: response.data.user.firstName,
                        lastName: response.data.user.lastName,
                        email: response.data.user.email
                    })
                    this.props.history.push({
                        pathname: '/registroCompleto/termoDeUso',
                        //search: '?query=abc',
                        state: { name: this.state.name, email: this.state.email }
                    })
                }
                else{
                    if(response.data.code === 666){
                        this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
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
        if (!values.name) {
            errors.name = 'Entre com um Nome'
        } else if (values.name.length > 200) {
            errors.neme = 'Nome grande demais por favor abrevie'
        }

        if (!values.email) {
            errors.email = 'Entre com um Email'
        }
    
        return errors
    }

    render() {
        let name = "";
        let email = "";

        return (
            <div className="container" style={divStyleBox}>
                <SimpleModal ref="simpleModal" />

                <h3 className="center font_2">Registro Mínimo</h3>
                <div style={divStylePaddingBottom}></div>
                <Formik 
                    initialValues={{name, email}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="name" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Nome</label>
                                <Field className="form-control" type="text" name="name" />
                            </fieldset>
                            <ErrorMessage name="email" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Email</label>
                                <Field className="form-control" type="email" name="email" />
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

export default PmacsMinRegComponent