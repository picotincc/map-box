import Layer from "sap/a/map/layer/Layer";

export default class SelectedLayer extends Layer
{

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
    }

    afterInit()
    {
        super.afterInit();
    }

    updateSelectedMaker(selectedPoi)
    {
        const latlng = L.latLng(selectedPoi.location.lat, selectedPoi.location.lng);
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
            this.markerGroup.addLayer(this.selectedMarker);
        }
        else {
            this.selectedMarker.setLatLng(latlng);
        }
    }

}
