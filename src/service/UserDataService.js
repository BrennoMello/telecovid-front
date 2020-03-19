import axios from 'axios'

const VOLUNTARIO_API_URL = 'http://localhost:8080'

class UserDataService {

/*
    retrieveUser(id) {
        return axios.get(`${USER_API_URL}/users/${id}`);
    }

    updateUser(id, user) {
        return axios.put(`${USER_API_URL}/users/${id}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${USER_API_URL}/users/${id}`);
    }
  
    createUser(user) {
        return axios.post(`${USER_API_URL}/users/`, user);
    }

    authenticateUser(user){
        return axios.post(`${USER_API_URL}/users/authenticate/`, user);
    }

    validateUser(token){
        return axios.post(`${USER_API_URL}/users/validate/`, token);
    }

    minimalRegisterUser(user){
        return axios.post(`${USER_API_URL}/users/minRegister/`, user);
    }

    completeRegisterUser(user){
        return axios.post(`${USER_API_URL}/users/completeRegister/`, user);
    }

    rememberPass(user){
        return axios.post(`${USER_API_URL}/users/rememberPass/`, user);
    }

    updatePassword(user){
        return axios.post(`${USER_API_URL}/users/updatePassword/`, user);
    }
*/


    getVersion() {
        return axios.get(`${VOLUNTARIO_API_URL}/version`);
    }

    serUmVoluntario(voluntario) {
        console.log("serUmVoluntario: " + `${VOLUNTARIO_API_URL}/voluntario`)
        console.log(voluntario)
        return axios.post(`${VOLUNTARIO_API_URL}/voluntario`, voluntario);
    }

    retrieveAdminAreaData(chave) {
        console.log("retrieveAdminAreaData: " + `${VOLUNTARIO_API_URL}/adm`)
        console.log(chave)
        let headers = {chave: chave}
        return axios.get(`${VOLUNTARIO_API_URL}/adm`, {'headers' : headers});
    }

    changeStatus(voluntario, chave) {
        console.log("changeStatus: " + `${VOLUNTARIO_API_URL}/voluntario/status`)
        console.log(voluntario)
        console.log(chave)
        let headers = {chave: chave}
        return axios.post(`${VOLUNTARIO_API_URL}/voluntario/status`, voluntario, {'headers' : headers});
    }

    retrieveVoluntario(chave) {
        console.log("retrieveVoluntario: " + `${VOLUNTARIO_API_URL}/voluntario`)
        console.log(chave)
        let headers = {chave: chave}
        return axios.get(`${VOLUNTARIO_API_URL}/voluntario`, {'headers' : headers});
    }

    retrieveCidades(chave) {
        console.log("retrieveCidades: " + `${VOLUNTARIO_API_URL}/cidades`)
        console.log(chave)
        let headers = {chave: chave}
        return axios.get(`${VOLUNTARIO_API_URL}/cidades`, {'headers' : headers});
    }

    retrieveBairros(cidade, chave) {
        console.log("retrieveBairros: " + `${VOLUNTARIO_API_URL}/bairros`)
        console.log(cidade)
        console.log(chave)
        let headers = {chave: chave}
        return axios.get(`${VOLUNTARIO_API_URL}/bairros`, cidade, {'headers' : headers});
    }

    retrieveUss(classificacao, chave) {
        console.log("retrieveUss: " + `${VOLUNTARIO_API_URL}/uss`)
        console.log(classificacao)
        console.log(chave)
        let headers = {chave: chave}
        return axios.get(`${VOLUNTARIO_API_URL}/uss`, classificacao, {'headers' : headers});
    }

    registrarAtendimento(registro, chave) {
        console.log("registrarAtendimento: " + `${VOLUNTARIO_API_URL}/registro`)
        console.log(registro)
        console.log(chave)
        let headers = {chave: chave}
        return axios.post(`${VOLUNTARIO_API_URL}/registro`, registro, {'headers' : headers});
    }
    
}

export default new UserDataService()