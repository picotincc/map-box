import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import MapView from "./MapView";

export default class MapViewController extends ViewController
{
    afterInit()
    {
        super.afterInit();
    }

    createView(options)
    {
        return new MapView(options);
    }

    initView()
    {
        super.initView();
        this.view.attachMapclick(this._map_click.bind(this));
    }

    searchRoute(startLocation, endLocation)
    {
        this.view.updateNaviLocation(startLocation, endLocation);

        ServiceClient.getInstance().searchDrivingRoute([ startLocation, endLocation ]).then((result) => {
            this.view.drawNaviRoute(result.steps);
        }, reject => {
            console.log(reject);
        });
    }

    setSelectedPoiMarker(selectedPoi)
    {
        this.view.setCenterLocation(selectedPoi.location, 12);
        this.view.updateSelectedMaker(selectedPoi);
    }

    _map_click(e)
    {
        ServiceClient.getInstance().searchAddress(e.getParameters().location).then(result => {
            //改变全局model
            sap.ui.getCore().getModel().setProperty("/queryPoi", result);
        });
    }

}
