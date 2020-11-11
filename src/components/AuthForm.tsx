import React from "react";
import {
    Field,
    reduxForm,
    reset,
    FormErrors,
    InjectedFormProps,
} from "redux-form";
import { AuthFormProps } from "./Body";
//Re-usable component
export interface AuthFormValues {
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

const renderInput = ({ input, label, meta, placeHolder }: any) => {
    //"component" property automatically passes props to argument, it has {input properties and meta properties}
    //"label" automatically passes props to arguments
    return (
        <div>
            <label>{label}</label>
            <input className="createAuthInputs" {...input} autoComplete="off" />
            {renderError(meta)}
        </div>
    );
    //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
    //props to <input>
};

const AuthForm: React.FC<
    AuthFormProps & InjectedFormProps<{}, AuthFormProps>
> = (props) => {
    const onSubmit = (formValues: any, dispatch: any) => {
        //onSubmit's default param is any
        //event.preventDefault() is automatically called with handleSubmit, a redux-form property
        //form values are the values from the fields that redux-form automatiacally passes [which is done in streamForm]
        //after clicking the submit button
        dispatch(reset("authForm"));
        props.onSubmit(formValues);
    };
    return (
        <React.Fragment>
            <form className="authForm" onSubmit={props.handleSubmit(onSubmit)}>
                <div className="authFieldSection">
                    <h1>Email</h1>
                    <Field name="email" type="text" component={renderInput} />
                </div>
                <div className="authFieldSection">
                    <h1>Password</h1>
                    <Field name="password" component={renderInput} />
                </div>

                <button className="authButton">Log In</button>
                <h3 className="registerAccountText">
                    Don't have an account? Register one here!
                </h3>
            </form>
        </React.Fragment>
    );
};

const validate = (formValues: AuthFormValues): FormErrors<AuthFormValues> => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors: FormErrors<AuthFormValues> = {};
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

export default reduxForm<{}, AuthFormProps>({
    form: "authForm",
    validate,
})(AuthForm);

// export default connect(null, { createStream })(formWrapped);
