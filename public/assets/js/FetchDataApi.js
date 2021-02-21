class FetchDataApi {
    instance = axios.create();
    base_url = 'http://localhost:4300/api/v1';
    constructor() {}
        ///api/v1/categories
    async fetch(url, obj) {
        return await fetch(`${this.base_url}${url}`, {...obj });
        // return await fetch('http://localhost:4300/api/v1/categories', {
        //     method: 'GET',
        // });
    }

    apiInterceptor(data) {
        const instance = axios.create();
        return instance({
            baseURL: `${this.base_url}`,
            timeout: 20000,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            ...data
        });
    }

}