import React from "react";
import BeautyHeader from "./beautyheader";
import WomenHeader from "./womenheader";
import ShoesHeader from "./shoesheader";
import MenHeader from "./menheader";
import PetHeader from "./petheader";
import KidsHeader from "./kidsheader";
import ElectronicHeader from "./electronicheader";

function ProductHeaderImage() {
    return (
        <div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
     <BeautyHeader/>
     <WomenHeader />
     <ShoesHeader/>
     <MenHeader/>
     <PetHeader/>
     <KidsHeader/>
     <ElectronicHeader/>
     </div>
        </div>
    )
}

export default ProductHeaderImage