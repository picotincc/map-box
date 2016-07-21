import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";

import Application from "./Application";

export default class ApplicationController extends AdaptiveApplicationController
{
    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {

            //gaode service started
            console.log("init gaode service ready");
            console.log(ServiceClient.getInstance().driving);

            //search route between two locations
            //this.view.mapView.searchRoute([ 31.9790247, 118.7548084 ], [ 32.04389, 118.77881 ]);
        });
    }
}
