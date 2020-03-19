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
        return axios.post(`${VOLUNTARIO_API_URL}/voluntario/`, voluntario);
    }

    retrieveAdminAreaData(chave) {
        return axios.get(`${VOLUNTARIO_API_URL}/adm/`, chave);
    }

    changeStatus(voluntario) {
        console.log("changeStatus:")
        console.log(voluntario)
        return axios.post(`${VOLUNTARIO_API_URL}/voluntario/status`, voluntario);
    }

}

export default new UserDataService()