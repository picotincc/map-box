import View from "sap/a/view/View";

export default class ODSearchView extends View
{
    metadata = {
        properties: {
            isDrawRoute: { type: "boolean", defaultValue: false }
        },
        events: {
            search: {},
            switch: {},
            clearRoute: {}
        }
    };
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-od-search-view");
        this._initLayout();
    }

    _initLayout()
    {
        const $searchSection = $(`
            <div class="search-section">
                <div class="icon-wrapper">
                    <span class="icon iconfont icon-switch"></span>
                </div>
            </div>
        `);
        $searchSection.on("click", "span", () => {
            this.fireSwitch();
        });
        const $searchViews = $(`
            <div class="search-views">
            </div>
        `);
        this.$container = $searchViews;
        const $querySection = $(`
            <div class="query-section">
                <span class="search-button">查询线路</span>
            </div>
        `);
        $querySection.on("click", "span", () => {
            this.fireSearch();
            this.setIsDrawRoute(true);
        });
        $searchSection.append($searchViews);
        this.$element.append($searchSection);
        this.$element.append($querySection);
    }

    setIsDrawRoute(value)
    {
        this.setProperty("isDrawRoute", value);
        if (!value)
        {
            this.fireClearRoute();
        }
    }

}
