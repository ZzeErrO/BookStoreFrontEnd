import axios from 'axios'

class Axios {

    postMethod = (url: any, data : any, isHeaderRequired : any) =>{
        return axios.post(url, data, isHeaderRequired)
    }

    getMethod = (url: any, isHeaderRequired : any) => {
        return axios.get(url, isHeaderRequired)
    }

    putMethod = (url: any, data : any, isHeaderRequired : any) => {
        return axios.put(url, data, isHeaderRequired)
    }

    deleteMethod = (url : any, isHeaderRequired : any) => {
        return axios.delete(url, isHeaderRequired)
    }

}

export default Axios