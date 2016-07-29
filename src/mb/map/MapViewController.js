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
        const opts = $.extend({
            selectedPoi: "{/selectedPoi}"
        }, options);
        return new MapView(opts);
    }

    initView()
    {
        super.initView();
        this.view.attachMapClick(this._map_click.bind(this));
    }

    searchRoute(startLocation, endLocation)
    {
        this.view.updateNaviLocation(startLocation, endLocation);

        ServiceClient.getInstance().searchDrivingRoute([ startLocation, endLocation ]).then((result) => {
            this.view.drawNaviRoute(result.steps);
        }, reason => {
            console.error(reason);
        });
    }

    _map_click(e)
    {
        ServiceClient.getInstance().searchAddress(e.getParameters().location).then(result => {
            //改变全局model
            this.getModel().setProperty("/queryPoi", result);
        });
    }

}
