// console.log('---------moment---------');
// let d = new Date();
// d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
// console.log(moment('2021-02-09T03:39:06.126Z').format('LLL'));
// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
// console.log(moment().format('LLL'));
// console.log(moment().isSame(new Date('LLL')));
// console.log(Date.now());
// console.log(moment(1612730013415).format('LLL'));
// console.log(new Date());
// let dateDB = moment("2021-02-07T07:39:46.834Z");
// let newDate = moment();
// console.log(dateDB);
// console.log(newDate);
// const difDate = moment.duration(newDate.diff(dateDB)).asHours();
// console.log(difDate);
// console.log(moment("2021-02-07T07:39:46.834Z").format());
// console.log('---------moment---------');

document.addEventListener('DOMContentLoaded', async function() {
    const formObj = document.getElementById('signInForm');
    const alertShow = document.getElementById('alertShow');
    const inputs = formObj.querySelectorAll('#signInForm input');
    /*
    <a href="javascript:void(0)" id="borrar">borrar</a>
    const borrar = formObj.querySelector('#borrar');
    borrar.addEventListener('click', async(e) => {
        e.preventDefault();
        const superdata = new Authentication();
        axios.defaults.withCredentials = true;
        console.log('---------e---------');
        console.log(e);
        console.log('---------e---------');

        try {
            const resp = await superdata.reFreshToken({
                data: { href: '/auth/sign-up' },
            });
            console.log('---------resp---------');
            console.log(resp.response.data);
            console.log('---------resp---------');
        } catch (error) {
            console.log('---------error---------');
            console.log(error.response.data);
            console.log('---------error---------');
        }

    });
    */

    class AuthForm extends FormValidator {
        constructor(obj, errorField) {
            super(obj, errorField);
        }
    }

    const obj = {
        email: '',
        password: '',
        hasError: true
    }

    const errorField = {
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
        password: {
            fieldName: 'password',
            regexText: `Sorry, password must contain (., -, _), numbers, lower and uppercase letters`,
            regex: 'password',
            empty: 'Enter your password',
            required: true,
            max_Length: 30,
            min_length: 2,
            maxMin: 'Sorry, password must be between 8 and 32 characters',
            hasError: true
        },

    }

    // const localAddClassPassword = (errorField, errorPass) => {
    //     if (errorField.password.hasError && !errorPass) {
    //         errorPass = true;
    //         document.getElementById('passMargin').classList.add('passMargin');
    //     } else {
    //         document.getElementById('passMargin').classList.remove('passMargin');
    //     }
    // }
    const fVaidator = new AuthForm(obj, errorField);
    inputs.forEach(item => {
        item.addEventListener('blur', function(e) {
            fVaidator.formValidate(errorField)(e);
            // localAddClassPassword(errorField, errorPass);
        });
    });

    formObj.addEventListener('submit', async(e) => {
        e.preventDefault();
        //Search for auth type: SignIn or SignUp
        // console.log('---------hasActive---------');
        // console.log(hasActive);
        // console.log('---------hasActive---------');
        // passMargin
        const fVaidator = new AuthForm(obj, errorField);
        // inputs.forEach(item => {
        //     item.addEventListener('blur', fVaidator.formValidate(errorField));
        // });
        const formInputs = e.target.querySelectorAll('#signInForm input');
        formInputs.forEach(item => {
            // item.addEventListener('keyup', formValidate);
            fVaidator.formValidateSubmit(item, errorField);

        });

        if (!fVaidator.obj.hasError) {
            //send request
            const superdata = new Authentication();
            axios.defaults.withCredentials = true;
            try {
                delete fVaidator.obj.hasError;
                const resp = await superdata.signIn({
                    data: fVaidator.obj,
                });

                if (resp.status === 200 || resp.status === 201 || resp.status === 202) {
                    const setsTorage = new LocalStorageOp();
                    setsTorage.setStorage("__UDI", `${resp.data.userInfo}`); //user data info
                    setsTorage.setStorage("__AUTHBYPASS__", '200OK'); //user data info

                    if (resp.data.message !== '') {
                        alertShow.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show mt-5" role="alert">
                            ${resp.data.message}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `;
                        setTimeout(() => {
                            alertShow.innerHTML = '';
                        }, 180000);
                        clearTimeout();
                    } else {
                        alertShow.innerHTML = '';
                    }

                    //clean form
                    formObj.reset();
                    fVaidator.clearErrorForm();
                    const URLOpts = new UrlOperations();
                    window.location.href = URLOpts.getParam('to') || '/';
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
                setTimeout(() => {
                    alertShow.innerHTML = '';
                }, 180000);
                clearTimeout();
            }
        }
    });
});