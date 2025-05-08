import React from "react";
import FileUpload from "./FileUpload";
import UploadItem from "./getItemId";
import UploadFolder from "./uploadFolder";

function UploadZone() {
    return (
        <div>
         <div>
              <FileUpload />
              <UploadFolder/>
              <UploadItem/>
              </div>
        </div>
    )
}

export default UploadZone