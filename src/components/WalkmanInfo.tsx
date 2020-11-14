import React from "react";
import requireAuth from "./requireAuth";
const WalkmanInfo: React.FC<{}> = () => {
    return (
        <div>
            <h1 className="walkmanTitle">
                page only accecible if you already have an account
            </h1>
        </div>
    );
};

export default requireAuth(WalkmanInfo);
