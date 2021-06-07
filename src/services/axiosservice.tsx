import axios from 'axios'

axios.interceptors.request.use((request : any) => {
    console.log(request);
    return Promise.resolve(request);
});

axios.interceptors.response.use((response : any) => {
    console.log(response);
    return Promise.resolve(response)
});

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