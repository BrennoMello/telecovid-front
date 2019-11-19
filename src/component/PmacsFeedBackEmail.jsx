import React, { Component } from 'react';
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
        this.resendEmail = this.resendEmail.bind(this)
    }

    resendEmail() {
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }

        UserDataService.minimalRegisterUser(user)
        .then(response => {
                if(response.data.code === 100){
                    this.refs.simpleModal.modalOpen('Email Enviado', 'Um email foi enviado para ' + this.state.email, 'Daqui há alguns minutos, por favor, verifique sua caixa de entrada.');
                }
                else{
                    if(response.data.code === 666){
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
                    <p>Caso você não receba a mensagem em alguns minutos, <a href="#0" onClick={this.resendEmail}>Clique aqui</a> para reenviar o email.</p>
                </div>        
            </div>
        )
    }
}

export default PmacsFeedBackEmail