import View from "./View";

export default class ListView extends View
{

    metadata = {
        properties: {
            items: { type: "object", bindable: true }
            selection: { type: "object" }
        },
        events: {
            itemClick: { parameters: {} }
        }
    };

    afterInit()
    {
        super.afterInit();
        this.addStyleClass("sap-a-list-view");

        this._$itemTemplates = null;
        this._initLayout();
        this.$container.on("click", this.getItemElementTag(), this._onclick.bind(this))
    }

    _initLayout()
    {

    }

    getElementTag()
    {
        return "ul";
    }

    getItemElementTag()
    {
        return "li";
    }

    setItems(value)
    {
        this.clearItems();
        this.setProperty("items", value);
        if (value)
        {
            this.addItems(value);
        }
    }

    setSelection(value)
    {
        this.setProperty("items", value);

        if (value)
        {
            this.selectItem(value);
        }
    }

    getSelectedId()
    {
        return this.getIdOfItem(this.selection);
    }

    setSelectedId(value = null)
    {
        if (value === null)
        {
            this.getSelection() = null;
        }
        else
        {
            const $item = this.$getItem(value);
            if ($item.length > 0)
            {
                const item = $item.data("item");
                if (item)
                {
                    this.setSelection(item);
                }
            }
        }

    }

    getTypeOfItem(item)
    {
        return 0;
    }

    getIdOfItem(item)
    {
        if (item)
        {
            return item.id;
        }
        else
        {
            return null;
        }

    }

    removeAllItems()
    {
        this.setSelection(null);
        const items = this.getItems();
        if (items !== null)
        {
            if(items.length > 0)
            {
                items.splice(0, items.length);
                this.$container.children(this.getItemElementTag()).remove();
            }
        }
        else
        {
            this.setItems([]);
        }
    }

    addItems(items)
    {
        if (items && items.length)
        {
            items.forEach(item => {
                this.addItem(item);
            });
        }
    }

    addItem(item)
    {
        this.items.push(item);

        const $item = this.$createItem(this.getTypeOfItem(item));
        this.renderItem(item, $item);
        this.$container.append($item);
    }


    selectItem(item = null)
    {
        if (this.selection === item) return;

        if (this.selection !== null)
        {
            this.$getItem(this.selection).removeClass("selected");
            this._selection = null;
        }

        this._selection = item;

        if (item)
        {
            const $item = this.$getItem(item);
            $item.addClass("selected");
            //this.trigger("selectionchanged");
        }

        this.trigger("selectionchanged");
    }

    showSelection()
    {
        this.removeStyleClass("hide-selection");
    }

    hideSelection()
    {
        this.addStyleClass("hide-selection");
    }











    renderItem(item, $item)
    {
        $item.data("item", item);
        $item.attr("id", "i-" + this.getIdOfItem(item));
    }

    $createItem(itemType = 0)
    {
        if (!this._$itemTemplates[itemType])
        {
            this._$itemTemplates[itemType] = this.$createNewItem(itemType);
        }
        return this._$itemTemplates[itemType].clone();
    }


    $createNewItem(itemType = 0)
    {
        return $(`<${this.getItemElementTag()}/>`);
    }

    $getItem(item)
    {
        const id = this.getIdOfItem(item);
        return this.$container.children("#i-" + id);
    }



    _onclick(e)
    {
        const $item = $(e.currentTarget);
        const item = $item.data("item");
        this.selectItem(item);
    }

}
