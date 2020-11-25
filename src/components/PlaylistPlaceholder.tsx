import React from "react";
import ContentLoader from "react-content-loader";
import useWindowDimensions from "./windowDimensions";
const PlaylistPlaceholder: React.FC<{}> = (props) => {
    const { width } = useWindowDimensions();
    const readjustedWidth = width - 100;
    const readjustedHeight = readjustedWidth;
    return (
        // <ContentLoader
        //     speed={2}
        //     width={350}
        //     height={350}
        //     viewBox="0 0 350 350"
        //     backgroundColor="#f3f3f3"
        //     foregroundColor="#ecebeb"
        //     {...props}
        // >
        //     <rect x="-13" y="41" rx="2" ry="2" width="350" height="350" />
        // </ContentLoader>
        <ContentLoader
            speed={2}
            width={readjustedWidth}
            height={readjustedHeight}
            viewBox={`0 0 ${readjustedWidth}} ${readjustedHeight}`}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect
                x="-13"
                y="41"
                rx="2"
                ry="2"
                width={readjustedWidth}
                height={readjustedHeight}
            />
        </ContentLoader>
    );
};
export default PlaylistPlaceholder;
