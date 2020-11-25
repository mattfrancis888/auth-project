import React, { useEffect, useState } from "react";
import useWindowDimensions from "../windowDimensions";
import { MED_SCREEN_SIZE } from "../constants";
import background from "../img/background.jpg";
import mobileBackground from "../img/mobileBackground.jpg";
import SignInForm from "./SignInForm";
import { connect } from "react-redux";
import { signUp, signIn, displayAuthLoading } from "../actions";
import RegisterForm from "./RegisterForm";
import { StoreState } from "../reducers";
import history from "../browserHistory";
import { DisplayFormStateResponse } from "../reducers/displayAuthReducer";
import anime from "animejs/lib/anime.es.js";
import walkman from "../img/walkman.gif";
import Loading from "./Loading";
export interface SignInFormProps {
    onSubmit(formValues: any): any;
    authStatus?: string | null;
    displayRegisterForm(displayForm: boolean): void;
    displayAuthLoading(displayLoading: boolean): void;
    resetAuthFormError(): void;
}
export interface RegisterFormProps {
    //We might have different props in the future, so we are having 2 different interfaces for Sign In And Register
    onSubmit(formValues: any): any;
    authStatus?: string | null;
    displayAuthLoading(displayLoading: boolean): void;
    resetAuthFormError(): void;
}

export interface BodyProps {
    //signUp(formValues: any): void;
    signIn(formValues: any): void;
    signUp(formValues: any): void;
    authStatus?: string | null;
    formStatus: DisplayFormStateResponse;
    authLoadingStatus: boolean;
    displayAuthLoading(displayLoading: boolean): void;
}
const Body: React.FC<BodyProps> = (props) => {
    const hideAuthLoading = () => {
        if (props.authStatus) {
            //finished loading
            props.displayAuthLoading(false);
        }
    };

    const renderAuthLoading = () => {
        return (
            <div
                className={
                    props.authLoadingStatus
                        ? "loadingTransparentBackground"
                        : "loadingHide"
                }
            >
                <div className="loadingCenter">
                    <Loading />
                </div>
            </div>
        );
    };
    const renderContent = () => {
        if (props.authStatus) {
            //If user is already logged in or authentication data is done loading
            displayAuthLoading(false);
            return (
                <React.Fragment>
                    <h1
                        className="alreadyLoggedInTitle"
                        onClick={() => {
                            history.push("/walkman");
                        }}
                    >
                        You are already logged in, click here to listen to Peter
                        Quill's Walkman
                    </h1>
                </React.Fragment>
            );
        } else if (props.formStatus.displaySignInForm) {
            return <SignInForm onSubmit={onSubmitSignIn} />;
        } else if (props.formStatus.displayRegisterForm) {
            return <RegisterForm onSubmit={onSubmitRegister} />;
        } else {
            return (
                <React.Fragment>
                    <h1 className="listenTitle">
                        Log In To Listen to Peter Quill's Walkman
                    </h1>
                    <div className="listenAboutWrap">
                        <p>
                            Peter Quill's Walkman was an object owned by Peter
                            Quill, given to him by his mother as a gift for her
                            fatherless, lonely son. He became very protective of
                            his Walkman, as it was the only thing Peter had left
                            of his mom. It also came with a headset.
                        </p>

                        <img
                            className="walkman"
                            src={walkman}
                            alt="walkman"
                            onLoad={() => {
                                anime({
                                    targets: ".walkman",

                                    opacity: [
                                        {
                                            value: [0, 1],
                                            duration: 1000,
                                            easing: "easeOutQuad",
                                        },
                                    ],
                                });
                            }}
                        ></img>
                    </div>
                </React.Fragment>
            );
        }
    };
    const onSubmitSignIn = async (formValues: any) => {
        //Won't be triggered if failed to meet requirements of the form
        //Callback for ReviewForm
        //event.preventDefault()
        //Redux automaticlaly calls it with handleSubmit
        //form values are the values from the fields that redux-form automatiacally passes [Which is done in Streamform]
        //after clicking the submit button
        props.signIn(formValues);
        props.displayAuthLoading(true);
    };

    const onSubmitRegister = async (formValues: any) => {
        props.signUp(formValues);
        props.displayAuthLoading(true);
    };

    const { width } = useWindowDimensions();

    return (
        <React.Fragment>
            {hideAuthLoading()}
            <div className="bodyContainer" data-testid="bodyContent">
                <div className="contentContainer">
                    <div className="contentWrap">{renderContent()}</div>
                </div>

                <div className="bodyBackgroundImgWrap">
                    <img
                        className="bodyBackgroundImg"
                        src={
                            width > MED_SCREEN_SIZE
                                ? background
                                : mobileBackground
                        }
                        alt="guardians of the galaxy"
                    />
                </div>
            </div>
            {renderAuthLoading()}
        </React.Fragment>
    );
};
const mapStateToProps = (state: StoreState) => {
    return {
        authStatus: state.authStatus.authenticated,
        formStatus: state.formStatus,
        authLoadingStatus: state.authLoadingStatus,
    };
};

export default connect(mapStateToProps, { signUp, signIn, displayAuthLoading })(
    Body
);
