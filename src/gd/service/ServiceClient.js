import ManagedObject from "sap/ui/base/ManagedObject";



export default class ServiceClient extends ManagedObject
{
    metadata = {
        events: {
            ready: {}
        }
    };

    static _instance = null;

    static getInstance()
    {
        if (gd.service.ServiceClient._instance === null)
        {
            gd.service.ServiceClient._instance = new gd.service.ServiceClient();
        }
        return gd.service.ServiceClient._instance;
    }

    init()
    {
        //super.init();
        AMap.service("AMap.Driving", () => {
            setTimeout(() => {
                this.driving = new AMap.Driving({
                    city: "南京市"
                });
                this.fireReady();
            });
        });
        // console.log(this.driving);
    }

    afterInit()
    {
        super.afterInit();
    }
}
