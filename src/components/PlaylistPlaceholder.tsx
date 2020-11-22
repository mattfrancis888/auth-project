import React from "react";
import ContentLoader from "react-content-loader";

const PlaylistPlaceholder: React.FC<{}> = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={350}
            height={350}
            viewBox="0 0 300 350"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="-13" y="41" rx="2" ry="2" width="350" height="350" />
        </ContentLoader>
    );
};
export default PlaylistPlaceholder;
