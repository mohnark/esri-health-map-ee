export const widgetContainerStyle = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    padding: "15px",
    width: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

export function addComparisonWidget(view, layer, densityLayer) {
    async function queryPopulationDensity(point, densityLayer) {
        const query = densityLayer.createQuery();
        query.geometry = point;
        query.spatialRelationship = "intersects";
        query.outFields = ["population"];
        const result = await densityLayer.queryFeatures(query);
        return result.features[0]?.attributes.population || "N/A";
    }


    const container = document.getElementById("comparison-widget");

    const title = document.createElement("h3");
    title.textContent = "Compare Health Facilities";
    title.style.marginTop = "0";
    title.style.fontSize = "16px";
    title.style.fontWeight = "bold";
    container.appendChild(title);

    const selectInfo = document.createElement("p");
    selectInfo.textContent = "Click on a Health Facility to Compare";
    container.appendChild(selectInfo);

    const comparisonContainer = document.createElement("div");
    comparisonContainer.style.display = "flex";
    comparisonContainer.style.gap = "10px";
    container.appendChild(comparisonContainer);

    const hospital1Div = document.createElement("div");
    hospital1Div.id = "hospital1";
    hospital1Div.style.width = "50%";
    hospital1Div.style.padding = "5px";
    hospital1Div.style.borderRight = "1px solid #ddd";
    comparisonContainer.appendChild(hospital1Div);
    const hospital2Div = document.createElement("div");
    hospital2Div.id = "hospital2";
    hospital2Div.style.width = "50%";
    hospital2Div.style.padding = "5px";
    comparisonContainer.appendChild(hospital2Div);

    //Remove Any Selections
    function clearHospitals() {
        selectedHospitals.length = 0;
        updateUI();
    }
    const clearButton = document.createElement("button");
    clearButton.style.marginTop = "10px";
    clearButton.style.width = "30px";
    clearButton.style.height = "30px";
    clearButton.style.backgroundColor = "transparent";
    clearButton.style.border = "none";
    clearButton.style.cursor = "pointer";
    clearButton.title = "Refresh";

    clearButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.17-.33 2.26-.91 3.17l1.46 1.46C19.34 14.66 20 13.39 20 12c0-4.42-3.58-8-8-8zm-6.09 8c0-1.17.33-2.26.91-3.17L5.36 7.36C4.66 8.66 4 9.93 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z" fill="#00aaff"/>
    </svg>
   `;

    clearButton.onclick = clearHospitals;
    container.appendChild(clearButton);


    const selectedHospitals = [];

    view.on("click", async (event) => {
        const response = await view.hitTest(event);
        const results = response.results.filter(result => result.graphic.layer === layer);
        if (results.length) {
            const hospitalGraphic = results[0].graphic;
            const population = await queryPopulationDensity(event.mapPoint, densityLayer);
            hospitalGraphic.attributes.population = population;
            addHospitalToComparison(hospitalGraphic.attributes);
        }
    });

    function addHospitalToComparison(attributes) {
        if (selectedHospitals.length < 2) {
            selectedHospitals.push(attributes);
        } else {
            selectedHospitals[0] = selectedHospitals[1];
            selectedHospitals[1] = attributes;
        }
        updateUI();
    }

    function updateUI() {
        hospital1Div.innerHTML = selectedHospitals[0]
            ? formatHospitalInfo(selectedHospitals[0])
            : "<em>Select a facility</em>";

        hospital2Div.innerHTML = selectedHospitals[1]
            ? formatHospitalInfo(selectedHospitals[1])
            : "<em>Select a facility</em>";
    }
    updateUI();

    function formatHospitalInfo(hospital) {
        return `
            <h4 style="margin: 0; font-size: 15px; color: #007acc;">${hospital.name}</h4>
            <p><b>Surrounding Population:</b> ${hospital.population}</p>
            <p><b>Amenity:</b> ${hospital.amenity}</p>
            <p><b>Healthcare:</b> ${hospital.healthcare}</p>
        `;
    }
}
