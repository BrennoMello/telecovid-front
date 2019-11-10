import React, { Component } from 'react';
import bootstrap from 'bootstrap';
import $ from 'jquery';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';

class PmacsCompRegComponent extends Component {
    constructor(props) {
        super(props)

        const query = new URLSearchParams(this.props.location.search);

        this.state = {
            name: query.get('name').replace('$', ' ').substring(0, query.get('name').indexOf('$')),
            lastName: query.get('name').substring(query.get('name').indexOf('$')+1),
            email: query.get('email'),
            token: ''
        }

        this.goToTheTermOfUse = this.goToTheTermOfUse.bind(this)
        
    }

    componentDidMount() {
        console.log(this.state.name + " " + this.state.lastName);
        console.log(this.state.email);
    }

    goToTheTermOfUse() {
        this.props.history.push(`/registroCompleto/termoDeUso`)
    }

    onSubmit(values) {
        let user = {
            name: values.name,
            username: values.username,
            email: values.email,
            lastName: values.lastName,
            cpf: values.cpf,
            cns: values.cns,
            phoneHome: values.phoneHome,
            phoneCell: values.phoneCell,
            publicPlace: values.publicPlace,
            complement: values.complement,
            city: values.city,
            uf: values.uf,
            cep: values.cep,
            acceptedTerm: values.acceptedTerm,
            password: values.password,
            confimationPassword: values.confimationPassword
            
        }
        UserDataService.createUser(user)
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

    render() {
        let name = this.state.name;
        let lastName = this.state.lastName;
        let email = this.state.email;

        return (
            <div className="container box">
                <div className="center">
                    <h2 className="font_2">Complemento Cadastral</h2>
                </div>
                <Formik 
                    initialValues={{name, lastName, email}}
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

                            <ErrorMessage name="lastName" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Sobrenome</label>
                                <Field className="form-control" type="text" name="lastName" />
                            </fieldset>

                            <ErrorMessage name="email" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Email</label>
                                <Field className="form-control" type="text" name="email" disabled />
                            </fieldset>

                            <ErrorMessage name="cpf" component="div" className="alert alert-warning" />
                            <ErrorMessage name="cns" component="div" className="alert alert-warning" />
                            <div className="form-inline padBottom30">
                                <fieldset className="form-group padRight10 width50">
                                    <label className="left">CPF</label>
                                    <Field className="form-control width100" type="text" name="cpf" />
                                </fieldset>
                                <fieldset className="form-group width50">
                                    <label className="left">CNS</label>
                                    <Field className="form-control width100" type="text" name="cns" />
                                </fieldset>
                            </div>
                            
                            <fieldset className="padBottom30">
                                <legend className="font_3 background_darkGray">Telefones</legend>
                                <ErrorMessage name="phoneHome" component="div" className="alert alert-warning" />
                                <ErrorMessage name="phoneCell" component="div" className="alert alert-warning" />
                                <div className="form-inline">
                                    <fieldset className="form-group padRight10 width50">
                                        <label className="left">Fixo</label>
                                        <Field className="form-control width100" type="text" name="phoneHome" />
                                    </fieldset>
                                    <fieldset className="form-group width50">
                                        <label className="left">Celular</label>
                                        <Field className="form-control width100" type="text" name="phoneCell" />
                                    </fieldset>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="font_3 background_darkGray">Endereço</legend>
                                <ErrorMessage name="publicPlace" component="div" className="alert alert-warning" />
                                <ErrorMessage name="complement" component="div" className="alert alert-warning" />
                                <div className="form-inline">
                                    <fieldset className="form-group padRight10 width50">
                                        <label className="left">Logradouro</label>
                                        <Field className="form-control width100" type="text" name="publicPlace" />
                                    </fieldset>
                                    <fieldset className="form-group width50">
                                        <label className="left">Complemento</label>
                                        <Field className="form-control width100" type="text" name="complement" />
                                    </fieldset>
                                </div>

                                <ErrorMessage name="city" component="div" className="alert alert-warning" />
                                <ErrorMessage name="uf" component="div" className="alert alert-warning" />
                                <ErrorMessage name="cep" component="div" className="alert alert-warning" />
                                <div className="form-inline padBottom30">
                                    <fieldset className="form-group padRight10 width50">
                                        <label className="left">Cidade</label>
                                        <Field className="form-control width100" type="text" name="city" />
                                    </fieldset>
                                    <fieldset className="form-group padRight10 width11">
                                        <label className="left">UF</label>
                                        <Field className="form-control width100" type="text" name="uf" />
                                    </fieldset>
                                    <fieldset className="form-group width39">
                                        <label className="left">CEP</label>
                                        <Field className="form-control width100" type="text" name="cep" />
                                    </fieldset>
                                </div>
                            </fieldset>

                            <fieldset className="form-group center">
                                <button className="btn btn-warning width100" type="butom" onClick={this.goToTheTermOfUse}>Para ver o Termo de Uso da plataforma clique aqui</button>
                            </fieldset>

                            <ErrorMessage name="acceptedTerm" component="div" className="alert alert-warning" />
                            <fieldset className="padBottom30">
                                <input type="checkbox" name="acceptedTerm" /><label className="padLeft10">Aceito o Termo de Uso</label>
                            </fieldset>

                            <ErrorMessage name="username" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Login</label>
                                <Field className="form-control" type="text" name="username" />
                            </fieldset>

                            <ErrorMessage name="password" component="div" className="alert alert-warning" />
                            <fieldset className="form-group width50">
                                <label>Senha</label>
                                <Field className="form-control" type="text" name="password" />
                            </fieldset>

                            <ErrorMessage name="confimationPassword" component="div" className="alert alert-warning" />
                            <fieldset className="form-group width50">
                                <label>Confime a Senha</label>
                                <Field className="form-control" type="text" name="confimationPassword" />
                            </fieldset>

                            <div className="right padBottom30">
                                <button className="btn btn-success" type="submit">Salvar</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        )
    }

}

export default PmacsCompRegComponent