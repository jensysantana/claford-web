class Authentication extends FetchDataApi {

    signUp(data) {
        return this.apiInterceptor({
            url: '/auth/signup',
            method: 'post',
            data: data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": false,
            },
        });
    }
    signIn(data) {
        return this.apiInterceptor({
            url: '/auth/sign-in',
            method: 'post',
            data: data.data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": false
            },
            timeout: 5000,
            withCredentials: true, // esto es para enviar el token al backend o recibirlo
            // ...data.functions
        });
    }
    reFreshToken(data) {
        return this.apiInterceptor({
            url: '/auth/refresh-token',
            method: 'post',
            data: data.data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": false
            },
            timeout: 5000,
            withCredentials: true, // esto es para enviar el token al backend o recibirlo
            // ...data.functions
        });
    }
    accountValidate(data) {
        return this.apiInterceptor({
            url: '/auth/account-validate-by-token',
            method: 'post',
            data: data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": false
            },
        });
    }
    forgotAccountPassword(data) {
        return this.apiInterceptor({
            url: '/auth/recovery-password-from-email',
            method: 'post',
            data: data.data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": false
            },
            // withCredentials: true, // esto es para enviar el token al backend o recibirlo
        });
    }
    accRecIsUserPhone(data) {
        return this.apiInterceptor({
            url: `/auth/recovery-from-phone?uaid=${data.data}`,
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": false
            },
            // withCredentials: true, // esto es para enviar el token al backend o recibirlo
        });
    }
    resetPasswordRecovery(data) {
        return this.apiInterceptor({
            url: '/auth/reset-password-recovery',
            method: 'post',
            data: data.data,
            headers: {
                "Content-Type": "application/json",
                "AUTH_TOKEN_X": false
            },
            // withCredentials: true, // esto es para enviar el token al backend o recibirlo
        });
    }
    googleSignUp(data) {
            return this.apiInterceptor({
                url: '/auth/google-sign-up',
                method: 'post',
                data: data.data,
                headers: {
                    "Content-Type": "application/json",
                    "AUTH_TOKEN_X": false
                },
                // withCredentials: true, // esto es para enviar el token al backend o recibirlo
            });
        }
        // accountRecoveryByPhone(data) {
        //     return this.apiInterceptor({
        //         url: '/auth/forgot-password',
        //         method: 'post',
        //         data: data.data,
        //         headers: {
        //             "Content-Type": "application/json",
        //             "AUTH_TOKEN_X": false
        //         },
        //         // withCredentials: true, // esto es para enviar el token al backend o recibirlo
        //     });
        // }
}