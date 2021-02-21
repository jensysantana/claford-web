//copyriht and name app
const appName = document.querySelectorAll('.appName');
if (typeof appName === 'object') {
    appName.forEach(item => {
        const name = item.getAttribute('data-name');
        config.getCopyRight('#appConfig');
        item.textContent = `${config.generalSettings().appName} ${name}`;
    });
}

class FormValidator {
    obj = {};
    errorField;
    constructor(obj, errorField) {
        this.obj = obj;
        this.errorField = errorField;
    }

    validations(inputName, value, showErrorTag, e, error) {
        if (value === '' && error.required) {
            e.target.classList.add('errorInputForm');
            // showErrorTag.textContent = error.empty;
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.empty}
            `;
            showErrorTag.classList.add('error');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: true
            };
            return true;
        }
        if (value === '' && !error.required) {
            showErrorTag.textContent = '';
            e.target.classList.remove('errorInputForm');
            showErrorTag.classList.remove('error');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: false
            };
            return true;
        }
        if (error.min_length > value.length || value.length > error.max_Length) {
            showErrorTag.innerHTML = `
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.maxMin}
            `;
            // showErrorTag.textContent = `${error.maxMin}`;
            e.target.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: true
            };
            return true;
        }
        if (!config.Rgex()[inputName].test(value)) {
            // showErrorTag.textContent = 'Name format must be ( Category name )';
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.regexText}
            `;
            e.target.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            // elem.querySelector('i').classList.add('icon-checkmark-circle text-danger');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: true
            };
            return true;
        }
        if (error.startEnd) {
            // : { find: '-', startEnd: 'SE' }
            if (config.getStartOrEndWith(value, error.startEnd.find, error.startEnd.startEnd)) {
                showErrorTag.innerHTML = `
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                    ${error.startEnd.error}
                `;
                // showErrorTag.textContent = `${error.startEnd.error}`;
                e.target.classList.add('errorInputForm');
                showErrorTag.classList.add('error');
                error.hasError = true;
                this.obj = {
                    ...this.obj,
                    hasError: true
                };
                return true;
            }
        }
        error.hasError = false;
        this.obj = {
            ...this.obj,
            hasError: false,
            [e.target.name]: value
        };

        showErrorTag.textContent = '';
        e.target.classList.remove('errorInputForm');
        showErrorTag.classList.remove('error');
        return true;
    }

    formValidate(errorField) {
        this.errorField = errorField;
        return (e) => {
            const { name, value } = e.target;
            const element = e.target.parentElement;
            const showErrorTag = element.querySelector('.form-group-input-error');
            const values = value.trim();
            if (this.errorField[name]) {
                this.validations(this.errorField[name].regex, values, showErrorTag, e, this.errorField[name]);
                return true;
            }
        }
    }

    validationsSubmit(inputName, value, showErrorTag, e, error) {
        if (value === '' && error.required) {
            e.classList.add('errorInputForm');
            // showErrorTag.textContent = error.empty;
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.empty}
            `;
            showErrorTag.classList.add('error');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: true
            };
            return true;
        }

        if (value === '' && !error.required) {
            showErrorTag.textContent = '';
            e.classList.remove('errorInputForm');
            showErrorTag.classList.remove('error');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: false
            };
            return true;
        }

        if (error.min_length > value.length || value.length > error.max_Length) {
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.maxMin}
            `;
            // showErrorTag.textContent = `${error.maxMin}`;
            e.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: true
            };
            return true;
        }

        if (!config.Rgex()[inputName].test(value)) {
            // showErrorTag.textContent = 'Name format must be ( Category name )';
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                ${error.regexText}
            `;
            e.classList.add('errorInputForm');
            showErrorTag.classList.add('error');
            // elem.querySelector('i').classList.add('icon-checkmark-circle text-danger');
            error.hasError = true;
            this.obj = {
                ...this.obj,
                hasError: true
            };
            return true;
        }

        if (error.startEnd) {
            // : { find: '-', startEnd: 'SE' }
            if (config.getStartOrEndWith(value, error.startEnd.find, error.startEnd.startEnd)) {
                showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                    ${error.startEnd.error}
                `;
                // showErrorTag.textContent = `${error.startEnd.error}`;
                e.classList.add('errorInputForm');
                showErrorTag.classList.add('error');
                error.hasError = true;
                this.obj = {
                    ...this.obj,
                    hasError: true
                };
                return true;
            }
        }
        error.hasError = false;
        this.obj = {
            ...this.obj,
            hasError: false,
            [e.name]: value
        };

        showErrorTag.textContent = '';
        e.classList.remove('errorInputForm');
        showErrorTag.classList.remove('error');
        return true;
    }

    formValidateSubmit(e, errorField) {
        this.errorField = errorField;
        const { name, value } = e;
        const element = e.parentElement;
        const showErrorTag = element.querySelector('.form-group-input-error');
        const values = value.trim();
        if (this.errorField[name] !== undefined) {
            this.validationsSubmit(this.errorField[name].regex, values, showErrorTag, e, this.errorField[name]);
            return true;
        }
    }

    clearErrorForm() {
        document.querySelectorAll('.form-group-input-error').forEach(item => item.textContent = '');
    }

    formHasError(obj) {
        let hasErr = false;
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (element.hasError) {
                    hasErr = true;
                    break;
                }
            }
        }
        return hasErr;
    }

    validatPassword(item) {
        const password = document.querySelector('#password');
        //cpassword
        const parentN = document.querySelector('#cpassword').parentNode;
        const showErrorTag = parentN.querySelector('.form-group-input-error');
        if (password.value !== '' && item.value === '') {
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                Type your password again
            `;
            showErrorTag.classList.add('error');
            password.classList.add('errorInputForm');
            return true;
        }

        if (password.value !== '' && password.value !== item.value) {
            showErrorTag.innerHTML = `
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
                Passwords must match
            `;
            showErrorTag.classList.add('error');
            password.classList.add('errorInputForm');
            return true;
        }
        showErrorTag.innerHTML = '';
        password.classList.remove('errorInputForm');
        showErrorTag.classList.remove('error');
        return false;
    }
}