import BaseListView from "sap/a/view/BaseListView";

export default class SuggestionListView extends BaseListView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-suggestion-list-view");
    }

    showSuggestion()
    {
        this.$element.show();
    }

    hideSuggestion()
    {
        this.$element.hide();
    }

    toggleSuggestion(shown)
    {
        if (shown)
        {
            this.showSuggestion();
        }
        else
        {
            this.hideSuggestion();
        }
    }
}
