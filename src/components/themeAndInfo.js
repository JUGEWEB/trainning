import React from "react";
import AddTheme from "./AddThemes";
import UpdateThemeImage from "./updateThemeImage";
import Header from "./header";
import GetItemInfo from "./getItemInfo";
import ItemDetail from "./getItemById";
import RemoveSizes from "./removeSize";

function ThemeAndInfo() {
    return (
        <div>
         <div>
                <AddTheme />
                <UpdateThemeImage/>
              <Header />
              <GetItemInfo/>
              <ItemDetail/>
              <RemoveSizes/>
              </div>
        </div>
    )
}

export default ThemeAndInfo