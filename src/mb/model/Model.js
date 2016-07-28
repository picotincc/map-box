import JSONModel from "sap/ui/model/json/JSONModel";

export default class Model extends JSONModel
{
    constructor(...args)
    {
        super({
            selectedPoi: null,
            queryPoi: null
        });
        this.init();
    }

    init()
    {
        
    }


}
