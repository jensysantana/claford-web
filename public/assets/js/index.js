document.addEventListener('DOMContentLoaded', async function() {
    new IndexAppCommon();
    new IndexApp();
    new BecomeAVendor();
    new Commons();

    document.querySelector('#signin').addEventListener('click', authorizations);

    function authorizations(e) {
        const auth = new AuthenticationLocal();
        auth.signIn(e);
    }
});

class IndexApp extends ComponentsApp {
    constructor() {
        super();
        this.sliderDealsOfTheDay = document.querySelector('.sliderDealsOfTheDay')
        this.objFetch = new FetchDataApi();
        this.loadeDealsOfTheDay();
        this.configs = new Config();
    }

    diffPrice(item) {

        let priceDescount = {
            price: 0,
            originalPrice: 0,
            savePrice: 0
        };

        const formatter = new Intl.NumberFormat('en-En', {
            style: 'currency',
            currency: 'USD',
        });

        if (item.has_offer) {

            if (item.offer[0].price_type === 'Disccount') {
                const priceItem = item.price - (item.price * item.offer[0].price / 100);
                priceDescount = {
                    price: formatter.format(priceItem),
                    originalPrice: formatter.format(item.price),
                    savePrice: item.offer[0].price.toFixed(0)
                };
            }
        } else {
            priceDescount = {
                price: formatter.format(item.price),
                originalPrice: 0,
                savePrice: 0
            };
        }
        return priceDescount;
    }

    ratings(rating) {
        const ratings = rating > 4.5 ? 5 : 4;
        let rates = '';
        for (let i = 0; i < 5; i++) {

            if (ratings >= i + 1) {
                rates += `<option value="1">${i}</option>`;
            } else {
                rates += `<option value="2">${i}</option>`;
            }
        }
        return rates;
    }

    async loadeDealsOfTheDay() {
        if (this.sliderDealsOfTheDay === null) {
            return;
        }
        const fetchDb = await this.objFetch.fetch('/products/deals-hot-today', { method: 'GET' });
        const respDb = await fetchDb.json();
        let htmlObj = '';
        respDb.data.forEach(item => {
            let priceItem = this.diffPrice(item);
            htmlObj += `
            <div class="ps-product ps-product--inner">
                <div class="ps-product__thumbnail">
                    <a href="product-default.html">
                        <img src="${this.configs.appSettings().apiAssetsImg}products/${item.category.directory}/${item.root_subcategory.directory}/${item.root_subcategory.menu_items.directory}/${item.thumbnail.name}" alt="">
                    </a>
                    <div class="ps-product__badge">${priceItem.savePrice}% off</div>
                    <ul class="ps-product__actions">
                        <li>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Read More">
                                <i class="icon-bag2"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-placement="top" title="Quick View" data-toggle="modal" data-target="#product-quickview">
                                <i class="icon-eye"></i></a>
                        </li>
                        <li>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Add to Whishlist">
                                <i class="icon-heart"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Compare">
                                <i class="icon-chart-bars"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="ps-product__container">
                    <p class="ps-product__price sale">
                        ${priceItem.price}<del>${priceItem.originalPrice}</del>
                    </p>
                    <div class="ps-product__content">
                        <a class="ps-product__title" href="product-default.html">${item.title}</a>
                        <div class="ps-product__rating">
                        <select class="ps-rating" data-read-only="true">
                            ${this.ratings(item.reviews[0].totalReviews / item.reviews[0].totalReviewers)}
                        </select><span>${item.reviews[0].totalReviewers}</span>
                    </div>
                        <div class="ps-product__progress-bar ps-progress" data-value="${(item.stock + item.sold) - item.sold > 100 ? 100 : (item.stock + item.sold) - item.sold}">
                            <div class="ps-progress__value"><span></span></div>
                            <p>Sold: ${item.sold}</p>
                        </div>
                    </div>
                </div>
                </div>
            `;
        });
        this.sliderDealsOfTheDay.innerHTML = this.sliderComponent({}, htmlObj);
    }


}

