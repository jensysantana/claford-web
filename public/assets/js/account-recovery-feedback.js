document.addEventListener('DOMContentLoaded', async function() {
    const submtit = document.querySelectorAll('.submtit');
    const showHtml = document.querySelector('#htmlEmailPass');

    const URLOpts = new UrlOperations();
    const baseEmail = URLOpts.getParam('uaid');

    const decodedEmail = JSON.parse(atob(baseEmail));
    const accRecover = new AuthenticationLocal();
    let htmlEmailPass = '';
    for (const key in decodedEmail) {
        if (Object.hasOwnProperty.call(decodedEmail, key)) {

            const element = decodedEmail[key];
            if (element) {

                if (key === 'email') {

                    htmlEmailPass += `
                        <div class="contact-type">
                            <h2>Email</h2>
                                <p class="text-success">Recovery email sent to ${accRecover.emailFormaterRecovery(element, '@')} with a link.</p>
                            </div>
                            <div class="form-group submtit mt-4 submtit-btn">
                                <a href="/auth/recovery-check-email?uaid=${baseEmail}" class="ps-btn ps-btn--fullwidth" id="btn-navigate-">I don't know where is the email</a>
                            </div>
                        </div>
                        
                        <p class="${decodedEmail.phone ? '' : 'd-none'}">Have issue with your email? <a id="have-isseue" href="javascript:void(0)" class="text-primary">Recover with phone number.</a></p>
                    `;
                }
                // /auth/recovery-mobile?uaid=${decodedEmail}
                // /auth/recovery - check - email ? uaid = $ { baseEmail }
                if (key === 'phone') {

                    htmlEmailPass += `
                        <div class="contact-type d-none notShow">
                            <h2>Phone</h2>
                            <p class="text-success">Well, send recovery text message at ${accRecover.emailFormaterRecovery(element, '')}</p>
                        </div>
                        <div class="form-group submtit mt-4 submtit-btn d-none notShow">
                            <a href="javascript:void(0)" class="ps-btn ps-btn--fullwidth" id="btn-recover-by-phone">Recover account with phone number</a>
                        </div>
                        <p id="showErrorCode" class="text-danger"></p>
                    `;
                }
            }
        }
    }
    showHtml.innerHTML = htmlEmailPass;
    // emailSentTo.textContent = `Email sent to ${accRecover.emailFormaterRecovery(decodedEmail, 'param')} with a link.`;

    document.querySelector('#have-isseue').addEventListener('click', e => {
        // /auth/recovery - check - email ? uaid = $ { baseEmail }
        e.target.parentNode.classList.add('d-none');
        document.querySelectorAll('.notShow').forEach(item => {
            item.classList.remove('d-none')
        });
    });

    const hasPhone = document.querySelector('#btn-recover-by-phone');

    if (hasPhone) {
        hasPhone.addEventListener('click', async(e) => {
            e.preventDefault();
            // /auth/recovery - check - email ? uaid = $ { baseEmail }
            //verify phone account user
            const config = new Config();
            const emailTest = decodedEmail.email;
            const emailPhone = decodedEmail.phone;

            if (!emailTest || !config.Rgex().email.test(emailTest)) {
                // show message
                return;
            }
            if (!emailPhone || !config.Rgex().phone.test(emailPhone)) {
                // show message
                return;
            }

            const showErrorCode = document.querySelector('#showErrorCode');
            try {

                const superdata = new RecoverAccountFeedBack();
                const resp = await superdata.accRecIsUserPhone({
                    data: baseEmail,
                });

                //clean message
                showErrorCode.textContent = '';
                window.location.href = `/auth/recovery-phone-code?uaid=${resp.data.response}`;
            } catch (error) {
                showErrorCode.textContent = error.response.data.message;
            }
        });
    }
});

class RecoverAccountFeedBack extends Authentication {
    constructor() {
        super();
    }

    checkEmail() {
        // axios.defaults.withCredentials = true;
        // try {

        //     // const resp = await superdata.forgotAccountPassword({

        //     //     data: fVaidator.obj,
        //     // });

        //     if (resp.status === 200) {

        //         if (resp.data.message !== '') {
        //             // alertShow.innerHTML = `
        //             // <div class="alert alert-success alert-dismissible fade show mt-5" role="alert">
        //             //     ${resp.data.message}
        //             //     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        //             //     <span aria-hidden="true">&times;</span>
        //             //     </button>
        //             // </div>
        //             // `;
        //             // setTimeout(() => {
        //             //     alertShow.innerHTML = '';
        //             // }, 180000);
        //             // clearTimeout();
        //         } else {
        //             // alertShow.innerHTML = '';
        //         }
        //     }
        // } catch (error) {
        //     document.querySelector('.form-group-input-error').textContent = `${error.response.data.message}`;
        // }
    }
}