import React from "react";

import { useState, useEffect } from "react";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
};

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};
export default useWindowDimensions;

//HOC(Higher Order Component) EXAMPLE:
////https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

//When to use it:
//https://medium.com/javascript-scene/do-react-hooks-replace-higher-order-components-hocs-7ae4a08b7b58

// export default function withWindowDimensions(WrappedComponent: any) {
//     return class extends React.Component {
//         state = { width: 0, height: 0 };

//         componentDidMount() {
//             this.updateWindowDimensions();
//             window.addEventListener("resize", this.updateWindowDimensions);
//         }

//         componentWillUnmount() {
//             window.removeEventListener("resize", this.updateWindowDimensions);
//         }

//         updateWindowDimensions = () => {
//             this.setState({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//         };

//         render() {
//             return (
//                 <WrappedComponent
//                     {...this.props}
//                     windowWidth={this.state.width}
//                     windowHeight={this.state.height}
//                     isMobileSized={this.state.width < MED_SCREEN_SIZE}
//                 />
//             );
//         }
//     };
// }
