import React, { Component } from 'react';
import $ from 'jquery';
import bootstrap from 'bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';
import {Container, Row, Col  } from "react-bootstrap";
import Switch from "react-switch";
import InputMask from 'react-input-mask';
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

const divStyleBox = {
    width: "50%",
};

class CanditatoExpandido extends Component {
    constructor(props) {
        super(props)

        this.state = {
            candidatoExpandido: this.props.data,
            loadingActive: false
        }

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <>
                <Loader fullPage loading={this.state.loadingActive} text=""/>
                <SimpleModal ref="simpleModal" />

                <Container fluid>
                    <Row className="left">
                        <Col>
                            <div style={{fontSize:'12px', padding:'20px'}}>
                                <b>Nome: </b><p style={{fontSize:'13px'}}>{this.state.candidatoExpandido.nome ? this.state.candidatoExpandido.nome : '...'}</p>
                                <b>Email: </b><p style={{fontSize:'13px'}}>{this.state.candidatoExpandido.email ? this.state.candidatoExpandido.email: '...'}</p>
                                <b>CPF: </b><p style={{fontSize:'13px'}}>{this.state.candidatoExpandido.cpf ? this.state.candidatoExpandido.cpf : '...'}</p>
                                <b>Status: </b><p style={{fontSize:'13px'}}>{this.state.candidatoExpandido.ativo ? 'Ativo' : 'Inativo'}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>  
            </>
        )
    }
}

export default CanditatoExpandido