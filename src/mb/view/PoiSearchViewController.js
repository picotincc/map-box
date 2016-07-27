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
    }

    _oninput(e)
    {
        ServiceClient.getInstance().searchPoiAutocomplete(e.getParameters().keyword).then(result => {
            console.log(result);
        }, (reject) => {
            console.log(reject);
        });
    }
}
