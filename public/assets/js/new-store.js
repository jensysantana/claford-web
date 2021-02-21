document.addEventListener('DOMContentLoaded', async function() {
    const formObj = document.getElementById('formStore');

    if (formObj) {
        const alertShow = document.getElementById('alertShow');
        const inputs = formObj.querySelectorAll('#formStore input, textarea, select');

        class StoreForm extends FormValidator {

            constructor(obj, errorField) {
                super(obj, errorField);
            }

            printx() {
                this.prints();
            }

        }

        let obj = {
            seller_type: '',
            store_name: '',
            icon: '',
            description: '',
            hasError: true
        }

        let errorField = {

            seller_type: {
                fieldName: 'seller_type',
                regexText: `Sorry, only letters (a-z and spaces) are allowed.`,
                regex: 'name',
                maxMin: 'Sorry, category name must be between 2 and 30 characters',
                empty: 'Name is required',
                required: true,
                max_Length: 30,
                min_length: 2,
            },
            store_name: {
                fieldName: 'store_name',
                regexText: `Sorry, only letters (a-z and spaces) are allowed.`,
                regex: 'name',
                maxMin: 'Sorry, category name must be between 2 and 30 characters',
                empty: 'Name is required',
                required: true,
                max_Length: 30,
                min_length: 2,
            },
            icon: {
                fieldName: 'icon',
                regexText: `Sorry, only letters (a-z and dashes) are allowed.`,
                regex: 'name_dashes',
                maxMin: 'Sorry, icon name must be between 4 and 30 characters',
                empty: 'Icon is required',
                required: true,
                max_Length: 30,
                min_length: 4,
                startEnd: { find: '-', startEnd: 'SE', error: 'Sorry, Icon name can not start or end with (-)' }
            },
            description: {
                fieldName: 'description',
                regexText: `Sorry, only letters (a-z and spaces) are allowed.`,
                regex: 'description',
                maxMin: 'Sorry, description must be between 10 and 255 characters',
                empty: 'Description is required',
                required: false,
                max_Length: 255,
                min_length: 10,
            }
        }

        // const config = new Config();
        const fVaidator = new StoreForm(obj, errorField);
        inputs.forEach(item => {
            // item.addEventListener('keyup', formValidate);
            item.addEventListener('blur', fVaidator.formValidate(errorField));
            // item.addEventListener('change', fVaidator.formValidate(errorField));
        });

        formObj.addEventListener('submit', (e) => {
            e.preventDefault();

            const formInputs = e.target.querySelectorAll('#formStore input, textarea');
            formInputs.forEach(item => {
                // item.addEventListener('keyup', formValidate);
                fVaidator.formValidateSubmit(item, errorField);
            });

            if (!fVaidator.obj.hasError) {
                //send request
                const objFetch = new FetchDataApi();
                objFetch
                    .fetch(
                        '/api/v1/categories/new-category', {
                            method: 'POST',
                            body: JSON.stringify(fVaidator.obj),
                            // mode: 'cors',
                            headers: new Headers({
                                'Content-type': 'application/json'
                            })
                        })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.success) {
                            alertShow.innerHTML = `
                            <div class="alert alert-success alert-dismissible fade show mt-5" role="alert">
                                ${data.message}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            `;
                            //clean form
                            formCategory.reset();

                        } else {
                            console.log(3, 6653);
                            // alertShow.textContent = 'kksjdbskjbldbjsldjksd';
                            alertShow.innerHTML = `
                            <div class="alert alert-warning alert-dismissible fade show mt-5" role="alert">
                                <strong>Oops!</strong> ${data.message}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            `;
                        }
                    });
            }
        });
    }
});