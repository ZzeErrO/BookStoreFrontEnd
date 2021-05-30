import Axios from './axiosservice'

const axiosservice = new Axios();
const baseUrl = 'https://localhost:44368/api/'

const configbook = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('id')}`
    }
}

class Userservice {

    Registration = (data : any) => {
        console.log(`${baseUrl}Users/Register`, data);
        return axiosservice.postMethod(`${baseUrl}Users/Register`, data, false)
    }

    Login = (data : any) => {
        console.log(`${baseUrl}Users/Login`, data, configbook);
        return axiosservice.postMethod(`${baseUrl}Users/Login`, data, configbook)
    }

    Getdata = () => {
        console.log(`${baseUrl}Users`, configbook);
        return axiosservice.getMethod(`${baseUrl}Users`, configbook)
    }

}

export default Userservice