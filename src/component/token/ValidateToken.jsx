import React, { Component } from 'react';
import UserDataService from '../../service/UserDataService';
import SimpleModal from '../modal/SimpleModal';

class ValidateToken extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user
        }

        this.validateToken = this.validateToken.bind(this)
    }

    validateToken() {
        UserDataService.validateUser(this.state.user.token)
        .then(response => {
                if(response.data.code === 100){
                    if(response.data.validate){
                        console.log(this.state.user.userName+": Token autenticado. Acesso Garantido");
                    }
                    else{
                        console.log("Token não autenticado. Acesso Negado");
                    }
                }
                else{
                    if(response.data.code === 666){
                        this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
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

                <div className="center">
                    <button className="btn btn-warning" type="butom" onClick={this.validateToken}>Validar Token</button>
                </div>
            </div>
        )
    }
}

export default ValidateToken