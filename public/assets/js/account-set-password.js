document.addEventListener('DOMContentLoaded', async function() {

    const formObj = document.getElementById('authResetPass');
    const alertShow = document.getElementById('alertShow');
    const inputs = formObj.querySelectorAll('#authResetPass input');

    const URLOpts = new UrlOperations();
    let baseParam = URLOpts.getParam('uaid');
    let decodedParam = null;
    if (!baseParam) {
        baseParam = URLOpts.getParam('uaidt');
        decodedParam = {
            email: JSON.parse(atob(baseParam.split('.')[1])).user.email,
            tk: baseParam
        }
    } else {
        decodedParam = JSON.parse(atob(baseParam));
    }
    const { code, email, phone } = decodedParam;
    let hasPhoneCode = false;

    if (!email) {
        document.getElementById('btnPhoneCode').disabled = true;
        window.location.href = `/auth/sign-in`
    }

    if (phone && code) {
        hasPhoneCode = true;
    }

    class AuthForm extends FormValidator {
        constructor(obj, errorField) {
            super(obj, errorField);
        }
    }

    let obj = {
        password: '',
        hasError: true
    }

    let errorField = {
        password: {
            fieldName: 'password',
            regexText: `Sorry, password must contain (., -, _), numbers, lower and uppercase letters`,
            regex: 'password',
            empty: 'Enter your password',
            required: true,
            max_Length: 30,
            min_length: 8,
            maxMin: 'Sorry, password must be between 8 and 32 characters',
            hasError: true,
        },
    }

    const fVaidator = new AuthForm(obj, errorField);
    inputs.forEach(item => {
        item.addEventListener('blur', (e) => {
            fVaidator.formValidate(errorField)(e);

            if (item.name === 'cpassword') {
                if (fVaidator.validatPassword(item)) {
                    // fVaidator.errorField.cpassword.hasError = false;
                    fVaidator.errorField.cpassword = {
                        cpassword: document.querySelector('#cpassword').value,
                        regex: 'password',
                        hasError: true
                    };
                } else {
                    fVaidator.errorField.cpassword = {
                        cpassword: document.querySelector('#cpassword').value,
                        regex: 'password',
                        hasError: false
                    };
                }
            }
        });
    });

    formObj.addEventListener('submit', async(e) => {
        e.preventDefault();
        const fVaidator = new AuthForm(obj, errorField);
        const formInputs = e.target.querySelectorAll('#authResetPass input');
        let cPass = {};
        formInputs.forEach(item => {
            fVaidator.formValidateSubmit(item, errorField);
            if (item.name === 'cpassword') {
                cPass = item;
            }
        });

        if (fVaidator.validatPassword(cPass)) {
            // fVaidator.errorField.cpassword.hasError = false;
            fVaidator.errorField.cpassword = {
                cpassword: document.querySelector('#cpassword').value,
                regex: 'password',
                hasError: true
            };
        } else {
            fVaidator.errorField.cpassword = {
                cpassword: document.querySelector('#cpassword').value,
                regex: 'password',
                hasError: false
            };
        }
        const hasErr = fVaidator.formHasError(fVaidator.errorField);
        if (!hasErr) {
            //send request
            const superdata = new Authentication();
            try {
                let resp = null;
                //set from phone code
                resp = await superdata.resetPasswordRecovery({
                    data: {
                        password: fVaidator.obj.password,
                        ...decodedParam,
                    }
                });

                console.log('---------hasPhoneCode---------');
                console.log(resp);
                console.log('---------hasPhoneCode---------');


                if (resp.status === 200) {
                    alertShow.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show mt-5" role="alert">
                        ${resp.data.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `;
                    //clean form
                    formObj.reset();
                    fVaidator.clearErrorForm();
                }
            } catch (error) {
                alertShow.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show mt-5" role="alert">
                    ${error.response.data.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }
        }
    });
});