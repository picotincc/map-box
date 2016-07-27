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

        // this.naviLayer = new NaviLayer({
        //     startLocation: [ 31.9790247, 118.7548084 ],
        //     endLocation: [ 32.04389, 118.77881 ]
        // });
        // this.addLayer(this.naviLayer);
        // this.naviLayer.fitBounds();



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

    updateSelectedMaker(selectedPoi)
    {
        console.log(selectedPoi);
        var latlng = L.latLng(selectedPoi.location.lat, selectedPoi.location.lng);
        if (!this.selectedMarker)
        {
            this.selectedMarker = L.circleMarker(latlng);
            this.selectedMarker.setRadius(8);
            this.selectedMarker.setStyle({
                color: "blue",
                opacity: 0.8,
                fillColor: "blue",
                fillOpacity: 0.8
            });
            this.map.addLayer(this.selectedMarker);
        }
        else {
            this.selectedMarker.setLatLng(latlng);
        }
    }

    _map_click(e)
    {
        this.fireMapclick({
            location: e.latlng
        });
    }

}
