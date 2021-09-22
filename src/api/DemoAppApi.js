import axiosClient from "./axiosClient"

const DemoAppApi = {
    getAll: (params = null) => {
        const url = 'https://cdn.24h.com.vn/upload/rss/trangchu24h.rss'
        return axiosClient.get(url);
    }
}

export {
    DemoAppApi
}