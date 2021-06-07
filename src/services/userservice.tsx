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
        console.log(`${baseUrl}Cart/Order/${id}/${quantity}`, id, configbook);
        return axiosservice.putMethod(`${baseUrl}Cart/Order/${id}/${quantity}`, id, configbook)
    }

    DeleteWishList  = (id : any) => {
        console.log(`${baseUrl}WishList/${id}`, configbook);
        return axiosservice.deleteMethod(`${baseUrl}WishList/${id}`, configbook)
    }

    DeleteCart  = (id : any) => {
        console.log(`${baseUrl}Cart/${id}`, configbook);
        return axiosservice.deleteMethod(`${baseUrl}Cart/${id}`, configbook)
    }

}

export default Userservice