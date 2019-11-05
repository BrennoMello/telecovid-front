import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';

const divStylePaddingBottom = {
    paddingBottom: "50px",
};

const divStyleBox = {
    width: "50%",
};

const divStyleCenter = {
    textAlign: "center",
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
            name: values.name,
            email: values.email
        }
        UserDataService.minimalRegisterUser(user).then(
            response => {
                console.log("Resposta:")
                console.log(response.data)
                this.setState({
                    name: response.data.name,
                    email: response.data.email
                })
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
                <h3 style={divStyleCenter}>Registro Mínimo</h3>
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