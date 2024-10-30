import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import "@arcgis/core/assets/esri/themes/light/main.css";
import LayerList from "@arcgis/core/widgets/LayerList";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import {healthFacilityConfig, populationDensityConfig} from "./utils.jsx";
import {addComparisonWidget, widgetContainerStyle} from "./widget.jsx";
import Legend from "@arcgis/core/widgets/Legend.js";
import Search from "@arcgis/core/widgets/Search";


const Map = () => {
    const map = useRef(null);
    useEffect(() => {
        if (map.current) {
            try{
            const webMap = new WebMap({
                basemap: "dark-gray",
            })
            // Add Vector Layers
            const healthFacilities = new GeoJSONLayer(healthFacilityConfig);
            const popDensity = new GeoJSONLayer(populationDensityConfig);


            webMap.add(popDensity);
            webMap.add(healthFacilities);
            const view = new MapView({
                container: map.current,
                map: webMap,
                center: [25.0136, 58.5953],
                zoom: 10,
                maxZoom: 20
            });

            // Legend for Population
            const legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: popDensity,
                    title: "",
                },
                    {layer: healthFacilities}
                ]
            });
            view.ui.add(legend, "bottom-right");

            const searchWidget = new Search({
                view: view,
                sources: [
                    {
                        layer: healthFacilities,
                        searchFields: ["name"],
                        displayField: "name",
                        exactMatch: false,
                        outFields: ["*"],
                        name: "Health Facilities",
                        placeholder: "Search for health facilities by name",
                    }
                ]
            });
            view.ui.add(searchWidget, "top-right");

            // Select Basemap and Layer List
            const basemapGallery = new BasemapGallery({
                    view: view
                });
            const basemapExpand = new Expand({
                    view: view,
                    content: basemapGallery,
                    expandIconClass: "esri-icon-basemap",
                    expanded: false,
            });
            view.ui.add(basemapExpand, "top-left");

            const layerList = new LayerList({
                view: view
            });
            view.ui.add(layerList, "top-right");
            view.when(() => {
                addComparisonWidget(view, healthFacilities, popDensity);
            });


            return () => {if (view) view.destroy();}
            } catch (error){
                console.error(error);
            }
        }
    }, []);

    return <>
        <div style={{height: "100vh", width: "100%"}} ref={map}></div>
        <div id="comparison-widget" style={widgetContainerStyle}></div>
    </>;
}


export default Map;