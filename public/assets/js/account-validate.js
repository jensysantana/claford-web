document.addEventListener('DOMContentLoaded', async function() {
    class AccountValidation extends ComponentsApp {

    }
    const accountValidate = new AccountValidation();
    const showContent = document.querySelector('#alertShow');

    const params = location.search;
    const searchParams = new URLSearchParams(params);
    if (searchParams.get('tcv')) {

        try {
            const superdata = new Authentication();
            const resp = await superdata.accountValidate({ data: JSON.stringify({ token: searchParams.get('tcv') }) });
            if (resp.status === 200) {
                showContent.innerHTML = accountValidate.successComponent({
                    // headerH2: 'Account has been create successfuly',
                    headerH2: `${resp.data.message}`,
                    isSuccess: true,
                    // headerHtml: `<span class="">sub header text</span>`,
                    // <p class="text-info mb-2">jensysantana@emil.com</p>
                    // <div class="message mb-3"> ${error.response.data.message}</div>
                    content: `
                        <p class="thanks">Thank, for your account.</p>
                        <p class="web-page mt-2"><a href="/auth/sign-in" class="text-primary">Sing in</a> to your account now</p>
                        <a class="text-primary" href=""><span class="mt-2 d-block">${config.appSettings().appDomain}</span></a>
                    `
                });
            }
            if (resp.status === 201) {
                showContent.innerHTML = accountValidate.successComponent({
                    // headerH2: 'Account has been create successfuly',
                    headerH2: `${resp.data.message}`,
                    isSuccess: true,
                    // headerHtml: `<span class="">sub header text</span>`,
                    // <p class="text-info mb-2">jensysantana@emil.com</p>
                    // <div class="message mb-3"> ${error.response.data.message}</div>
                    content: `
                        <p class="thanks">Thank, for your account.</p>
                        <a class="text-primary" href=""><span class="mt-2 d-block">${config.appSettings().appDomain}</span></a>
                    `
                });
                setTimeout(() => {
                    if (resp.data.hasOwnProperty('redirectTo')) {
                        window.location.href = resp.data.redirectTo;
                    }
                }, 180000);

                clearTimeout();
            }
        } catch (error) {
            if (error.response.data.message) {
                showContent.innerHTML = accountValidate.successComponent({
                    // headerH2: 'Account has been create successfuly',
                    headerH2: `${error.response.data.message}`,
                    isSuccess: false,
                    // headerHtml: `<span class="">sub header text</span>`,
                    // <p class="text-info mb-2">jensysantana@emil.com</p>
                    // <div class="message mb-3"> ${error.response.data.message}</div>
                    content: `
                        <p class="thanks">Account verification fail </p>
                        <a class="text-primary" href=""><span class="mt-2 d-block">${config.appSettings().appDomain}</span></a>
                        <p class="web-page mt-2"></p>
                    `
                });
            }
        }
    } else {
        window.location.href = '/';
    }
});