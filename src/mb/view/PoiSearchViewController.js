import ViewController from "sap/a/view/ViewController";

import ServiceClient from "gd/service/ServiceClient";

import PoiSearchView from "./PoiSearchView";

export default class PoiSearchViewController extends ViewController
{
    afterInit()
    {
        super.afterInit();
    }

    createView(options)
    {
        return new PoiSearchView("search-view", options);
    }

    initView()
    {
        super.initView();
        this.view.attachInput(this._oninput.bind(this));
        this.view.attachKeydown(this._keydown.bind(this));
    }

    _oninput(e)
    {
        ServiceClient.getInstance().searchPoiAutocomplete(e.getParameters().keyword).then(result => {
            console.log(result);
        }, (reject) => {
            console.log(reject);
        });
    }

    _keydown(e)
    {
        ServiceClient.getInstance().searchPoiAutocomplete(e.getParameters().keyword).then(result => {
            if (result.length > 0) {
                const poi = result[0];
                this.view.setPoi(poi);

                //改变全局model
                sap.ui.getCore().getModel().setProperty("/selectedPoi", poi);

            }
        }, (reject) => {
            console.log(reject);
        });
    }
}
