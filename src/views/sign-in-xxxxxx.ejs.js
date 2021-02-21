import React, { Fragment, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom';
import AuthSectionRight from '../auth-section-right/auth-section-right';

// import LoaddingOverContent from '../../../components/loadding-over-content/loadding-over-content';
// import PropTypes from 'prop-types'
// import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Alert from '../../../components/alert/alert';
import { Formik, Field, ErrorMessage } from 'formik';
import { authSignInAction, authAccountIslogedAction } from '../../../redux/actions/authentications/authentications';
import { AuthValidation } from '../../../validations/auth/signup-validations';
import GlobalHelper from '../../../helpers/global-helper/global-helper';

const getRememberMe = () => {
    const helpers = new GlobalHelper();
    return helpers.syncLocalStorageCoder('__reme', 'get', null);
}
const respRememberaMe = getRememberMe();
// console.log("respRememberaMe", respRememberaMe)
const SignIn = props => {

    // const [isLoadding, setIsLoadding] = useState(() => true);
    // const [state, setState] = useState(() => {
    //     return {
    //         email: '',
    //         password: '',
    //         rememberme: true
    //     }
    // })

    const [controlShowAlert, setControlShowAlert] = useState(() => {
        return {
            show: false,
            text: `Sorry we cannot complete your request.`,
            color: "alert-info",
            closer: false,
        }
    })
    const alertClose = () => {
        setControlShowAlert({
            ...controlShowAlert,
            show: false
        })
    }
    const dispatch = useDispatch();
    // const productDb = useSelector(state => {
    //     // const product = state.fetchProductByIdData.product.product;
    //     // let trnsf = {}
    //     // if (product) {
    //     //     trnsf = JSON.parse(product?.data);
    //     //     // console.log('---------state.state 1111---------');
    //     //     // // console.log(state);
    //     //     // console.log(trnsf);
    //     //     // console.log('---------state.state 2222---------');
    //     // }
    //     // return {
    //     //     product: trnsf
    //     // }
    //     return state
    // });

    // const dispatch = useDispatch();

    // const refControl = useRef(null)
    const initApp = useCallback(() => {
        // const respRemeberaMe = getRememberMe();
        // setState(st=>{
        //     return{
        //         ...st,
        //         email:'jensysantana@gmail.com',
        //         password:'',
        //         rememberme:true
        //     }
        // })
        // if (!refControl.current) {
        //     refControl.current = true;
        // }

    }, [])

    useEffect(() => {

        // if (!refControl.current) {
        //     refControl.current = true;
        // }

        // const rememb = () => {
        //     const respRemeberaMe = getRememberMe();
        //     console.log("respRemeberaMe******", respRemeberaMe);
        //     setState(st=>{
        //         return{
        //             ...st,
        //             email:'jensysantana@gmail.com',
        //             password:'',
        //             rememberme:true
        //         }
        //     })
        // }
        // rememb();

        initApp()
    }, [initApp])

    // const rememberme = e => async (values) => {
    //     const { checked } = e.target;
    //     // console.log('---------e---------');
    //     // console.log(e);
    //     // console.log(values);
    //     // console.log('---------e---------');
    // }

    return (
        <Fragment>
            <div className="ps-page--my-account error-top">
                <div className="ps-my-account-2">
                    <div className="container">
                        <div className="ps-section__wrapper">
                            <div className="ps-section__left">
                                {/* {isLoadding && <LoaddingOverContent text={<p>Please waint...</p>} />} */}
                                {controlShowAlert.show &&
                                    <section className="content-header mb-3">
                                        <Alert {...controlShowAlert} onClick={alertClose} />
                                    </section>
                                }

                                <Formik
                                    validationSchema={AuthValidation('login')}
                                    initialValues={{
                                        email: respRememberaMe !== null ? respRememberaMe : '',
                                        password: 'Jensy123',
                                        rememberme: true
                                    }}
                                >
                                    {({ values, setValues, isValid, isSubmitting }) => {


                                        return (
                                            <form className="ps-form--account ps-tab-root"
                                                onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    try {
                                                        const { email, password } = values;
                                                        const helpers = new GlobalHelper();
                                                        // const respRem = await helpers.syncLocalStorageCoder('__reme', 'set', email);
                                                        // console.log("values", values)
                                                        if (email !== '' && password !== '' && isValid) {
                                                            const respSignIn = await dispatch(authSignInAction(JSON.stringify({ email, password })));
                                                            
                                                            if (respSignIn.signIn?.data) {
                                                                const dataUser = JSON.parse(respSignIn.signIn?.data);
                                                                const { newToken, redirectTo } = dataUser;
                                                                const respToken = await helpers.getPayloadOrSetToken(newToken, 'set');
                                                                // console.log("respToken", respToken)
                                                                if (respToken) {
                                                                    // const respPayload = await helpers.getPayloadOrSetToken(newToken, 'getUser');
                                                                    // console.log("respPayload", respPayload)
                                                                    // dispatch isLoginValid
                                                                    await dispatch(authAccountIslogedAction(true));
                                                                    
                                                                    const respRem = await helpers.syncLocalStorageCoder('__reme', 'get', null);
                                                                    if (respRem !== null || values.rememberme) {
                                                                        await helpers.syncLocalStorageCoder('__reme', 'set', email);
                                                                    }
                                                                    // window.open("account", "_top")
                                                                    window.location.href = redirectTo;
                                                                }
                                                                return;
                                                            }
                                                            setControlShowAlert(alertx => {
                                                                return {
                                                                    ...alertx,
                                                                    text: respSignIn.signIn?.data?.message || alertx.text,
                                                                    show: true,
                                                                    color: 'alert-warning text-center'
                                                                }
                                                            });

                                                        }

                                                    } catch (error) {
                                                        // console.log("error", error)
                                                        if (error?.response?.data?.message) {
                                                            setControlShowAlert(alertx => {
                                                                return {
                                                                    ...alertx,
                                                                    text: error?.response?.data?.message || alertx.text,
                                                                    show: true,
                                                                    color: 'alert-warning text-center'
                                                                }
                                                            });
                                                        }
                                                    }
                                                }}
                                            >
                                                <ul className="ps-tab-list">
                                                    <li className="active">
                                                        {/* // eslint-desable-next-line */}
                                                        <a onClick={(e) => {
                                                            e.preventDefault();
                                                            window.location.href = '/sign-in'
                                                        }} href="#sign-in">Login</a>
                                                    </li>
                                                    <li>
                                                        {/* // eslint-desable-next-line */}
                                                        <a onClick={(e) => {
                                                            e.preventDefault();
                                                            window.location.href = '/sign-up'
                                                        }} href="#register">Register</a>
                                                    </li>
                                                </ul>
                                                <div className="ps-tabs">
                                                    <div className="ps-tab active" id="sign-in">
                                                        <div className="ps-form__content">
                                                            <h5>Log In Your Account</h5>
                                                            <div className="form-group">
                                                                <Field className="form-control" type="text" name="email" id="email" placeholder="Username or email address" />
                                                            </div>
                                                            <ErrorMessage name="email">
                                                                {message => <p className="error">{message}</p>}
                                                            </ErrorMessage>
                                                            <div className="form-group form-forgot">
                                                                <Field className="form-control" type="text" placeholder="Password" name="password" id="password" />
                                                                <NavLink to="#" onClick={e=>{
                                                                    e.preventDefault();
                                                                    window.open('/password-recovery', '_top')
                                                                }}>Forgot password?</NavLink>
                                                            </div>
                                                            <ErrorMessage name="password">
                                                                {message => <p className="error">{message}</p>}
                                                            </ErrorMessage>
                                                            <div className="form-group">
                                                                <div className="ps-checkbox">
                                                                    <Field
                                                                        className="form-control"
                                                                        type="checkbox"
                                                                        id="remember-me"
                                                                        name="remember-me"
                                                                        onClick={async (e) => {
                                                                            const helpers = new GlobalHelper();
                                                                            const { checked } = e.target;
                                                                            if (checked) {
                                                                                //==============================
                                                                                // Start save user name in storage
                                                                                //==============================
                                                                                await helpers.localStorageCoder('__reme', 'set', values.email);
                                                                                //==============================
                                                                                // End save user name in storage
                                                                                //==============================
                                                                                setValues({
                                                                                    ...values,
                                                                                    rememberme:true
                                                                                })
                                                                            } else {
                                                                                setValues({
                                                                                    ...values,
                                                                                    rememberme:false
                                                                                })
                                                                                //==============================
                                                                                // Start delete user name from storage
                                                                                //==============================
                                                                                helpers.removeLocalStorage('__reme');
                                                                                //==============================
                                                                                // End delete user name from storage
                                                                                //==============================
                                                                            }
                                                                            // rememberme(e)(values.email);
                                                                        }}
                                                                        // defaultChecked={respRememberaMe !== null ? true : false}
                                                                        checked={values.rememberme}
                                                                    />
                                                                    <label htmlFor="remember-me">Stay signed in
                                                                    Using a public or shared device?
                                                                    Uncheck to protect your account.
                                                                    <NavLink to="#">Learn more</NavLink>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="form-group submit">
                                                                <button
                                                                    disabled={isSubmitting}
                                                                    className="ps-btn ps-btn--fullwidth"
                                                                >Login</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ps-tab" id="register">
                                                        {/* <SignUp /> */}
                                                    </div>
                                                </div>
                                            </form>
                                        )
                                    }
                                    }
                                </Formik>
                            </div>
                            <AuthSectionRight />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

// SignIn.propTypes = {

// }

export default SignIn;
