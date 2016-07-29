import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";


import ServiceClient from "gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";
import SelectedPoiLayer from "./layer/SelectedPoiLayer";

export default class MapView extends AdaptiveMapView
{
    metadata = {
        properties: {
            selectedPoi: { type: "object", bindable: true },
            originPoi: { type: "object", bindable: true },
            destPoi: { type: "object", bindable: true }

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

        this.naviLayer = new NaviLayer({});
        this.addLayer(this.naviLayer);

        this.selectedPoiLayer = new SelectedPoiLayer();
        this.addLayer(this.selectedPoiLayer);
    }

    // setSelectedPoi(poi)
    // {
    //     this.setProperty("selectedPoi", poi);
    //     if (poi)
    //     {
    //         this.selectedPoiLayer.updateSelectedMaker(poi);
    //         this.setCenterLocation(poi.location);
    //     }
    // }

    setOriginPoi(poi)
    {
        this.setProperty("originPoi", poi);
        if (poi)
        {
            this.naviLayer.setStartLocation(poi.location);
            this.setCenterLocation(poi.location);
        }
    }

    setDestPoi(poi)
    {
        this.setProperty("destPoi", poi);
        if (poi)
        {
            this.naviLayer.setEndLocation(poi.location);
            this.setCenterLocation(poi.location);
        }
    }

    drawNaviRoute(steps)
    {
        this.naviLayer.drawRoute(steps);
        this.naviLayer.fitBounds();
    }

    _map_click(e)
    {
        this.fireMapClick({
            location: e.latlng
        });
    }

}
