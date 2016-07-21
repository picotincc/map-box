import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";

export default class Application extends AdaptiveApplication
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-app");
        this._initMapView();
    }

    _initMapView()
    {
        this.mapView = new MapView("map-view", {
            
        });
        this.addSubview(this.mapView);
    }
}
