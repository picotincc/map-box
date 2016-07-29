import View from "sap/a/view/View";

export default class ODSearchView extends View
{
    metadata = {
        events: {
            search: {  }
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
        });
        $searchSection.append($searchViews);
        this.$element.append($searchSection);
        this.$element.append($querySection);
    }








}
