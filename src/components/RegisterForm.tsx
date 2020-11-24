import React, { ComponentType, useEffect } from "react";
import {
    Field,
    reduxForm,
    reset,
    change,
    FormErrors,
    InjectedFormProps,
} from "redux-form";
//compose is used to make it easier to "organize" mapStateToProps and redux form
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import { RegisterFormProps } from "./Body";
import { displayAuthLoading, resetAuthFormError } from "../actions";
//Re-usable component
export interface RegisterFormValues {
    email: string;
    password: string;
}

//Typescriptand redux form:
//https://levelup.gitconnected.com/react-js-typescript-redux-redux-form-jest-e522995ebe36

//Need to hoist render methods up or else it will give error where it will unfocus after first characther is typed
//https://stackoverflow.com/questions/39839051/using-redux-form-im-losing-focus-after-typing-the-first-character

const renderError = ({ error, touched }: any) => {
    if (touched && error) {
        //Touched (for input) will be false at first
        //When clicked and then clicked otuside of the input, it will be true
        return <div className="errorText">{error}</div>;
    }
};

const renderTextInput = ({ input, label, meta, placeHolder }: any) => {
    //"component" property automatically passes props to argument, it has {input properties and meta properties}
    //"label" automatically passes props to arguments
    return (
        <div>
            <label>{label}</label>
            <input
                data-testid="registerTextInput"
                className="createAuthInputs"
                {...input}
                autoComplete="off"
            />
            {renderError(meta)}
        </div>
    );
    //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
    //props to <input>
};

const renderPasswordInput = ({ input, label, meta, placeHolder }: any) => {
    return (
        <div>
            <label>{label}</label>
            <input
                data-testid="registerPasswordInput"
                className="createAuthInputs"
                type="password"
                {...input}
                autoComplete="off"
            />
            {renderError(meta)}
        </div>
    );
};

const RegisterForm: React.FC<
    RegisterFormProps & InjectedFormProps<{}, RegisterFormProps>
> = (props) => {
    useEffect(() => {
        //If we don't reset the auth error message, if we switch to SignInForm, the error message would stick around
        props.resetAuthFormError();
    }, []);
    const hideAuthLoading = () => {
        if (props.authStatus) {
            //finished loading
            props.displayAuthLoading(false);
        }
    };

    const onSubmit = (formValues: any, dispatch: any) => {
        //onSubmit's default param is any
        //event.preventDefault() is automatically called with handleSubmit, a redux-form property
        //form values are the values from the fields that redux-form automatiacally passes
        //after clicking the submit button
        //dispatch(reset("registerForm"));
        props.onSubmit(formValues);
        dispatch(change("registerForm", "password", ""));
    };

    return (
        <React.Fragment>
            {hideAuthLoading()}
            <form className="authForm" onSubmit={props.handleSubmit(onSubmit)}>
                <div className="authFieldSection">
                    <div className="authFormFieldTitleWrap">
                        <h1>Email</h1>
                        <h3 className="authFormFieldTitleEmailInUse">
                            {props.authStatus}
                        </h3>
                    </div>
                    <Field
                        name="email"
                        type="text"
                        component={renderTextInput}
                    />
                </div>
                <div className="authFieldSection">
                    <div className="authFormFieldTitleWrap">
                        <h1>Password</h1>
                        <h3 className="authFormFieldTitleEmailInUse">
                            {props.authStatus}
                        </h3>
                    </div>
                    <Field
                        name="password"
                        type="password"
                        component={renderPasswordInput}
                    />
                </div>

                <button data-testid="registerButton" className="authButton">
                    Register
                </button>
            </form>
        </React.Fragment>
    );
};

const validate = (
    formValues: RegisterFormValues
): FormErrors<RegisterFormValues> => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors: FormErrors<RegisterFormValues> = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.email) {
        //user did not enter title, so undefined
        errors.email = "You must enter an email";
        //Must be the same name as field name! The "error" property in {meta} would receive this
    }

    if (!formValues.password) {
        errors.password = "You must enter a password";
    }

    return errors;
    //Erors is going to be passed to renderInput's meta
};

const mapStateToProps = (state: StoreState) => {
    return {
        authStatus: state.authStatus.errorMessage,
    };
};

export default connect(mapStateToProps, {
    displayAuthLoading,
    resetAuthFormError,
})(
    reduxForm<{}, RegisterFormProps>({
        form: "registerForm",
        validate,
    })(RegisterForm)
);
