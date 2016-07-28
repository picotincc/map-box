import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";
import PoiSearchViewController from "../view/PoiSearchViewController";

export default class Application extends AdaptiveApplication
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-app");
    }

}
