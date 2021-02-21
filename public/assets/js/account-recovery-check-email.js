document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('btn-RsendEmalAcc').addEventListener('click', async(e) => {
        e.preventDefault();
        const URLOpts = new UrlOperations();
        const baseEmail = URLOpts.getParam('uaid');
        const decodedEmail = JSON.parse(atob(baseEmail));
        //validate email
        try {
            //send to db
            //send request
            const superdata = new Authentication();
            // axios.defaults.withCredentials = true;
            try {
                if (decodedEmail) {
                    const resp = await superdata.forgotAccountPassword({
                        data: { email: decodedEmail.email },
                    });

                    if (resp.status === 200) {
                        //show feedback

                    }
                } else {
                    //show error feedback

                }
            } catch (error) {
                document.querySelector('.form-group-input-error').textContent = `${error.response.data.message}`;
            }

        } catch (error) {

        }
    });
});

class RecoverAccountFedBack extends AuthenticationLocal {
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