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

    Getcart = () => {
        console.log(`${baseUrl}Cart`, configbook);
        return axiosservice.getMethod(`${baseUrl}Cart`, configbook)
    }

    Getwishlist = () => {
        console.log(`${baseUrl}WishList`, configbook);
        return axiosservice.getMethod(`${baseUrl}WishList`, configbook)
    }

    AddtoCart = (id : any) => {
        console.log(`${baseUrl}Users/${id}/MoveToCart`, id, configbook);
        return axiosservice.putMethod(`${baseUrl}Users/${id}/MoveToCart`, id, configbook)
    }

    AddtoWishList = (id : any) => {
        console.log(`${baseUrl}Users/${id}/MoveToWishList`, id, configbook);
        return axiosservice.putMethod(`${baseUrl}Users/${id}/MoveToWishList`, id, configbook)
    }

    Order = (id : any, quantity : any) => {
        console.log(`${baseUrl}Order/${id}/${quantity}`, id, configbook);
        return axiosservice.putMethod(`https://localhost:44368/Order/${id}/${quantity}`, id, configbook)
    }

}

export default Userservice