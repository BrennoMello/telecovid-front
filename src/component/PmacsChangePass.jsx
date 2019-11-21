import React, { Component } from 'react';
import bootstrap from 'bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';

const divStylePaddingBottom = {
    paddingBottom: "50px",
};

const divStyleBox = {
    width: "50%",
};

class PmacsChangePass extends Component {

    constructor(props) {
        super(props)

        const query = new URLSearchParams(this.props.location.search);

        this.state = {
            id: query.get('id'),
            userName: query.get('userName'),
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let user = {
            id: this.state.id,
            userName: this.state.userName,
            password: values.password
        }
        UserDataService.updatePassword(user)
        .then(response => {
                if(response.data.code === 100){
                    this.refs.simpleModal.modalOpen('Senha alterada', 'A senha da sua conta foi alterada ', 'Acesse a plataforma com sua nova senha');
                }
                else{
                    if(response.data.code === 666){
                        if(response.data.message === 'idNotMatch'){
                            this.refs.simpleModal.modalOpen('Erro grave', 'Identificação do usuário não corresponde.', 'Esse incidente será reportado.');
                        } else if (response.data.message === 'org.apache.axis2.databinding.ADBException'){ 
                            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'É possível que esse usuário não exista.');
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
        if (!values.password) {
            errors.password = 'Entre com uma Senha'
        }
    
        return errors
    }

    render() {
        let password = "";

        return (
            <div className="container" style={divStyleBox}>
                <SimpleModal ref="simpleModal" />
                <br></br>
                <h3 className="font_2">Recuperação de Senha</h3>
                <br></br>
                <div>
                    <p>Por favor, defina uma nova senha para sua conta.</p>
                </div>

                <Formik 
                    initialValues={{password}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="password" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Nova Senha</label>
                                <Field className="form-control" type="password" name="password" />
                            </fieldset>
                            <div style={divStylePaddingBottom}>
                                <button className="btn btn-success" type="submit">Enviar</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        )
    }
}

export default PmacsChangePass