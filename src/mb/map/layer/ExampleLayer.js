import Layer from "sap/a/map/layer/Layer";

export default class ExampleLayer extends Layer
{
    metadata = {
        properties: {
            startLocation: { type: "any" },
            endLocation: { type: "any" }
        }
    };

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
        this.routeGroup = L.featureGroup();
        this.container.addLayer(this.routeGroup);
    }

    afterInit()
    {
        super.afterInit();
        // const line = L.polyline(locations);
        // this.container.addLayer(line);
    }

    setStartLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("startLocation", loc);
        this._updateStartMarker();
    }

    setEndLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("endLocation", loc);
        this._updateEndMarker();
    }

    drawRoute()
    {
        this.routeGroup.clearLayers();
        const latlngs = [ this.getStartLocation(), this.getEndLocation() ];
        const line = L.polyline(latlngs);
        this.routeGroup.addLayer(line);;
    }


    _updateStartMarker()
    {
        if (!this.startMarker)
        {
            this.startMarker = L.circleMarker(this.getStartLocation());
            this.startMarker.setRadius(8);
            this.startMarker.setStyle({
                color: "green",
                opacity: 0.8,
                fillColor: "green",
                fillOpacity: 0.8
            });
            this.markerGroup.addLayer(this.startMarker);
        }
        else
        {
            this.startMarker.setLatLng(this.getStartLocation());
        }

    }


    _updateEndMarker()
    {
        if (!this.endMarker)
        {
            this.endMarker = L.circleMarker(this.getEndLocation());
            this.endMarker.setRadius(8);
            this.endMarker.setStyle({
                color: "red",
                opacity: 0.8,
                fillColor: "red",
                fillOpacity: 0.8
            });
            this.markerGroup.addLayer(this.endMarker);
        }
        else
        {
            this.endMarker.setLatLng(this.getEndLocation());
        }

    }




}
