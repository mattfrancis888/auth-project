import React from "react";
import useWindowDimensions from "../windowDimensions";
import { MED_SCREEN_SIZE } from "../constants";
import background from "../img/background.jpg";
import mobileBackground from "../img/mobileBackground.jpg";
import SignInForm from "./SignInForm";
import { connect } from "react-redux";
import { signUp, signIn } from "../actions";
import RegisterForm from "./RegisterForm";
import { StoreState } from "../reducers";
import history from "../browserHistory";
import { DisplayFormStateResponse } from "../reducers/displayReducer";

export interface SignInFormProps {
    onSubmit(formValues: any): any;
    authStatus?: string | null;
    displayRegisterForm(displayForm: boolean): void;
}
export interface RegisterFormProps {
    //We might have different props in the future, so we are having 2 different interfaces for Sign In And Register
    onSubmit(formValues: any): any;
    authStatus?: string | null;
}

export interface BodyProps {
    //signUp(formValues: any): void;
    signIn(formValues: any): void;
    signUp(formValues: any): void;
    authStatus?: string | null;
    formStatus: DisplayFormStateResponse;
}

const Body: React.FC<BodyProps> = (props) => {
    const renderContent = () => {
        if (props.authStatus) {
            //If user is already logged in
            return (
                <h1
                    onClick={() => {
                        history.push("/walkman");
                    }}
                >
                    You are logged in, click here to listen to Peter Quill's
                    Walkman
                </h1>
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
                        <div className="walkmanContainer">
                            <img
                                src="https://media1.giphy.com/media/YJGcmZMP7ljIA/giphy.gif"
                                alt="walkman"
                            ></img>
                        </div>
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
    };

    const onSubmitRegister = async (formValues: any) => {
        props.signUp(formValues);
    };

    const { width } = useWindowDimensions();

    return (
        <div className="bodyContainer">
            <div className="contentContainer">
                <div className="listenContainer">{renderContent()}</div>
            </div>

            <div className="bodyBackgroundImgWrap">
                <img
                    className="bodyBackgroundImg"
                    src={
                        width > MED_SCREEN_SIZE ? background : mobileBackground
                    }
                    alt="guardians of the galaxy"
                />
            </div>
        </div>
    );
};
const mapStateToProps = (state: StoreState) => {
    return {
        authStatus: state.authStatus.authenticated,
        formStatus: state.formStatus,
    };
};

export default connect(mapStateToProps, { signUp, signIn })(Body);
