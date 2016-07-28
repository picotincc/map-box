import View from "sap/a/view/View";

import SuggestionListView from "./SuggestionListView";

export default class PoiSearchView extends View
{
    metadata = {
        properties: {
            poi: { type: "object", bindable: true }
        },
        events: {
            input: { parameters: {keyword: { type: "string" } } },
            search: { parameters: {keyword: { type: "string" } } },
            focus: {},
            blur: {}
        }
    };

    init()
    {
        super.init();
        this.addStyleClass("mb-search-view");

        this.$input = $(`<input type=search placeholder="搜索">`);
        this.$element.append(this.$input);

        this.$element.append(`<span class="icon iconfont icon-search"/>`);

        this.inputDelay = null;
        this.$input.on("input",this._oninput.bind(this));
        this.$element.on("keydown", this._keydown.bind(this));

        this._initSuggestionListView();

        this.$input.on("focus", () => {
            this.fireFocus();
        });
        this.$input.on("blur", () => {
            this.fireBlur();
        });
    }

    _initSuggestionListView()
    {
        this.suggestionListView = new SuggestionListView();
        this.addSubview(this.suggestionListView);
        this.suggestionListView.hideSuggestion();
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
        if (poi && poi.name)
        {
            this.$input.val(poi.name);
        }
        else
        {
            this.$input.val("");
        }
    }

    _oninput(e)
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

    _keydown(e)
    {
        if (e.keyCode === 13)
        {
            const keyword = this.$input.val();
            if (keyword) {
                this.fireSearch({
                    keyword: keyword
                });
            }
        }
    }


}
