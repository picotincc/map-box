import View from "sap/a/view/View";

import ServiceClient from "gd/service/ServiceClient";

export default class PoiSearchView extends View
{
    metadata = {
        events: {
            input: { keyword: { type: "string" } }
        }
    };
    init()
    {
        super.init();
        this.addStyleClass("mb-search-view");

        this.$element.append(`<span class="icon"/>`);
        this.$input = $(`<input type=search placeholder="搜索">`);
        this.$element.append(this.$input);

        this.inputDelay = null;

        this.$input.on("input",this._on_input.bind(this));
    }

    afterInit()
    {
        super.afterInit();
    }

    _on_input(e)
    {
        if (this.inputDelay)
        {
            window.clearTimeout(this.inputDelay);
            this.inputDelay = null;
        }
        this.inputDelay = window.setTimeout(() => {
            this.fireInput({
                keyword: this.$input.val()
            });
        }, 500);
    }


}
