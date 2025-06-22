import React from "react";
import AddTheme from "./AddThemes";
import UpdateThemeImage from "./updateThemeImage";
import Header from "./header";
import GetItemInfo from "./getItemInfo";
import ItemDetail from "./getItemById";
import RemoveSizes from "./removeSize";
import ThemeDisplay from "./displayTheme";

function ThemeAndInfo() {
    return (
        <div>
         <div>
            <ThemeDisplay/>
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