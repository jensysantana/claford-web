document.addEventListener('DOMContentLoaded', async function() {
    const superdata = new Authentication();
    const formObj = document.getElementById('authForm');
    const alertShow = document.getElementById('alertShow');
    const inputs = formObj.querySelectorAll('#authForm input');

    formObj.querySelector('#google-sign-up').addEventListener('click', async function(e) {
        e.preventDefault();

        try {
            const resp = await superdata.googleSignUp({ data: { name: 'jejnkdjdks' } });
            console.log('---------resp---------');
            console.log(resp);
            console.log('---------resp---------');

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
            }
        } catch (error) {
            console.log('---------error---------');
            console.log(error.response.data);
            console.log('---------error---------');
            alertShow.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show mt-5" role="alert">
                <strong>Oops!</strong> ${error.response.data.message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `;
        }
    })

    class AuthForm extends FormValidator {
        constructor(obj, errorField) {
            super(obj, errorField);
        }
    }

    let obj = {
        email: '',
        fname: '',
        lname: '',
        password: '',
        hasError: true
    }

    let errorField = {
        email: {
            fieldName: 'email',
            regexText: `Sorry, your email is not valid or email format is not allowed.`,
            regex: 'email',
            empty: 'Enter a valid email address',
            required: true,
            max_Length: 64,
            min_length: 7,
            maxMin: 'Sorry, email must be between 7 and 64 characters',
            hasError: true
        },
        fname: {
            fieldName: 'fname',
            regexText: `Sorry, First name containe invalid characters.`,
            regex: 'alphaNumSpace',
            empty: 'Enter your first name',
            required: true,
            max_Length: 45,
            min_length: 1,
            maxMin: 'must be between 1 to 45 characters.',
            hasError: true,
        },
        lname: {
            fieldName: 'lname',
            regexText: `Sorry, Last name containe invalid characters.`,
            regex: 'alphaNumSpace',
            empty: 'Enter your last name',
            required: true,
            max_Length: 45,
            min_length: 1,
            maxMin: 'must be between 1 to 45 characters.',
            hasError: true,
        },
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
                console.log("🚀 ~ file: auth-sign-up.js ~ line 104 ~ formObj.querySelector ~ error", error)
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
        const formInputs = e.target.querySelectorAll('#authForm input');
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
            try {
                const resp = await superdata.signUp({ data: JSON.stringify(fVaidator.obj) });
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
                    <strong>Oops!</strong> ${error.response.data.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }
        }
    });
});