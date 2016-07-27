import AdaptiveApplication from "sap/a/app/Application";

import MapView from "../map/MapView";
import PoiSearchViewController from "../view/PoiSearchViewController";

export default class Application extends AdaptiveApplication
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-app");
        this._initMapView();
        this._initPoiSearchViewController();
    }

    _initMapView()
    {
        this.mapView = new MapView("map-view", {
        });
        this.addSubview(this.mapView);
    }

    _initPoiSearchViewController()
    {
        this.poiSearchViewController = new PoiSearchViewController();
        this.poiSearchView = this.poiSearchViewController.view;
        this.addSubview(this.poiSearchView);
    }
}
