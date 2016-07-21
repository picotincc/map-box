import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import Application from "./Application";

export default class ApplicationController extends AdaptiveApplicationController
{
    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        this.view.mapView.searchRoute([ 31.9790247, 118.7548084 ], [ 32.04389, 118.77881 ]);
    }
}
