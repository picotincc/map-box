import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";

export default class MapView extends AdaptiveMapView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
    }

    initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        this.naviLayer = new NaviLayer({
            startLocation: [ 31.9790247, 118.7548084 ],
            endLocation: [ 32.04389, 118.77881 ]
        });
        this.addLayer(this.naviLayer);
        this.naviLayer.fitBounds();

    }

    searchRoute(startLocation, endLocation)
    {
        this.naviLayer.applySettings({
            startLocation,
            endLocation
        });

        ServiceClient.getInstance().searchDrivingRoute([ startLocation, endLocation ]).then((result) => {
            this.naviLayer.drawRoute(result.steps);
            this.naviLayer.fitBounds();
        });
    }

}
