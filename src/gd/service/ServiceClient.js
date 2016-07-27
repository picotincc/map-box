import ManagedObject from "sap/ui/base/ManagedObject";

//定义一些常量
const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;


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
        AMap.service(["AMap.Driving", "AMap.Autocomplete", "AMap.Geocoder"], () => {
            const options = {
                city: "南京市"
            };
            this.driving = new AMap.Driving(options);
            this.autocomplete = new AMap.Autocomplete(options);
            this.geocoder = new AMap.Geocoder(options);
            setTimeout(() => {
                this.fireReady();
            });
        });
        // console.log(this.driving);
    }

    afterInit()
    {
        super.afterInit();
    }


    searchPoiAutocomplete(keyword)
    {
        return new Promise((resolve, reject) => {
            this.autocomplete.search(keyword, (status, result) => {
                if (status === "complete" && result.info === "OK")
                {
                    const tips = result.tips;
                    const resultTips = tips.map(tip => {
                        tip.location = this.convertToWgs84(tip.location);
                        return tip;
                    });
                    resolve(resultTips);
                }
                else
                {
                    reject({
                        status,
                        info: result.info
                    });
                }

            });
        });
    }


    searchDrivingRoute(locations)
    {
        return new Promise((resolve, reject) => {
            const locs = locations.map((latlng) => {
                return new AMap.LngLat(latlng[1], latlng[0]);
            });
            AMap.convertFrom(locs, "gps", (status, result) => {
                if (status === "complete" && result.info === "ok")
                {
                    const startLocation = [ result.locations[0].lng, result.locations[0].lat];
                    const endLocation = [ result.locations[1].lng, result.locations[1].lat];
                    this.driving.search(startLocation, endLocation, (status, result) => {
                        if (status === "complete" && result.info === "OK")
                        {
                            result.routes[0].steps.map(step => {
                                step.path = step.path.map(pathPoint => {
                                    return this._gcj02towgs84(pathPoint.lng, pathPoint.lat);
                                });
                                return step;
                            });
                            resolve(result.routes[0]);
                        }
                        else
                        {
                            reject({
                                status,
                                result: result.info
                            });
                        }
                    });
                }
                else
                {
                    reject({
                        status,
                        result: result.info
                    });
                }
            });
        });
    }

    searchAddress(latlng)
    {
        const loc = this._wgs84togcj02(latlng.lng, latlng.lat);
        const locTo = new AMap.LngLat(loc[1], loc[0]);
        return new Promise((resolve, reject) => {
            this.geocoder.getAddress(locTo, (status, result) => {
                if (status === "complete" && result.info === "OK")
                {
                    // console.log(status);
                    // console.log(result);
                    resolve(result.regeocode);
                }
                else
                {
                    reject({
                        status,
                        result: result.info
                    });
                }
            });
        });
    }

    convertToWgs84(location)
    {
        const resultLoc = this._gcj02towgs84(location.lng, location.lat)
        return resultLoc;
    }



    /**
     * WGS84转GCj02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    _wgs84togcj02(lng, lat)
    {
        //判断是否在中国
        if (this._out_of_china(lng, lat))
        {
            return [lng, lat]
        }
        else
        {
            var dlat = this._transformlat(lng - 105.0, lat - 35.0);
            var dlng = this._transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglat = lat + dlat;
            var mglng = lng + dlng;
            return [mglat, mglng];
        }
    }


    /**
     * GCJ02 转换为 WGS84
     * @param lng
     * @param lat
     * @returns {*[]}
     */
     _gcj02towgs84(lng, lat) {
        if (this._out_of_china(lng, lat))
        {
            return [lng, lat]
        }
        else
        {
            var dlat = this._transformlat(lng - 105.0, lat - 35.0);
            var dlng = this._transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglat = lat + dlat;
            var mglng = lng + dlng;
            return { lat: lat * 2 - mglat, lng: lng * 2 - mglng };
            // return [lng * 2 - mglng, lat * 2 - mglat]
        }
    }

    _transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    }

    _transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    }

    _out_of_china(lng, lat) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    }


}
