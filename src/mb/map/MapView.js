import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";


import ServiceClient from "gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";
import SelectedPoiLayer from "./layer/SelectedPoiLayer";

export default class MapView extends AdaptiveMapView
{
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true }
        },
        events: {
            mapClick: { parameters: { location: "object" } }
        }
    };

    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
        this.map.on("click", this._map_click.bind(this));
    }

    initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        // this.naviLayer = new NaviLayer({
        //     startLocation: [ 31.9790247, 118.7548084 ],
        //     endLocation: [ 32.04389, 118.77881 ]
        // });
        // this.addLayer(this.naviLayer);
        // this.naviLayer.fitBounds();

        this.selectedPoiLayer = new SelectedPoiLayer();
        this.addLayer(this.selectedPoiLayer);
    }

    setSelectedPoi(poi)
    {
        this.setProperty("selectedPoi", poi);
        if (poi)
        {
            this.selectedPoiLayer.updateSelectedMaker(poi);
            this.setCenterLocation(poi.location);
        }
    }

    _map_click(e)
    {
        this.fireMapClick({
            location: e.latlng
        });
    }

}
