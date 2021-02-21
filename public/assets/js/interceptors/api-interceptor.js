// import axios from 'axios'
// import { ConfigBackend } from"../config/config";
// import GlobalHelper from "../helpers/global-helper/global-helper";
// import apiToken from '../services/api-refresh-token';

// const { backendBaseUrl} = ConfigBackend;
// console.log("ConfigBackend", backendBaseUrl)

// class InterCeptor extends FetchDataApi {

// }

// const apiInterceptor = new FetchDataApi();
const apiInterceptor = axios.create({
    baseURL: config.appSettings().apiUrl,
    // headers:{'Content-Type':'application/x-www-form-urlencoded'},
    headers: { 'Content-Type': 'application/json' },
    // timeout: 20000,
});

console.log('---------apiInterceptor---------');
console.log(apiInterceptor);
console.log('---------apiInterceptor---------');

// apiInterceptor.interceptors.request.use(async(configReq) => {
//     // const gbHelper = new GlobalHelper();
//     //================================================================================================
//     // if have a token validate token expiration to refresh token or send the old token to the backend
//     //================================================================================================

//     try {
//         console.log('---------1---------');
//         console.log(1);
//         const token = await config.AsyncLocalStorageSetup('__wua', 'get', null, { decode: false });
//         console.log('---------22---------');
//         if (configReq.headers.AUTH_TOKEN_X) {
//             console.log('---------333---------');
//             if (token !== null && token !== undefined) {
//                 console.log('---------44---------');
//                 configReq.headers.Authorization = null;
//                 configReq.headers.Authorization = `${token}`;
//             }
//             console.log('---------55---------');
//         }
//         console.log('---------66---------');
//         /*   const authRlN = await config.AsyncLocalStorageSetup('BSIN', 'get', null, {decode:true});
//         if (configReq.headers.AUTH_ROLE) {
//             if (authRlN !== null && authRlN !== undefined) {
//                 configReq.headers.auth_role_x = null;
//                 configReq.headers.auth_role_x = `${JSON.parse(authRlN)._id}`;
//             }
//         }
//         return  configReq;
//     } catch (error) {
//         console.log('configReq   error error ');
//         console.log(error);
//         console.log('configReq   error error ');
//     }
// }, error=>{
//     return error;
// })

// let isRefreshing = 0;
// apiInterceptor.interceptors.response.use(async (response)=>{
//     return response;
//     }, async (error)=>{

//         try {
//             const { configReq, response:{ status, data } } = error;
//             const originalRequest = configReq;
//             if (status === 401 && data.status === 'ErrorToken' && data.message === 'The token is expired.') {
//                 if (isRefreshing <= 2) {
//                     isRefreshing ++;
//                     // const gbHelper = new GlobalHelper();

//                     let requestResp = await refreshToken.post({token:configReq.headers.Authorization}, false);
//                     let { status:statusTokenRefreshed, data:dataTokenRefreshed } = requestResp;
//                     if (statusTokenRefreshed === 200) {
//                         if (dataTokenRefreshed.status !== undefined && dataTokenRefreshed.status === 'success') {
//                             //=====================================
//                             // Start store new token
//                             //=====================================
//                             if (configReq.headers.AUTH_TOKEN_X) {
//                                 configReq.headers.Authorization = `${dataTokenRefreshed.response}`;
//                                 isRefreshing = 5;
//                                 setTimeout(()=>isRefreshing = 0, 2000)
//                                 await config.AsyncLocalStorageSetup('__wua', 'set', dataTokenRefreshed.response, {setEncode:false});
//                                 //=====================================
//                                 // Start resend request to the backend
//                                 //=====================================
//                                 return apiInterceptor(originalRequest);
//                             }
//                             throw new Error();
//                         }
//                     }
//                 }
//             }
//             */
//     } catch (err) {
//         console.log('try error .............');
//         console.log(err.response);
//         console.log('try error .............');
//     }
//     return Promise.reject(error);
// })