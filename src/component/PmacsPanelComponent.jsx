import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';

const divStyleCenter = {
    textAlign: "center",
};

class PmacsPanelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            token: this.props.location.state.token,
            password: ''
        }
        this.ValidateToken = this.ValidateToken.bind(this)
    }

    ValidateToken() {
        UserDataService.validateUser(this.state.token).then(
            response => {
                console.log("Resposta:")
                console.log(response.data)
                if(response.data){
                    console.log("Token autenticado. Acesso Garantido");
                }
                else{
                    console.log("Token não autenticado. Acesso Negado");
                }
            }
        )
    }

    render() {
        return (
            <>
            <h2>Painel</h2>

            <div style={divStyleCenter}>
                <button className="btn btn-warning" type="butom" onClick={this.ValidateToken}>Validar Token</button>
            </div>
            </>
        )
    }
}

export default PmacsPanelComponent