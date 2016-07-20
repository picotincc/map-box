import AdaptiveApplication from "sap/a/app/Application";

export default class Application extends AdaptiveApplication
{
    init()
    {
        super.init();
        this.addStyleClass("mb-app");
    }
}
