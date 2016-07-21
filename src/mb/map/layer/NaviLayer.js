import Layer from "sap/a/map/layer/Layer";

export default class NaviLayer extends Layer
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
    }

    setStartLocation(value)
    {
        this.setProperty("startLocation", L.latLng(value));
        this._updateStartMarker();
    }

    setEndLocation(value)
    {
        this.setProperty("endLocation", L.latLng(value));
        this._updateEndMarker();
    }

    drawRoute(steps)
    {
        this.routeGroup.clearLayers();
        const paths = steps.map(step => {
            return step.path;
        });
        const mPolyline = L.multiPolyline(paths);
        this.routeGroup.addLayer(mPolyline);
    }

    _updateStartMarker()
    {
        if (!this.startMarker)
        {
            this.startMarker = L.circleMarker(this.getStartLocation());
            this.startMarker.setRadius(10);
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
            this.endMarker.setRadius(10);
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
