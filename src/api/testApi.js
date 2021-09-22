import axiosClient from "./axiosClient"

const testApi = {
    getAll: (params = null) => {
        const url = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations/274';
        return axiosClient.get(url);
    }
}
export {
    testApi
}