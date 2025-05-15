import React from "react";
import {useNavigate} from "react-router-dom"
import MissingVariantsChecker from "./missingVariants";
import AdVariants from "./AdVariants";
import DeleteImagesVariants from "./deleteImages-variants";

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

        const handleUserOrder= () => {
        navigate("./userorder");
      };

        const handleGetItemInformation= () => {
        navigate("./getiteminformation");
      };

      const handleUserBrandPayement= () => {
        navigate("./userBrandPayment");
      };


    return (
        <div>
           <div><MissingVariantsChecker/></div>
           <div style={{display: "flex"}}>
            <AdVariants/>
            <DeleteImagesVariants/>
           </div>
           <button onClick={handleTypeImageClick}>Go to Type Image</button>
           <button onClick={handlethemeandinfo}>Go to Theme and info</button>
           <button onClick={handleuploadzone}>Go to upload zone</button>
            <button onClick={handleUserOrder}>Users order</button>
             <button onClick={handleGetItemInformation}>Get item informations</button>
             <button onClick={handleUserBrandPayement}>Users orders by brand</button>
        </div>
    )
}

export default Product