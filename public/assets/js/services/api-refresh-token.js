// import * as apiInterceptor from '../interceptors/api-interceptor';
const ss = require('../interceptors/api-interceptor');
export const refreshToken = {
    post: (data, isLocaStorageToken = false) => apiInterceptor({
        url: '/auth/refresh-token',
        data,
        headers: {
            "Content-Type": "application/json",
            "AUTH_TOKEN_X": isLocaStorageToken
        },
        method: 'post',
    })

}











// import GlobalHelper from "../helpers/global-helper";
// import axios from"axios";
// export const refreshToken = async (data, isLocaStorageToken = false)=>{
//     // const gbHelper = new GlobalHelper();
//     // const token = await gbHelper.AsyncLocalStorageSetup('__wua', 'get');
//     try {

//         return await  apiInterceptor.post({
//             url:'http://localhost:3901/api/auth/refresh-token',
//             data,
//             headers: {
//                 "Content-Type": "application/json",
//                 "AUTH_TOKEN_X": isLocaStorageToken
//             },
//             method:'post'
//         })
//     } catch (error) {
//         return error
//     }

//     // return new Promise((resolve, reject)=>{
//     //     axios.post({
//     //         url:'/auth/refresh-token',
//     //         data,
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //             "AUTH_TOKEN_X": isLocaStorageToken
//     //         },
//     //         method:'post'
//     //     }).then(response=>{
//     //         // console.log('apiiiiiiiiiiiiiiii');
//     //         // console.log(response);
//     //         // console.log('apiiiiiiiiiiiiiiii');
//     //         resolve(response);
//     //     }).catch(err=>{
//     //         // console.log('apiErrrrrrrrrrrrrrrrrrrrr');
//     //         // console.log(err);
//     //         // console.log('apiErrrrrrrrrrrrrrrrrrrrr');
//     //         reject(err);
//     //         // if (err) {
//     //         // }
//     //     })
//     // })

// }

/*
// import apiInterceptor from'../interceptors/api-interceptor';
// import GlobalHelper from "../helpers/global-helper";
import axios from"axios";
export const refreshToken = async (data, isLocaStorageToken = false)=>{
    // const gbHelper = new GlobalHelper();
    // const token = await gbHelper.AsyncLocalStorageSetup('__wua', 'get');

    // return new Promise((resolve, reject)=>{
        
        try {
            return await axios.post({
                url:'/auth/refresh-token',
                data,
                // headers: {
                //     "Content-Type": "application/json",
                //     "AUTH_TOKEN_X": isLocaStorageToken
                // }
            })
            
        } catch (error) {
            return error;
        }
        
        
        // .then(response=>{
        //     // console.log('apiiiiiiiiiiiiiiii');
        //     // console.log(response);
        //     // console.log('apiiiiiiiiiiiiiiii');
        //     // resolve(response);
        //     return response;
        // }).catch(err=>{
        //     return err;
        //     // console.log('apiErrrrrrrrrrrrrrrrrrrrr');
        //     // console.log(err);
        //     // console.log('apiErrrrrrrrrrrrrrrrrrrrr');
        //     // reject(err);
        //     // if (err) {
        //     // }
        // })

    // })

}



*/