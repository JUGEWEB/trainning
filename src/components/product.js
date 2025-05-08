import React from "react";
import {useNavigate} from "react-router-dom"
import MissingVariantsChecker from "./missingVariants";

function Product() {
    const navigate = useNavigate()

    const handleTypeImageClick = () => {
        navigate("./typeimage");
      };

      const handlethemeandinfo = () => {
        navigate("./themeandinfo");
      };

      const handleuploadzone = () => {
        navigate("./uploadzone");
      };


    return (
        <div>
           <div><MissingVariantsChecker/></div>
           <button onClick={handleTypeImageClick}>Go to Type Image</button>
           <button onClick={handlethemeandinfo}>Go to Theme and info</button>
           <button onClick={handleuploadzone}>Go to upload zone</button>
        </div>
    )
}

export default Product