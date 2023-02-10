import React from "react";
import {MoonLoader} from "react-spinners";
import { vw } from "./SizeConvert";

const override = {
    display: "flex",
    borderColor: "#2B787D",
    textAlign:"center",
    position:"relative",
    zIndex:"10",
    speedMultiplier: 5,
};

const Loading = ({loading}) =>{
    return(
        <div>
            <MoonLoader
                color= "#2B787D"
                loading={loading}
                cssOverride={override}
                size={vw(80)}
            />
        </div>
    )
}

export default Loading;