import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";

import Application from "./Application";
import MapViewController from "../map/MapViewController";
import Model from "../model/Model";
import PoiSearchViewController from "../view/PoiSearchViewController";



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
    }

    afterInit()
    {
        super.afterInit();
        this._initController();
    }

    run()
    {
        console.log("ApplicationController is running.");
        ServiceClient.getInstance().attachReady(() => {

            //gaode service started
            console.log("init gaode service ready");
            // console.log(ServiceClient.getInstance().driving);

            //search route between two locations
            // this.mapViewController.searchRoute([ 31.9790247, 118.7548084 ], [ 32.04389, 118.77881 ]);
            // this.view.mapView.searchPoi("丰盛");
        });
    }

    _initController()
    {
        this._initMapViewController();
        this._initPoiSearchViewController();
    }

    _initMapViewController()
    {
        this.mapViewController = new MapViewController("map-view");
        this.addChildViewController(this.mapViewController);
    }

    _initPoiSearchViewController()
    {
        this.poiSearchViewController = new PoiSearchViewController("poi-search-view");
        this.addChildViewController(this.poiSearchViewController);
    }


    _initModel()
    {
        const model = new Model();
        sap.ui.getCore().setModel(model);

        sap.ui.getCore().getModel().bindProperty("/selectedPoi").attachChange(this._model_selectedPoi_changed.bind(this));
        sap.ui.getCore().getModel().bindProperty("/queryPoi").attachChange(this._model_queryPoi_changed.bind(this));

    }

    _model_selectedPoi_changed(e)
    {
        const selectedPoi = sap.ui.getCore().getModel().getProperty("/selectedPoi");
        this.mapViewController.setSelectedPoiMarker(selectedPoi);
    }

    _model_queryPoi_changed(e)
    {
        const queryPoi = sap.ui.getCore().getModel().getProperty("/queryPoi");
        this.poiSearchViewController.setKeyword(queryPoi.formattedAddress);
    }


}
