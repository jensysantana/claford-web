document.addEventListener('DOMContentLoaded', async function() {
    const formObj = document.getElementById('forGotPass');
    // const alertShow = document.getElementById('alertShow');
    const inputs = formObj.querySelectorAll('#forGotPass input');
    const psFormContent = document.getElementById('psFormContent');
    psFormContent.innerHTML = `
        <div class="ps-form__content">
            <h4>Password assistance</h4>
            <p class="mt-3">Enter the email address associated with your ${config.appSettings().appName} account.</p>
            <div class="form-group mt-4">
                <label for="email" class="mb-2">Email</label>
                <input class="form-control" type="text" value="jensysantana@gmail.co" name="email" id="email">
                <p class="form-group-input-error text-danger"></p>
            </div>
            <div class="form-group submtit">
                <button class="ps-btn ps-btn--fullwidth" id="btnValidateByEMail">Next</button>
            </div>
        </div>
    `;

    // <p>Have issue with your email? <a href="/auth/recovery-mobile?uaid={decodedEmail}" class="text-primary">Recover with phone number.</a></p>
    class AccountRecoveryForm extends FormValidator {
        constructor(obj, errorField) {
            super(obj, errorField);
        }
    }

    const obj = {
        email: '',
        hasError: true
    }

    const errorField = {
        email: {
            fieldName: 'email',
            regexText: `Sorry, email is not valid.`,
            regex: 'email',
            empty: 'Enter a valid email.',
            required: true,
            max_Length: 64,
            min_length: 7,
            maxMin: 'Sorry, enter a valid email.',
            hasError: true
        },
    }

    const fVaidator = new AccountRecoveryForm(obj, errorField);
    inputs.forEach(item => {
        item.addEventListener('blur', fVaidator.formValidate(errorField));
    });

    formObj.addEventListener('submit', async(e) => {
        e.preventDefault();
        //Search for auth type: SignIn or SignUp
        const fVaidator = new AccountRecoveryForm(obj, errorField);
        // inputs.forEach(item => {
        //     item.addEventListener('blur', fVaidator.formValidate(errorField));
        // });
        const formInputs = e.target.querySelectorAll('#forGotPass input');
        formInputs.forEach(item => {
            fVaidator.formValidateSubmit(item, errorField);
        });

        try {
            if (!fVaidator.obj.hasError) {
                //send request
                const superdata = new Authentication();
                // axios.defaults.withCredentials = true;
                delete fVaidator.obj.hasError;
                const resp = await superdata.forgotAccountPassword({
                    data: fVaidator.obj,
                });

                if (resp.status === 200) {
                    //clean form
                    formObj.reset();
                    fVaidator.clearErrorForm();
                    // console.log('---------resp.response.data---------');
                    // console.log(resp);
                    // console.log('---------resp.response.data---------');
                    window.location.href = `/auth/recovery-feedback?uaid=${resp.data.response}`
                }
            }
        } catch (error) {
            document.querySelector('.form-group-input-error').textContent = `${error.response.data.message}`;
        }
    });
});