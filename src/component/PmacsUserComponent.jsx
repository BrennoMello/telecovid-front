import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';

class PmacsUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            email: '',
            token: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }

        UserDataService.retrieveUser(this.state.id).then(
            response => this.setState({
                name: response.data.name,
                email: response.data.email,
                token: response.data.token,
                password: response.data.password
            })
        )
    }

    onSubmit(values) {
        let user = {
            id: this.state.id,
            name: values.name,
            email: values.email,
            token: values.token,
            password: values.password,
        }

        if (this.state.id === -1) {
            UserDataService.createUser(user).then(
                () => this.props.history.push(`/users`))
        } else {
            UserDataService.updateUser(this.state.id, user).then(
                () => this.props.history.push(`/users`))
        }
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
        } else if (!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            errors.email = 'Email inválido'
        }
    
        return errors
    }

    render() {
        let { id, name, email } = this.state

        return (
            <div>
            <h3>Usuário</h3>

            <div className="container">
                <Formik 
                    initialValues={{ id, name, email }}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id" disabled />
                                </fieldset>
                                <ErrorMessage name="name" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Nome</label>
                                    <Field className="form-control" type="text" name="name" />
                                </fieldset>
                                <ErrorMessage name="email" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Email</label>
                                    <Field className="form-control" type="text" name="email" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
      )
  }

}

export default PmacsUserComponent