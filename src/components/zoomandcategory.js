import React from "react";
import ZoomSettings from "./zoom";
import AddCategoryForm from "./AddCategoryForm";
import AddTypeForm from "./addTypes";
import ItemInfo from "./itemInfo";
import ModifyData from "./modifyData";

function ZoomAndCategory() {
    return (
        <div>
        <div>
                <ZoomSettings/>
                <AddCategoryForm />
                <AddTypeForm />
                <ItemInfo />
                <ModifyData />
              </div>
        </div>
    )
}

export default ZoomAndCategory