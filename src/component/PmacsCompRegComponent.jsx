import React, { Component } from 'react';
import bootstrap from 'bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';
import MaskedInput from "react-text-mask";

const phoneHomeMask = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

const phoneCellMask = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

const cpfMask = [
    /[1-9]/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
];

const cnsMask = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

const cepMask = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/
  ];

class PmacsCompRegComponent extends Component {
    constructor(props) {
        super(props)

        const query = new URLSearchParams(this.props.location.search);

        this.state = {
            userName: '',
            firstName: query.get('name').replace('$', ' ').substring(0, query.get('name').indexOf('$')),
            lastName: query.get('name').substring(query.get('name').indexOf('$')+1).split('$').join(' '),
            email: query.get('email'),
            token: ''
        }

        this.goToTheTermOfUse = this.goToTheTermOfUse.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        console.log(this.state.firstName + " " + this.state.lastName);
        console.log(this.state.email);
    }

    goToTheTermOfUse() {
        this.props.history.push(`/registroCompleto/termoDeUso`)
    }

    onSubmit(values) {
        let user = {
            firstName: values.firstName,
            userName: values.userName,
            email: values.email,
            lastName: values.lastName,
            cpf: values.cpf,
            cns: values.cns,
            phoneHome: values.phoneHome,
            phoneCell: values.phoneCell,
            addresses: values.addresses, // logradouro
            addressesFormatted: values.addressesFormatted, // complemento
            addressesLocality: values.addressesLocality, // bairro
            country: values.country,
            uf: values.uf,
            cep: values.cep,
            acceptedTerm: values.acceptedTerm,
            password: values.password,
            confimationPassword: values.confimationPassword
            
        }
        UserDataService.createUser(user)
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
                        if(response.data.message === 'UserAlreadyExisting'){
                            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Esse usuário já existe. Por favor escolha outro.');
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
        if (!values.firstName) {
            errors.firstName = 'Entre com um Nome'
        } else if (values.firstName.length > 200) {
            errors.firstName = 'Nome grande demais por favor abrevie'
        }

        if (!values.lastName) {
            errors.lastName = 'Entre com um Sobrenome'
        } else if (values.lastName.length > 200) {
            errors.lastName = 'Sobrenome grande demais por favor abrevie'
        }

        if (!values.cpf) {
            errors.cpf = 'Entre com um CPF'
        }

        if (!values.cns) {
            errors.cns = 'Entre com um CNS'
        }

        if (!values.email) {
            errors.email = 'Entre com um Email'
        }

        if(!values.acceptedTerm){
            errors.acceptedTerm = 'Você deve aceitar o Termo de Uso para poder proceguir'
        }

        if (!values.password) {
            errors.password = 'Entre com uma Senha'
        }

        if (values.confimationPassword !== values.password) {
            errors.confimationPassword = 'A Confirmação da Senha não corresponde a Senha digitada'
        }
    
        return errors
    }

    render() {
        let firstName = this.state.firstName;
        let userName = '';
        let email = this.state.email;
        let lastName = this.state.lastName;
        let cpf = '';
        let cns = '';
        let phoneHome = '';
        let phoneCell = '';
        let addresses = '';
        let addressesFormatted = '';
        let addressesLocality = '';
        let country = '';
        let uf = '';
        let cep = '';
        let acceptedTerm = false;
        let password = '';
        let confimationPassword = '';


        return (
            <div className="container box">
                <SimpleModal ref="simpleModal" />

                <div className="center">
                    <h2 className="font_2">Complemento Cadastral</h2>
                </div>
                <Formik 
                    initialValues={{firstName, userName, email, lastName, cpf, cns, phoneHome, phoneCell, addresses, addressesFormatted, addressesLocality, country, uf, cep, acceptedTerm, password, confimationPassword}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="firstName" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Nome</label>
                                <Field className="form-control" type="text" name="firstName" maxLength="50" />
                            </fieldset>

                            <ErrorMessage name="lastName" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Sobrenome</label>
                                <Field className="form-control" type="text" name="lastName" maxLength="150" />
                            </fieldset>

                            <ErrorMessage name="email" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Email</label>
                                <Field className="form-control" type="email" name="email" disabled />
                            </fieldset>

                            <ErrorMessage name="cpf" component="div" className="alert alert-warning" />
                            <ErrorMessage name="cns" component="div" className="alert alert-warning" />
                            <div className="form-inline padBottom30">
                                <fieldset className="form-group padRight10 width50">
                                    <label className="left">CPF</label>
                                    <Field name="cpf"
                                        render={({ field }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={cpfMask}
                                                type="text"
                                                className="form-control width100"
                                            />
                                        )}
                                    />
                                </fieldset>
                                <fieldset className="form-group width50">
                                    <label className="left">CNS</label>
                                    <Field name="cns"
                                        render={({ field }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={cnsMask}
                                                id="cns"
                                                type="text"
                                                className="form-control width100"
                                            />
                                        )}
                                    />
                                </fieldset>
                            </div>
                            
                            <fieldset className="padBottom30">
                                <legend className="font_3 background_darkGray">Telefones</legend>
                                <ErrorMessage name="phoneHome" component="div" className="alert alert-warning" />
                                <ErrorMessage name="phoneCell" component="div" className="alert alert-warning" />
                                <div className="form-inline">
                                    <fieldset className="form-group padRight10 width50">
                                        <label className="left">Fixo</label>
                                        <Field name="phoneHome"
                                            render={({ field }) => (
                                                <MaskedInput
                                                    {...field}
                                                    mask={phoneHomeMask}
                                                    id="phoneHome"
                                                    type="text"
                                                    className="form-control width100"
                                                />
                                            )}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group width50">
                                        <label className="left">Celular</label>
                                        <Field name="phoneCell"
                                            render={({ field }) => (
                                                <MaskedInput
                                                    {...field}
                                                    mask={phoneCellMask}
                                                    id="phoneCell"
                                                    type="text"
                                                    className="form-control width100"
                                                />
                                            )}
                                        />

                                    </fieldset>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="font_3 background_darkGray">Endereço</legend>

                                <ErrorMessage name="cep" component="div" className="alert alert-warning" />
                                <ErrorMessage name="country" component="div" className="alert alert-warning" />
                                <ErrorMessage name="uf" component="div" className="alert alert-warning" />
                                <div className="form-inline padBottom15">
                                    <fieldset className="form-group width39 padRight10">
                                        <label className="left">CEP</label>
                                        <Field name="cep"
                                            render={({ field }) => (
                                                <MaskedInput
                                                    {...field}
                                                    mask={cepMask}
                                                    id="cep"
                                                    type="text"
                                                    className="form-control width100"
                                                />
                                            )}
                                        />

                                    </fieldset>
                                    <fieldset className="form-group width50 padRight10">
                                        <label className="left">Cidade</label>
                                        <Field className="form-control width100" type="text" name="country" maxLength="100" />
                                    </fieldset>
                                    <fieldset className="form-group width11">
                                        <label className="left">UF</label>
                                        <Field className="form-control width100" type="text" name="uf" maxLength="2" />
                                    </fieldset>
                                </div>

                                <ErrorMessage name="addresses" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Logradouro</label>
                                    <Field className="form-control" type="text" name="addresses" maxLength="200" />
                                </fieldset>

                                <ErrorMessage name="addressesLocality" component="div" className="alert alert-warning" />
                                <ErrorMessage name="addressesFormatted" component="div" className="alert alert-warning" />
                                <div className="form-inline padBottom30">
                                    <fieldset className="form-group width50 padRight10">
                                        <label className="left">Bairro</label>
                                        <Field className="form-control width100" type="text" name="addressesLocality" maxLength="100" />
                                    </fieldset>
                                    <fieldset className="form-group width50">
                                        <label className="left">Complemento</label>
                                        <Field className="form-control width100" type="text" name="addressesFormatted" maxLength="200" />
                                    </fieldset>
                                </div>
                            </fieldset>

                            <fieldset className="form-group center">
                                <button className="btn btn-warning width100" type="butom" onClick={this.goToTheTermOfUse}>Para ver o Termo de Uso da plataforma clique aqui</button>
                            </fieldset>

                            <ErrorMessage name="acceptedTerm" component="div" className="alert alert-warning" />
                            <fieldset className="form-group padBottom15">
                                <Field type="checkbox" name="acceptedTerm" className="form-control noWidth checkbox" /><label className="padLeft10">Aceito o Termo de Uso</label>
                            </fieldset>

                            <ErrorMessage name="userName" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Login</label>
                                <Field className="form-control" type="text" name="userName" maxLength="50" />
                            </fieldset>

                            <ErrorMessage name="password" component="div" className="alert alert-warning" />
                            <fieldset className="form-group width50">
                                <label>Senha</label>
                                <Field className="form-control" type="password" name="password" />
                            </fieldset>

                            <ErrorMessage name="confimationPassword" component="div" className="alert alert-warning" />
                            <fieldset className="form-group width50">
                                <label>Confime a Senha</label>
                                <Field className="form-control" type="password" name="confimationPassword" />
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