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
    paddingBottom: "30px",
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

const bairroMock = [
    {nome:'Barbalho'},
    {nome:'Barra'},
    {nome:'Boca do Rio'},
    {nome:'São Caetano'},
    {nome:'São Cristovão'},
    {nome:'São Marcos'},
]

const usMock = [
    {nome:'Selecione...',endereco:'', telefone:''},
    {nome:'Unidade da Família',endereco:'Rua Gustavo Simões, 345, São Caetano', telefone:'(71) 3327-8766'},
    {nome:'Unidade de Saúde Amélia Barreto',endereco:'Rua dos Perdões, 8765, Ed. São Pedro, Santo António de Desterro', telefone:'(71) 7866-8766'},
]

class TeleCoronavirusRegistroAtendimento extends Component {
    cidadeRef = React.createRef();
    bairroRef = React.createRef();

    classificacaoRef = React.createRef();
    usRef = React.createRef();

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
            loadingActive: false,
            classificacaoDisabled: true,
            usDisabled:true,
            usDados:'none',
            usNome: '',
            usEndereco: '',
            usTelefone: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.getVoluntario = this.getVoluntario.bind(this)
        this.getCidades = this.getCidades.bind(this)
        this.getBairros = this.getBairros.bind(this)
        this.getUss = this.getUss.bind(this)
        this.onBlurBairro = this.onBlurBairro.bind(this)
        this.usSelected = this.usSelected.bind(this)
        
    }

    componentDidMount() {
        this.cidadeRef.current.parentNode.style.width = '-webkit-fill-available';
        this.bairroRef.current.parentNode.style.width = '-webkit-fill-available';
        this.cidadeRef.current.focus();
        //this.getVoluntario()// descomente quando o back responder
        this.setState({voluntario: voluntarioMock, loadingActive:false, cidades: cidadesMock, bairros: bairroMock, uss: usMock})// comente quando o back responder
    }

    getVoluntario(){
        this.setState({loadingActive: true})
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

    getBairros(e){
        if(e.target.value){
            this.setState({loadingActive: true})
            UserDataService.retrieveBairros(e.target.value, this.state.chave)
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
    }

    onBlurBairro(){
        if(this.cidadeRef.current.value != "" && this.bairroRef.current.value != ""){
            this.setState({classificacaoDisabled: false})
        }
    }

    usSelected(e){
        let usSelected = e.target.value
        if(e.target.value !== "Selecione..."){
            for(let i=0; i<this.state.uss.length; i++){
                if(usSelected === this.state.uss[i].nome){
                    this.setState(
                        {
                            usNome: this.state.uss[i].nome,
                            usEndereco: this.state.uss[i].endereco,
                            usTelefone: this.state.uss[i].telefone,
                            usDados:"block"
                        }
                    )
                    break
                }
            }
        }
        else{
            this.setState({usDados:"none"})
        }
    }

    getUss(e){
        if(e.target.value && e.target.value != "selecione" && this.cidadeRef.current.value && this.bairroRef.current.value){ 
            let usRequisitos = {
                cidade:this.cidadeRef.current.value,
                bairro:this.bairroRef.current.value,
                classificacao:e.target.value
            }

            this.setState({loadingActive: true})
            UserDataService.retrieveUss(usRequisitos, this.state.chave)
            .then(response => {
                this.setState({loadingActive: false})
                if(response.status === 200){
                    this.setState({uss: response.data, usDisabled:false})
                }
                else{
                    this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                    console.log(response.data.description);
                }
            })
            .catch(error => {

                this.setState({usDisabled: false})// em producao me tire daqui


                this.setState({loadingActive: false})
                console.log(error.message);
                this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
                }
            )
        }
    }

    onSubmit(values) {
        if(window.confirm("Confirma registro com os dados abaixo: \n\n" + 
                "Cidade: "+ this.cidadeRef.current.value + "\n" +
                "Bairro: "+ this.bairroRef.current.value + "\n" +
                "Idade: "+ values.idade + "\n" +
                "Classificacao: "+ values.classificacao + "\n" +
                "Unidade de Saúde: "+ values.us + "\n" +
                "Comentário: "+ values.comentario
            )){
            this.setState({loadingActive: true})
            let registro = {
                    cidade: this.cidadeRef.current.value,
                    bairro: this.bairroRef.current.value,
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
        if (!this.cidadeRef.current.value) {
            errors.cidade = 'Entre com a Cidade'
        }
        if (!this.bairroRef.current.value) {
            errors.bairro = 'Entre com o Bairro'
        }
        if (!values.idade) {
            errors.idade = 'Entre com a Idade'
        }
        if (!values.classificacao || values.classificacao === "selecione") {
            errors.classificacao = 'Entre com a Classificação'
        }
        if (!values.us || values.us === "Selecione...") {
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
                    <Row className="center" style={{paddingBottom:'10px'}}>
                        <Col sm={12}>
                            <h5 className="font_1">TELE</h5>
                            <h6 className="font_1">CORONAVÍRUS</h6>
                        </Col>
                    </Row>

                    <Row className="center">
                        <Col sm={12}>
                            <h6 className="font_1">VOLUNTÁRIO: {this.state.voluntario.nome}</h6>
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
                                                inputRef={this.cidadeRef}
                                                searchPattern={'containsString'}
                                                placeholder = ""
                                                getItemValue={(item)=>{ return item.nome }}
                                                itemsData = {this.state.cidades}
                                                inputJSX = {(props) => <input {...props} onBlur={(e) => {this.getBairros(e)}} className="form-control" /> }
                                            />
                                        </fieldset>
                                        <ErrorMessage name="bairro" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Bairro</label>
                                            <Autocomplete
                                                inputRef={this.bairroRef}
                                                searchPattern={'containsString'}
                                                placeholder = ""
                                                getItemValue={(item)=>{ return item.nome }}
                                                itemsData = {this.state.bairros}
                                                inputJSX = {(props) => <input {...props} onBlur={(e) => {this.onBlurBairro(e)}} className="form-control" /> }
                                            />
                                        </fieldset>
                                        <ErrorMessage name="idade" component="div" className="alert alert-warning" />
                                        <ErrorMessage name="classificacao" component="div" className="alert alert-warning" />
                                        <Row>
                                            <Col sm={6}>
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
                                            </Col>
                                            <Col sm={6}>
                                                <fieldset className="form-group" style={{textAlign:'left'}}>
                                                    <label>Classificação</label>
                                                    <Field disabled={this.state.classificacaoDisabled} as="select" className="form-control" type="text" name="classificacao" onClick={(e) => {this.getUss(e)}}>
                                                        <option value="selecione">Selecione...</option>
                                                        <option value="leve">Leve</option>
                                                        <option value="moderada">Moderada</option>
                                                        <option value="grave">Grave</option>
                                                    </Field>
                                                </fieldset>
                                            </Col>
                                        </Row>
                                        <ErrorMessage name="us" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group" style={{textAlign:'left'}}>
                                            <label>Unidade de Saúde</label>
                                            <Field disabled={this.state.usDisabled} as="select" innerRef={this.usRef} onClick={(e) => {this.usSelected(e)}} className="form-control" type="text" name="us" >
                                                {this.state.uss.map((item, index) =>
                                                    <option value={item.nome}>{item.nome}</option>
                                                )}
                                            </Field>
                                        </fieldset>
                                        <fieldset className="form-group" style={{textAlign:'left', display:(this.state.usDados)}}>
                                            <p style={{backgroundColor:'beige'}}>Unidade de Saúde: {this.state.usNome}</p>
                                            <p style={{fontStyle:'italic'}}>
                                                Endereço: {this.state.usEndereco}
                                                <br/>
                                                Telefone: {this.state.usTelefone}
                                            </p>
                                            
                                        </fieldset>
                                        
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

export default TeleCoronavirusRegistroAtendimento