class IndexAppCommon {
    constructor() {
        this.objFetch = new FetchDataApi();
        this.loadCategories();
    }

    async loadCategories() {
        const navCategories = document.querySelectorAll('.web-categories');
        const fetchDb = await this.objFetch.fetch('/categories', { method: 'GET' });
        const respDb = await fetchDb.json();

        navCategories.forEach(item => {
            item.innerHTML = this.webCategories(respDb.data);
        });
        // catMobile.forEach(item => {
        //     item.innerHTML = mobileCategories(data.data);
        // });
    }

    webCategories(array) {
        let cats = '';
        array.forEach((item) => {
            // web categories
            cats += `
        <li class="menu-item-has-children has-mega-menu">
            <a href="#"><i class=${item.icon}></i>${item.title}</a>`;
            if (item.subCategories.length > 0) {
                // web subcategories
                cats += `<div class="mega-menu">`;
                for (const iterator of item.subCategories) {
                    cats += `<div class="mega-menu__column">
                    <h4>${iterator.heading}<span class="sub-toggle"></span></h4>
                    <ul class="mega-menu__list">`;
                    for (const subItem of iterator.menu_items) {
                        cats += `<li><a href="#">${subItem.text}</a></li>`;
                    }
                    cats += `</ul></div>`;
                }
                cats += `</div>`;
            }
            cats += `</li>`;
        });
        return cats;
    }


}


class CookiesOp {
    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // setCookie("user_email","bobthegreat@gmail.com",30); //set "user_email" cookie, expires in 30 days
    // var userEmail=getCookie("user_email");//"bobthegreat@gmail.com"
}

class LocalStorageOp {

    setStorage(key, data) {
        localStorage.setItem(key, data);
    }

}

// VENDOR
class BecomeAVendor {
    constructor() {
        this.selling = document.querySelectorAll('.selling');
        this.startSelling();
    }

    startSelling() {
        $('.selling').click(async function() {
            // if user is signin
            if (1) {
                //if user has store allready:take user to his store
                if (1) {
                    window.location.href = '/store/new-store';
                } else {
                    //if user has store allready:take user to his store
                    window.location.href = '/store?store=jensysantana store';
                }
            } else {
                // user need to be signin and send parameter to redirect user to create store
            }

        });
    }
}

// COMMONS
class Commons {
    constructor() {
        this.configs = new Config();
        this.changeSaleOn();
    }
    changeSaleOn() {
        const saleOn = document.querySelectorAll('.sellon');
        if (saleOn) {
            saleOn.forEach(item => {
                item.textContent = `Sell on ${this.configs.appSettings().appName}`;
            });
        }
    }
}

class UrlOperations {
    getParam(param) {
        return new URLSearchParams(window.location.search).get(param);
    }
}

//AUTHENTICATIONS

class AuthenticationLocal { //change to 
    constructor() {
        // this.authHTML = document.querySelector('auth');
        this.signIn();
    }

    isAuth = () => {
        return false;
    }
    signIn(e) {
        // console.log('---------e---------');
        // console.log(e);
        // console.log(this.isAuth());
        // console.log('---------e---------');
        // if (this.isAuth()) {
        //     window.location.href = '/';
        //     return false;
        // }
        // window.location.href = '/auth';
    }

    emailFormaterRecovery(email, param) {

        let userName = '';
        if (param) {
            const indexAt = email.lastIndexOf(param);
            userName = email.slice(0, indexAt);
            const userEmailHost = email.slice(indexAt);

            userName = `${userName.charAt(0)}***${userName.charAt(userName.length-1)}${userEmailHost}`;
        } else {

            userName = email;
            return `${userName.charAt(0)}***${userName.charAt(userName.length-1)}`;
        }

        return userName;
    }
}