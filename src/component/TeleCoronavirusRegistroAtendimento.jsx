import React, { Component } from 'react';
import $ from 'jquery';
import bootstrap from 'bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';
import {Container, Row, Col  } from "react-bootstrap";
import MaskedInput from "react-text-mask";
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import Autocomplete from "react-autocomplete-select";


const idadeMask = [
    /[1-9]/,
    /\d/,
];

const divStylePaddingBottom = {
    paddingBottom: "50px",
};

const voluntarioMock = {
    nome:'João da Silva', 
    email:'joaosilva232@gmail.com', 
    cpf:'556.887.223-56', 
    chave:'45345345345345', 
    ativo:false
}

const cidadesMock = [
    {nome:'Salvador'},
    {nome:'Rio de Janeiro'},
    {nome:'São Paulo'},
    {nome:'Salvadina'},
    {nome:'Salvotori'},
]

class TeleCoronavirusSerVoluntario extends Component {
    inputRef = React.createRef();

    constructor(props) {
        super(props)

        const query = new URLSearchParams(this.props.location.search);

        this.state = {
            chave:query.get('chave'),
            voluntario:'',
            cidades:[],
            bairros:[],
            uss:[],
            registro: {
                cidade: '',
                bairro: '',
                idade: '',
                classificacao: '',
                us: '',
                comentario: '',
            },
            loadingActive: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.getVoluntario = this.getVoluntario.bind(this)
        this.getCidades = this.getCidades.bind(this)
        this.getBairros = this.getBairros.bind(this)
        this.getUss = this.getUss.bind(this)
    }

    componentDidMount() {
        this.inputRef.current.focus();
        //this.getVoluntario()// descomente quando o back responder
        this.setState({voluntario: voluntarioMock, loadingActive:false})// comente quando o back responder
    }

    getVoluntario(){
        UserDataService.retrieveVoluntario(this.state.chave)
        .then(response => {
            if(response.status === 200){
                this.setState({voluntario: response.data})
                this.getCidades()
            }
            else{
                this.setState({loadingActive: false})
                this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                console.log(response.data.description);
            }
        })
        .catch(error => {
            this.setState({loadingActive: false})
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    getCidades(){
        UserDataService.retrieveCidades(this.state.chave)
        .then(response => {
            this.setState({loadingActive: false})
            if(response.status === 200){
                this.setState({cidades: response.data})
            }
            else{
                this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                console.log(response.data.description);
            }
        })
        .catch(error => {
            this.setState({loadingActive: false})
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    getBairros(){
        UserDataService.retrieveBairros(this.state.cidade, this.state.chave)
        .then(response => {
            this.setState({loadingActive: false})
            if(response.status === 200){
                this.setState({bairros: response.data})
            }
            else{
                this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                console.log(response.data.description);
            }
        })
        .catch(error => {
            this.setState({loadingActive: false})
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    getUss(){
        UserDataService.retrieveUss(this.state.classificacao, this.state.chave)
        .then(response => {
            this.setState({loadingActive: false})
            if(response.status === 200){
                this.setState({uss: response.data})
            }
            else{
                this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                console.log(response.data.description);
            }
        })
        .catch(error => {
            this.setState({loadingActive: false})
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    onSubmit(values) {
        if(window.confirm("Confirma registro com os dados abaixo: \n\n" + 
                "Cidade: "+ this.inputRef.current.value + "\n" +
                "Bairro: "+ values.bairro + "\n" +
                "Idade: "+ values.idade + "\n" +
                "Classificacao: "+ values.classificacao + "\n" +
                "Unidade de Saúde: "+ values.us + "\n" +
                "Comentário: "+ values.comentario
            )){
            this.setState({loadingActive: true})
            let registro = {
                    cidade: this.inputRef.current.value,
                    bairro: values.bairro,
                    idade: values.idade,
                    classificacao: values.classificacao,
                    us: values.us,
                    comentario: values.comentario
                }
            UserDataService.registrarAtendimento(registro, this.state.chave)
            .then(response => {
                    this.setState({loadingActive: false})
                    if(response.status === 200){
                        this.refs.simpleModal.modalOpen('Sucesso!', 'Registro efetuado');
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
    }

    validate(values) {
        let errors = {}
        if (!this.inputRef.current.value) {
            errors.cidade = 'Entre com a Cidade'
        }
        if (!values.bairro) {
            errors.bairro = 'Entre com o Bairro'
        }
        if (!values.idade) {
            errors.idade = 'Entre com a Idade'
        }
        if (!values.classificacao) {
            errors.classificacao = 'Entre com a Classificação'
        }
        if (!values.us) {
            errors.us = 'Entre com a Unidade de Saúde'
        }
    
        return errors
    }

    render() {
        let cidade='';
        let bairro='';
        let idade='';
        let classificacao='';
        let us='';
        let comentario='';

        return (
            <>
                <Loader fullPage loading={this.state.loadingActive} text=""/>
                <Container fluid>
                    <Row className="center">
                        <Col sm={12}>
                            <h5 className="font_1">TELE</h5>
                            <h6 className="font_1">CORONAVÍRUS</h6>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="center">
                        <Col sm={12}>
                            <h6 className="font_1">VOLUNTÁRIO</h6>
                            <h6 className="font_1">{this.state.voluntario.nome}</h6>
                            <h6 className="font_1">{this.state.voluntario.email}</h6>
                        </Col>
                    </Row>
                </Container>

                <SimpleModal ref="simpleModal" />
                <div style={divStylePaddingBottom}></div>

                <Container fluid>
                    <Row className="center">
                        <Col md={6}>
                            <Formik 
                                initialValues={{cidade, bairro, idade, classificacao, us, comentario}}
                                onSubmit={this.onSubmit}
                                validate={this.validate}
                                validateOnChange={false}
                                validateOnBlur={false}
                                enableReinitialize={true}
                            >
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="cidade" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Cidade</label>
                                            <Autocomplete
                                                inputRef={this.inputRef}
                                                searchPattern={'containsString'}
                                                placeholder = ""
                                                getItemValue={(item)=>{ return item.nome }}
                                                itemsData = {cidadesMock}
                                                inputJSX = {(props) => <div><input {...props} className="form-control" /></div> }
                                            />
                                        </fieldset>
                                        <ErrorMessage name="bairro" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Bairro</label>
                                            <Field className="form-control" type="text" name="bairro" />
                                        </fieldset>
                                        <ErrorMessage name="idade" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Idade</label>
                                            <Field name="idade"
                                                render={({ field }) => (
                                                    <MaskedInput
                                                        {...field}
                                                        mask={idadeMask}
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                )}
                                            />
                                        </fieldset>
                                        <ErrorMessage name="classificacao" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Classificação</label>
                                            <Field as="select" className="form-control" type="text" name="classificacao">
                                                <option value="selecione">Selecione...</option>
                                                <option value="leve">Leve</option>
                                                <option value="moderada">Moderada</option>
                                                <option value="grave">Grave</option>
                                            </Field>
                                        </fieldset>
                                        <ErrorMessage name="us" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Unidade de Saúde</label>
                                            <Field className="form-control" type="text" name="us" />
                                        </fieldset>
                                        <ErrorMessage name="comentario" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Comentário</label>
                                            <Field component="textarea" className="form-control" type="text" name="comentario" />
                                        </fieldset>
                                        <br/>
                                        <fieldset className="form-group">
                                            <button className="form-control btn btn-success" type="submit">Registrar</button>
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