import React, { Component } from 'react';
import $ from 'jquery';
import bootstrap from 'bootstrap';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';

class PmacsFeedBackEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            email: this.props.location.state.email
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.resendEmail = this.resendEmail.bind(this)
    }

    resendEmail() {
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }

        UserDataService.sendEmail(user)
        .then(response => {
                if(response.data.code === 100){
                    $('.alert').show();
                    this.refs.simpleModal.modalOpen('Email Enviado', 'Um email foi enviado para ' + this.state.email, 'Daqui há alguns minutos, por favor, verifique sua caixa de entrada.');
                }
                else{
                    if(response.data.code === 666){
                        $('.alert').show();
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

    render() {
        return (
            <div className="container">
                <SimpleModal ref="simpleModal" />
                <div>
                    <p>{this.state.firstName},</p> 
                    <p>Um email de confirmação foi enviado para {this.state.email}.</p>
                    <p>Caso você não receba a mensagem em alguns minutos, <label onClick={this.resendEmail}>Clique aqui</label> para reenviar o email.</p>
                </div>        
            </div>
        )
    }
}

export default PmacsFeedBackEmail