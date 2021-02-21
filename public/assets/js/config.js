class Config {

    appSettings() {
        return {
            appName: 'Claford',
            appDomain: 'www.claford.com',
            cathWord: 'The best marketplace',
            apiUrl: 'http://localhost:4300/',
            apiAssetsImg: 'http://localhost:4300/assets/img/',
        }
    }

    getCopyRight(search) {
        const date = new Date();
        const appConfig = document.querySelector(search);
        // const Img = document.createElement('img');
        // Img.src = '/assets/img/logo.png';
        // const p = document.createElement('p');
        // p.textContent = `Copyright &copy; 2019 - ${date.getFullYear()} ${this.generalSettings().appName}. <br/> All rights reversed.`;
        // // appConfig.appendChild(Img);
        // // appConfig.appendChild(p);

        appConfig.innerHTML = `
            <img src="/assets/img/logo.png" alt="">
            <p>Copyright &copy; 2019 - ${date.getFullYear()} ${this.generalSettings().appName}. <br/> All rights reversed.</p>
        `;
    }

    Rgex() {
        return {
            // name: /^[a-zA-Z\s]+$/,
            name_dashes: /^[a-zA-Z\-]+$/,
            description: /^[\w\s\.]+$/,
            // eslint-disable-next-line
            email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            emailOrPhone: /^(?:\d{10}|[\w\.\-]+@[\w\.\-]+\.\w{2,3})$/,
            // emailOrPhone: /^(?:\d{10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/,
            // eslint-disable-next-line
            password: /^(?=.*[a-z\_\.\-])(?=.*[A-Z\_\.\-])(?=.*[0-9])[a-zA-Z0-9\_\.\-]+$/,
            alpha: '^[a-zA-Z]+$',
            // eslint-disable-next-line
            alphaNum: '^[a-zA-Z\d]+$',
            // eslint-disable-next-line
            alphaSpace: /^[a-zA-Z\s]+$/,
            // eslint-disable-next-line
            alphaNumSpace: /^[a-zA-Z\d\s]+$/,
            gender: '^[F|M]+$',
            // eslint-disable-next-line
            phoneSpecialChars: '^[0-9\-\(\)]+$',
            phoneSpecialCharsFull: /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
            // phoneNoSpecialChars: '^[0-9]+$',
            phone: /^[0-9]+$/,
            // eslint-disable-next-line
            dateNoFormated: '/^[a-zA-Z\d\(\)\:\-]+$/', //Fri Jan 17 2020 22:12:27 GMT-0500 (Eastern Standard Time)
            // eslint-disable-next-line
            number: /^[\d]+$/,
            isMongoId: /^[a-f\d]{24}$/i,
            // eslint-disable-next-line
            tax: /^([\d]+\%)+$/,
            // eslint-disable-next-line
            address: /^[a-zA-Z\d\s\,\.\-]+$/,
            // eslint-disable-next-line
            zipcode: /^([\d]{5})+$/,
            boolExp: /[true|false]/
        }
    }

    getStartOrEndWith(elem, find, startEnd) {
        switch (startEnd) {
            case 'S':
                if (elem.startsWith(find)) {
                    return true;
                }
                return false;
            case 'E':
                if (elem.endsWith(find)) {
                    return true;
                }
                return false;
            case 'SE':
                if (elem.endsWith(find) || elem.startsWith(find)) {
                    return true;
                }
                return false;
        }
    }


    validations(inputName, value, showErrorTag, e, error) {

        if (value === '' && error.required) {
            showErrorTag.textContent = error.empty;
            e.target.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            obj = {
                ...obj,
                hasError: true
            }
            return true;
        } else if (value.length < error.min_length && error.required || value.length > error.max_Length) {
            showErrorTag.textContent = `${error.maxMin}`;
            e.target.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            obj = {
                ...obj,
                hasError: true
            }
            return true;
        } else if (value.length < error.min_length && !error.required) {
            if (value === '') {
                showErrorTag.textContent = '';
                e.target.classList.remove('errorInputForm');
                showErrorTag.classList.remove('error');
                obj = {
                    ...obj,
                    hasError: false
                };
                return true;
            }
            showErrorTag.textContent = `${error.maxMin}`;
            e.target.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            obj = {
                ...obj,
                hasError: true
            };
            return true;
            // } else if (error.startEnd !== null) {
        } else if (error.startEnd) {
            // : { find: '-', startEnd: 'SE' }
            if (this.getStartOrEndWith(value, error.startEnd.find, error.startEnd.startEnd)) {
                showErrorTag.textContent = `${error.startEnd.error}`;
                e.target.classList.add('errorInputForm');
                showErrorTag.classList.add('error');
                obj = {
                    ...obj,
                    hasError: true
                };
                return true;
            }
            showErrorTag.textContent = '';
            e.target.classList.remove('errorInputForm');
            showErrorTag.classList.remove('error');
            obj = {
                ...obj,
                hasError: false
            };
            return true;
        } else if (!this.Rgex()[inputName].test(value)) {
            // showErrorTag.textContent = 'Name format must be ( Category name )';
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.regex}
            `;
            e.target.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            // elem.querySelector('i').classList.add('icon-checkmark-circle text-danger');
            obj = {
                ...obj,
                hasError: true
            }
            return true;
        } else {
            obj = {
                ...obj,
                hasError: false,
                [e.target.name]: value
            }

            showErrorTag.textContent = '';
            e.target.classList.remove('errorInputForm');
            showErrorTag.classList.remove('error');
            return true;
        }
    }

    validationsSubmit(inputName, value, showErrorTag, e, error) {

        if (value === '' && error.required) {
            e.classList.add('errorInputForm');
            showErrorTag.textContent = error.empty;
            showErrorTag.classList.add('error');
            obj = {
                ...obj,
                hasError: true
            };
            return true;
        } else if (value.length < error.min_length && error.required || value.length > error.max_Length) {
            showErrorTag.textContent = `${error.maxMin}`;
            e.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            obj = {
                ...obj,
                hasError: true
            };
            return true;
        } else if (value.length < error.min_length && !error.required) {
            if (value === '') {
                showErrorTag.textContent = '';
                e.classList.remove('errorInputForm');
                showErrorTag.classList.remove('error');
                obj = {
                    ...obj,
                    hasError: false
                }
                return true;
            }
            showErrorTag.textContent = `${error.maxMin}`;
            e.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            obj = {
                ...obj,
                hasError: true
            }
            return true;
        } else if (error.startEnd) {
            // : { find: '-', startEnd: 'SE' }
            if (this.getStartOrEndWith(value, error.startEnd.find, error.startEnd.startEnd)) {
                showErrorTag.textContent = `${error.startEnd.error}`;
                e.classList.add('errorInputForm');
                showErrorTag.classList.add('error');
                obj = {
                    ...obj,
                    hasError: true
                };
                return true;
            }
            showErrorTag.textContent = '';
            e.classList.remove('errorInputForm');
            showErrorTag.classList.remove('error');
            obj = {
                ...obj,
                hasError: false
            };
            return true;
        } else if (!this.Rgex()[inputName].test(value)) {
            // showErrorTag.textContent = 'Name format must be ( Category name )';
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.regex}
            `;
            e.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            // elem.querySelector('i').classList.add('icon-checkmark-circle text-danger');
            obj = {
                ...obj,
                hasError: true
            };
            return true;
        } else {
            obj = {
                ...obj,
                hasError: false,
                [e.name]: value
            };

            showErrorTag.textContent = '';
            e.classList.remove('errorInputForm');
            showErrorTag.classList.remove('error');
            return true;
        }
    }

    async AsyncLocalStorageSetup(key, type = null, data = null, setEncode = {}) {

        switch (type) {
            case 'set':
                // localStorage.setItem('rememberme', JSON.stringify(btoa(data)));
                if (setEncode.setEncode !== undefined && setEncode.setEncode) {
                    // this.localStorage(key, 'set', this.encodeData(data));
                } else {
                    localStorage.setItem(key, data);
                }
                return true;
            case 'get':
                // return this.encodeData(JSON.parse(localStorage.getItem(key)), 'decode');
                if (!!localStorage.getItem(key)) {
                    if (setEncode.decode !== undefined && setEncode.decode) {
                        return this.encodeData(JSON.parse(localStorage.getItem(key)), 'decode');
                    } else {
                        return localStorage.getItem(key);

                    }
                }
                return null;
                // return atob(JSON.parse(localStorage.getItem(key)));
            case 'remove':
                return localStorage.removeItem(key);
            default:
                if (!!localStorage.getItem(key)) {
                    return true;
                }
                return false;
        }
    }

    async encodeData(data, type = null) {
        //=====================================
        // private function
        //=====================================

        switch (type) {
            case 'decode':
                return atob(data);
            default:
                //encode
                return btoa(data);
        }

    }

}
const config = new Config();