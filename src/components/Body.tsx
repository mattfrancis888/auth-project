import React from "react";
import useWindowDimensions from "../windowDimensions";
import { MED_SCREEN_SIZE } from "../constants";
import background from "../img/background.jpg";
import mobileBackground from "../img/mobileBackground.jpg";
import AuthForm from "./AuthForm";
import { connect } from "react-redux";

export interface AuthFormProps {
    onSubmit(formValues: any): any;
}

const Body: React.FC<{}> = () => {
    const onSubmit = async (formValues: any) => {
        //Won't be triggered if failed to meet requirements of the form
        //Callback for ReviewForm
        //event.preventDefault()
        //Redux automaticlaly calls it with handleSubmit
        //form values are the values from the fields that redux-form automatiacally passes [Which is done in Streamform]
        //after clicking the submit button
        console.log(formValues);
    };

    const { width } = useWindowDimensions();

    return (
        <div className="bodyContainer">
            <div className="contentContainer">
                <div className="listenContainer">
                    <AuthForm onSubmit={onSubmit} />
                    {/* <h1 className="listenTitle">
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
                    </div> */}
                </div>
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

export default connect(null, {})(Body);
