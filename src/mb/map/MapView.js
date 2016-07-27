import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";

export default class MapView extends AdaptiveMapView
{
    metadata = {
        events: {
            mapclick: { location: { type: "any" } }
        }
    };
    init()
    {
        super.init();
    }

    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
        this.map.on("click",this._map_click.bind(this));
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
        this.naviLayer.fitBounds();

        ServiceClient.getInstance().searchDrivingRoute([ startLocation, endLocation ]).then((result) => {
            this.naviLayer.drawRoute(result.steps);
            this.naviLayer.fitBounds();
        });
    }

    searchPoi(keyword)
    {
        ServiceClient.getInstance().searchPoiAutocomplete(keyword).then((result) => {
            console.log(result);
        });
    }

    _map_click(e)
    {

        console.log(e.latlng);

        this.fireMapclick({
            location: e.latlng
        });
    }

}
