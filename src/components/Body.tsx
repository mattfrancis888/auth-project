import React from "react";
import useWindowDimensions from "../windowDimensions";
import { MED_SCREEN_SIZE } from "../constants";
import background from "../img/background.jpg";
import mobileBackground from "../img/mobileBackground.jpg";
const Body: React.FC<{}> = () => {
    const { width } = useWindowDimensions();

    return (
        <div className="bodyContainer">
            <div className="contentContainer">
                <div className="listenContainer">
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

export default Body;
