document.addEventListener('DOMContentLoaded', async function(e) {
    e.preventDefault();
    const formObj = document.getElementById('recPhoneCode');
    // const alertShow = document.getElementById('alertShow');
    const psFormContent = document.getElementById('psFormContent');
    psFormContent.innerHTML = `
        <div class="ps-form__content">
            <h4>Password assistance</h4>
            <p class="mt-3">Enter the OPT code associated with your ${config.appSettings().appName} account.</p>
            <div class="form-group mt-4">
                <input class="form-control" type="text" placeholder="code" name="otpCode" id="otpCode">
                <p class="form-group-input-error text-danger"></p>
            </div>
            <div class="form-group submtit">
                <button class="ps-btn ps-btn--fullwidth" id="btnPhoneCode">Next</button>
            </div>
        </div>
    `;

    // <p>Have issue with your email? <a href="/auth/recovery-mobile?uaid={decodedEmail}" class="text-primary">Recover with phone number.</a></p>
    class AccountRecFromPhone extends FormValidator {
        constructor(obj, errorField) {
            super(obj, errorField);
        }
    }

    const obj = {
        otpCode: '',
        hasError: true
    }

    const errorField = {
        otpCode: {
            fieldName: 'otpCode',
            regexText: `Sorry, code is not valid.`,
            regex: 'number',
            empty: 'Enter a valid code.',
            required: true,
            max_Length: 6,
            min_length: 6,
            maxMin: 'Sorry, code must be 6 characters.',
            hasError: true
        },
    }
    const URLOpts = new UrlOperations();
    const baseParam = URLOpts.getParam('uaid');
    const decodedParam = JSON.parse(atob(baseParam));

    const { code, email, phone } = decodedParam;
    if (!code || !email || !phone) {
        document.getElementById('btnPhoneCode').disabled = true;
        window.location.href = `/auth/sign-in`
    }

    formObj.addEventListener('submit', async(e) => {
        e.preventDefault();
        //Search for auth type: SignIn or SignUp
        const fVaidator = new AccountRecFromPhone(obj, errorField);
        const formInputs = e.target.querySelectorAll('#recPhoneCode input');
        formInputs.forEach(item => {
            fVaidator.formValidateSubmit(item, errorField);
        });
        const showErr = document.querySelector('.form-group-input-error');
        if (!fVaidator.obj.hasError && code === fVaidator.obj.otpCode) {
            showErr.textContent = '';
            window.location.href = `/auth/set-password?uaid=${baseParam}`;
        } else {
            showErr.textContent = 'Invalid validation code';
        }
    });
});