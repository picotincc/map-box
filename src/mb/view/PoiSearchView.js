import View from "sap/a/view/View";

export default class PoiSearchView extends View
{
    metadata = {
        properties: {
            poi: { type: "object" }
        },
        events: {
            input: { keyword: { type: "string" } },
            keydown: { keyword: { type: "string" } }
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
        this.$element.on("keydown", this._onkeydown.bind(this));
    }

    afterInit()
    {
        super.afterInit();
    }

    setPoi(value)
    {
        this.setProperty("poi", value);
        this._updatePoi();
    }

    setKeyword(keyword)
    {
        this.$input.val(keyword);
    }

    _updatePoi()
    {
        const poi = this.getPoi();
        if (poi.name)
        {
            this.$input.val(poi.name);
        }
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

    _onkeydown(e)
    {
        if (e.keyCode === 13)
        {
            const keyword = this.$input.val();
            if (keyword) {
                this.fireKeydown({
                    keyword: keyword
                });
            }
        }
    }


}
