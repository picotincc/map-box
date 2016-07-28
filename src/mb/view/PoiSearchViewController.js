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
        const opts = $.extend({
            poi: "{/selectedPoi}"
        }, options);
        return new PoiSearchView("search-view", opts);
    }

    initView()
    {
        super.initView();
        this.view.attachInput(this._oninput.bind(this));
        this.view.attachSearch(this._onSearch.bind(this));
        this.view.attachFocus(this._onfocus.bind(this));
        this.view.attachBlur(this._onblur.bind(this));
    }

    _oninput(e)
    {
        ServiceClient.getInstance().searchPoiAutocomplete(e.getParameters().keyword).then(result => {
            this.view.suggestionListView.setItems(result);
            this.view.suggestionListView.toggleSuggestion(result && result.length > 0);
        }, (reason) => {
            console.error(reason);
        });
    }

    _onSearch(e)
    {
        ServiceClient.getInstance().searchPoiAutocomplete(e.getParameters().keyword).then(result => {
            if (result.length > 0) {
                const poi = result[0];
                //改变全局model
                sap.ui.getCore().getModel().setProperty("/selectedPoi", poi);
            }
        }, (reason) => {
            console.error(reason);
        });
    }

    _onfocus(e)
    {
        this.view.suggestionListView.toggleSuggestion(this.view.suggestionListView.getItems() && this.view.suggestionListView.getItems().length > 0);
    }

    _onblur(e)
    {
        this.view.suggestionListView.hideSuggestion();
    }
}
