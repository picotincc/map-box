import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import ODSearchView from "./ODSearchView";
import PoiSearchViewController from "./PoiSearchViewController";

export default class ODSearchViewController extends ViewController
{
    afterInit()
    {
        super.afterInit();
        this._initControllers();
    }

    createView(options)
    {
        return new ODSearchView(options);
    }

    initView()
    {
        super.initView();
    }

    _initControllers()
    {
        this._initOriginSearchViewController();
        this._initDestSearchViewController();
    }

    _initOriginSearchViewController()
    {
        this.originSearchViewController = new PoiSearchViewController({
            viewOptions: {
                id : "origin-search-view",
                placeholder: "起点",
                poi: "{/originPoi}"
            }
        });
        this.addChildViewController(this.originSearchViewController, this.view.$container);
        this.originSearchViewController.attachSelect(this._originSearchView_selected.bind(this));
    }

    _initDestSearchViewController()
    {
        this.destSearchViewController = new PoiSearchViewController({
            viewOptions: {
                id : "dest-search-view",
                placeholder: "终点",
                poi: "{/destPoi}"
            }
        });
        this.addChildViewController(this.destSearchViewController, this.view.$container);
        this.destSearchViewController.attachSelect(this._destSearchView_selected.bind(this));
    }

    _originSearchView_selected(e)
    {
        const poi = e.getParameters().selectedPoi;
        this.getModel().forceSetProperty("/originPoi", poi);
    }

    _destSearchView_selected(e)
    {
        const poi = e.getParameters().selectedPoi;
        this.getModel().forceSetProperty("/destPoi", poi);
    }


}
