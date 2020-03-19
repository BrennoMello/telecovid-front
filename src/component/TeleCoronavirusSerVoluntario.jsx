import React, { Component } from 'react';
import $ from 'jquery';
import bootstrap from 'bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';
import {Container, Row, Col  } from "react-bootstrap";
import Switch from "react-switch";
import MaskedInput from "react-text-mask";
import validatorBr from 'validator-brazil';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';


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

const divStylePaddingBottom = {
    paddingBottom: "50px",
};

class TeleCoronavirusSerVoluntario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nome: '',
            checked: false,
            loadingActive: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        
    }

    handleChange(checkedToogle) {
        this.setState({
            checked: checkedToogle
        })
    }

    onSubmit(values) {
        this.setState({loadingActive: true})
        let voluntario = {
            nome: values.nome,
            email: values.email,
            cpf: values.cpf
        }
        UserDataService.serUmVoluntario(voluntario)
        .then(response => {
                this.setState({loadingActive: false})
                if(response.status === 200){
                    this.refs.simpleModal.modalOpen('Sucesso!', 'Registro efetuado', 'Por favor, aguarde o email de avaliação.');
                }
                else{
                    this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                    console.log(response.data.description);
                }
            }
        )
        .catch(error => {
            this.setState({loadingActive: false})
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    validate(values) {
        let errors = {}
        if (!values.nome) {
            errors.nome = 'Entre com seu nome completo'
        }

        if (!values.email) {
            errors.email = 'Entre com seu email'
        }

        if (!values.cpf) {
            errors.cpf = 'Entre com seu CPF'
        }
        else{
            if(!validatorBr.isCpf(values.cpf)){
                errors.cpf = 'CPF inválido'
            }
        }
    
        return errors
    }

    render() {
        let nome = "";
        let email = "";
        let cpf = "";

        return (
            <>
                <Loader fullPage loading={this.state.loadingActive} text=""/>
                <div className="center">
                    <h1 className="font_1">TELE</h1>
                    <h2 className="font_1">CORONAVÍRUS</h2>
                    <h2 className="font_1">Ligue para XXX</h2>
                </div>

                <SimpleModal ref="simpleModal" />
                <div style={divStylePaddingBottom}></div>

                <Container fluid>
                    <Row className="center">
                        <Col md={5}>
                            <Formik 
                                initialValues={{nome, email, cpf}}
                                onSubmit={this.onSubmit}
                                validate={this.validate}
                                validateOnChange={false}
                                validateOnBlur={false}
                                enableReinitialize={true}
                            >
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="nome" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Nome Completo</label>
                                            <Field className="form-control" type="text" name="nome" />
                                        </fieldset>
                                        <ErrorMessage name="email" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>E-mail</label>
                                            <Field className="form-control" type="email" name="email" />
                                        </fieldset>
                                        <ErrorMessage name="cpf" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>CPF</label>
                                            <Field name="cpf"
                                                render={({ field }) => (
                                                    <MaskedInput
                                                        {...field}
                                                        mask={cpfMask}
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group" style={{textAlign:'center'}}>
                                            <label>CONCORDO COM OS TERMOS</label>
                                            <br/>
                                            <Switch
                                                onChange={this.handleChange}
                                                checked={this.state.checked}
                                                id="normal-switch"
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <button disabled={this.state.checked ? false : true} className="form-control btn btn-success" type="submit">Ser um Voluntário</button>
                                        </fieldset>
                                    </Form>
                                )
                            }
                            </Formik>
                        </Col>
                    </Row>
                </Container>  
            </>
        )
    }
}

export default TeleCoronavirusSerVoluntario