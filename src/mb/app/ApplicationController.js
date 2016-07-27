import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";

import Application from "./Application";

export default class ApplicationController extends AdaptiveApplicationController
{

    init()
    {
        super.init();
        this._initModel();
    }

    createView(options)
    {
        return new Application(options);
    }

    initView()
    {
        super.initView();
        this.view.mapView.attachMapclick(this._map_click.bind(this));
    }

    run()
    {
        console.log("ApplicationController is running.");
        ServiceClient.getInstance().attachReady(() => {

            //gaode service started
            console.log("init gaode service ready");
            // console.log(ServiceClient.getInstance().driving);

            //search route between two locations
            // this.view.mapView.searchRoute([ 31.9790247, 118.7548084 ], [ 32.04389, 118.77881 ]);
            // this.view.mapView.searchPoi("丰盛");
        });
    }


    _initModel()
    {
        const model = new sap.ui.model.json.JSONModel({
            selectedPoi: null,
            queryPoi: null
        });
        sap.ui.getCore().setModel(model);

        sap.ui.getCore().getModel().bindProperty("/selectedPoi").attachChange(this._selectedPoi_changed.bind(this));
        sap.ui.getCore().getModel().bindProperty("/queryPoi").attachChange(this._queryPoi_changed.bind(this));

    }

    _selectedPoi_changed(e)
    {
        const selectedPoi = sap.ui.getCore().getModel().getProperty("/selectedPoi");
        this.view.mapView.setCenterLocation(selectedPoi.location, 12);
        this.view.mapView.updateSelectedMaker(selectedPoi);
    }

    _queryPoi_changed(e)
    {
        const queryPoi = sap.ui.getCore().getModel().getProperty("/queryPoi");
        this.view.poiSearchView.setKeyword(queryPoi.formattedAddress);
    }

    _map_click(e)
    {
        ServiceClient.getInstance().searchAddress(e.getParameters().location).then(result => {
            //改变全局model
            sap.ui.getCore().getModel().setProperty("/queryPoi", result);
        });
    }
}
