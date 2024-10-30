import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";

export const populationDensityConfig = {
    title: 'Population',
    outFields: ["*"],
    url: "/kontour_pop_wgs.geojson",
    renderer: new SimpleRenderer({
        symbol: {
            type: "simple-fill",
            color: [255, 255, 255, 0],
            outline: 'black',
        },
        visualVariables: [
            {
                type: "color",
                field: "population",
                stops: [
                    { value: 0, color: "#4B0082" },    // Dark purple
                    { value: 50, color: "#5B006E" },
                    { value: 100, color: "#6C005A" },
                    { value: 150, color: "#7C0046" },
                    { value: 200, color: "#8B0033" },
                    { value: 250, color: "#9A0028" },
                    { value: 300, color: "#A9001D" },
                    { value: 350, color: "#B80012" },
                    { value: 400, color: "#C70008" },
                    { value: 500, color: "#8B0000" }   // Dark red
                ]
            }
        ]
    })
}


export const healthFacilityConfig = {
    url: "/est_health_facilities.geojson",
    outFields: ["*"],
    renderer: new SimpleRenderer({
        symbol: {
            type: "simple-marker",
            style: "cross",
            size: 12,
            color: "#007acc",
            outline: {
                color: "#147fe5",
                width: 2
            }
        }
    }),
    title: "Health Facilities",
    featureReduction: {
        type: "cluster",
        clusterRadius: "100px",
        popupTemplate: {
            title: "{cluster_count} Health Facilities",
            content: "This cluster contains {cluster_count} health facilities."
        },
        labelingInfo: [{
            deconflictionStrategy: "none",
            labelExpressionInfo: { expression: "$feature.cluster_count" },
            symbol: {
                type: "text",
                color: "white",
                font: {
                    weight: "bold",
                    size: "12px"
                }
            }
        }]
    }
}