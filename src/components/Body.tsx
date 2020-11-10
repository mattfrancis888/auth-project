import React from "react";
import useWindowDimensions from "../windowDimensions";
import { MED_SCREEN_SIZE } from "../constants";
import background from "../img/background.jpg";
import mobileBackground from "../img/mobileBackground.jpg";
const Body: React.FC<{}> = () => {
    const { width } = useWindowDimensions();

    return (
        <div>
            <img
                className="bodyBackgroundImg"
                src={width > MED_SCREEN_SIZE ? background : mobileBackground}
                alt="guardians of the galaxy"
            />
        </div>
    );
};

export default Body;
