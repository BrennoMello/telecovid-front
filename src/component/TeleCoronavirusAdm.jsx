import React, { Component } from 'react';
import $ from 'jquery';
import bootstrap from 'bootstrap';
import { Formik, Form } from 'formik';
import UserDataService from '../service/UserDataService';
import SimpleModal from './modal/SimpleModal';
import {Container, Row, Col  } from "react-bootstrap";
import Switch from "react-switch";
import { Loader } from 'react-overlay-loader';
import DataTable from 'react-data-table-component';
import CanditatoExpandido from './CanditatoExpandido';


const divStylePaddingBottom = {
    paddingBottom: "30px",
};

const admMock = {
    nome: 'Sistema Tele Coronavírus',
    chave: ''
}

const candidatosMock = [
    {nome:'João da Silva', email:'joaosilva232@gmail.com', cpf:'556.887.223-56', chave:'3764832683682', ativo:false},
    {nome:'Maria dos Santos', email:'maria232@gmail.com', cpf:'111.887.223-56', chave:'1114832683682', ativo:false},
    {nome:'Paulo Pereira Almeida Couto', email:'paulo232@gmail.com', cpf:'222.887.223-56', chave:'2224832683682', ativo:false},
    {nome:'Patrícia Motta da Cunha', email:'patricia232@gmail.com', cpf:'333.887.223-56', chave:'3334832683682', ativo:false},
    {nome:'Ernesto Simões Filho', email:'ernesto232@gmail.com', cpf:'44.887.223-56', chave:'4444832683682', ativo:false},
]

class TeleCoronavirusAdm extends Component {
    constructor(props) {
        super(props)

        const query = new URLSearchParams(this.props.location.search);

        this.state = {
            chave: query.get('chave'),
            candidatos:[],
            loadingActive: true,
            changeStatusFeedBack: false,
            adm: admMock
        }
        this.handleChange = this.handleChange.bind(this)
        this.getAdminAreaData = this.getAdminAreaData.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    componentDidMount() {
        //this.getAdminAreaData()// descomente quando o back responder
        this.setState({candidatos: candidatosMock, loadingActive:false})// comente quando o back responder
    }

    getAdminAreaData() {
        UserDataService.retrieveAdminAreaData(this.state.chave)
        .then(response => {
            this.setState({loadingActive: false})
            if(response.status === 200){
                this.setState({candidatos: response.data})
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

    changeStatus(candidato) {
        UserDataService.changeStatus(candidato, this.state.chave)
        .then(response => {
            this.setState({loadingActive: false})
            if(response.status === 200){
                this.setState({changeStatusFeedBack: true})
                this.refs.simpleModal.modalOpen('Sucesso!', 'Operação Executada', 'Status do Candidato alterado.');
            }
            else{
                this.setState({changeStatusFeedBack: false})
                this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Por favor, tente novamente mais tarde.');
                console.log(response.data.description);
            }
        })
        .catch(error => {
            this.setState({changeStatusFeedBack: false, loadingActive: false})
            console.log(error.message);
            this.refs.simpleModal.modalOpen('Ops!', 'Um erro ocorreu', 'Descrição do erro: '+error.message);
            }
        )
    }

    handleChange(candidato) {
        if(window.confirm("Tem certeza que deseja alterar o status do candidato?")){
            let auxCandidatos = this.state.candidatos;
            for(let i=0; i<auxCandidatos.length; i++){
                if(auxCandidatos[i].name === candidato.name && auxCandidatos[i].cpf === candidato.cpf){
                    this.setState({loadingActive: true})
                    this.changeStatus(candidato)
                    if(this.state.changeStatusFeedBack){
                        auxCandidatos[i].ativo = !candidato.ativo;
                    }
                    break;
                }
            }

            if(this.state.changeStatusFeedBack){
                this.setState({
                    candidatos: auxCandidatos,
                    changeStatusFeedBack: false
                })
            }
        }
    }
    
    render() {
        const columns = [
            {
                name: 'Nome',
                selector: 'nome',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'ativo',
                sortable: true,
                right: true,
                cell: row => 
                    <div data-tag="___react-data-table-allow-propagation___" style={row.ativo?{color:'green'}:{color:'red'}}>
                        <Switch
                            onChange={() => {this.handleChange(row)}} 
                            checked={row.ativo}
                            id="normal-switch"
                        />
                    </div>
            }
        ];

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
                            <h6 className="font_1">ADMINISTRADOR: {this.state.adm.nome}</h6>
                        </Col>
                    </Row>
                </Container>

                <SimpleModal ref="simpleModal" />
                <div style={divStylePaddingBottom}></div>

                <Container fluid>
                    <Row className="center">
                        <Col md={6}>
                            <Formik >
                            {
                                (props) => (
                                    <Form>
                                        
                                    </Form>
                                )
                            }
                            </Formik>

                            <DataTable
                                title="Candidatos"
                                columns={columns}
                                data={this.state.candidatos}
                                noHeader={true}
                                //selectableRows={true}
                                //selectableRowsHighlight={true}
                                //onSelectedRowsChange={this.selectedRows}
                                expandableRows={true}
                                //onRowExpandToggled={this.onRowExpandToggled}
                                expandableRowsComponent={<CanditatoExpandido />}
                                pagination={true}
                            />
                        </Col>
                    </Row>
                </Container>  
            </>
        )
    }
}

export default TeleCoronavirusAdm