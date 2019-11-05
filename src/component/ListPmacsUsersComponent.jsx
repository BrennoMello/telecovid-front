import React, { Component } from 'react';
import UserDataService from '../service/UserDataService';

class ListPmacsUsersComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.refreshUsers = this.refreshUsers.bind(this)
        this.deleteUserClicked = this.deleteUserClicked.bind(this)
        this.updateUserClicked = this.updateUserClicked.bind(this)
        this.addUserClicked = this.addUserClicked.bind(this)
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        UserDataService.retrieveAllUsers().then(
                response => {
                    this.setState({ users: response.data })
                }
            )
    }

    deleteUserClicked(id) {
        UserDataService.deleteUser(id).then(
                response => {
                    console.log(response)
                    this.setState({ message: `Usuário ${id} removido` })
                    this.refreshUsers()
                }
            )
    }

    updateUserClicked(id) {
        this.props.history.push(`/users/${id}`)
    }

    addUserClicked() {
        this.props.history.push(`/users/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3>Usuários PMACS</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button className="btn btn-warning" 
                                                    onClick={() => this.deleteUserClicked(user.id)}>Remover
                                                </button>
                                                &nbsp;
                                                <button className="btn btn-success" 
                                                    onClick={() => this.updateUserClicked(user.id)}>Atualizar
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" 
                            onClick={this.addUserClicked}>Add
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPmacsUsersComponent