import BaseListView from "sap/a/view/BaseListView";

export default class SuggestionListView extends BaseListView
{
    metadata = {
        events: {
            selectedPoiChanged: { parameters: { selectedPoi: "object" } }
        }
    };

    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-suggestion-list-view");
        this.attachItemClick(this._on_suggestion_click.bind(this));
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

    _on_suggestion_click(e)
    {
        const item = e.getParameters().item;
        const selectedPoi = {
            name: item.name,
            location: item.location
        };
        this.fireSelectedPoiChanged({
            selectedPoi
        });
    }
}
