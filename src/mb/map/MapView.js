import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";

import NaviLayer from "./layer/NaviLayer";

export default class MapView extends AdaptiveMapView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
    }

    initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        // this.exampleLayer = new ExampleLayer({
        //     startLocation: [ 31.9790247, 118.7548084 ],
        //     endLocation: [ 32.04389, 118.77881 ]
        // });
        // this.addLayer(this.exampleLayer);
        // this.exampleLayer.drawRoute();

        this.naviLayer = new NaviLayer({
            startLocation: [ 31.9790247, 118.7548084 ],
            endLocation: [ 32.04389, 118.77881 ]
        });

        this.addLayer(this.naviLayer);
        this.naviLayer.fitBounds();

    }

    searchRoute(startLocation, endLocation)
    {
        this.naviLayer.applySettings({
            startLocation,
            endLocation
        });

        ServiceClient.getInstance().searchDrivingRoute([ startLocation, endLocation ]).then((result) => {
            this.naviLayer.drawRoute(result.steps);
        });


        // driving.search(change84ToHuoxing(startLocation), change84ToHuoxing(endLocation), (status, result) => {
        //     //TODO 解析返回结果，自己生成操作界面和地图展示界面
        //     if (status === "complete" && result.info === "OK")
        //     {
        //         this.exampleLayer.drawRoute(result.routes[0]);
        //         this.exampleLayer.fitBounds();
        //     }
        // });
        // driving.search(CoordinateUtil.wgs84togcj02(startLocation[1], startLocation[0]), CoordinateUtil.wgs84togcj02(endLocation[1], endLocation[0]), (status, result) => {
        //     //TODO 解析返回结果，自己生成操作界面和地图展示界面
        //     if (status === "complete" && result.info === "OK")
        //     {
        //         this.exampleLayer.drawRoute(result.routes[0]);
        //         this.exampleLayer.fitBounds();
        //     }
        // });



    }

}


//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

function change84ToHuoxing(location, inChina = false)
{


    var lat = location[0];
    var lng = location[1];

    //判断是否在中国
    if (inChina)
    {
        return [lng, lat]
    }
    else
    {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat]
    }
}

function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}
