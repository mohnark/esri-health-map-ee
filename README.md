
# ESRI Health Map EE

An interactive mapping application built with **React**, **Vite**, and **ESRI ArcGIS API**. The app provides a visualization of healthcare facilities and population density across Estonia, aiming to assist with healthcare planning and resource allocation. This README covers everything you need to understand the architecture, usage, and deployment of the application.

## Project Link

- **Live Application**: [ESRI Health Map EE](https://esri-health-map-ee.vercel.app/)

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Usage Guide](#usage-guide)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

## Overview

**ESRI Health Map EE** is designed for visualizing healthcare facilities and analyzing population distribution across Estonia. It leverages the ArcGIS API's robust mapping and geospatial capabilities within a responsive, React-based front end. This tool is intended to support healthcare and government agencies in assessing current infrastructure and planning resource distribution effectively.

## Features

- **Interactive Mapping**: Users can zoom, pan, and click on map markers for detailed information on each healthcare facility.
- **Layer Management**: Users can toggle between layers to view healthcare facility locations and population density overlays, providing a comprehensive spatial analysis.
- **Search and Filter Capabilities**: Quickly locate facilities based on location or facility type.
- **Responsive and Fast Loading**: Built with Vite for optimized performance and a smooth user experience on both desktop and mobile.
- **Data Updates**: Facility data can be updated dynamically without redeploying the app.

## Technologies Used

- **React**: For building a dynamic, component-based user interface.
- **Vite**: A fast development build tool, ensuring optimized and fast page loading.
- **ESRI ArcGIS API for JavaScript**: Provides mapping, visualization, and geospatial analysis functionalities.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** or **yarn** (for dependency management)

### Installation

1. **Clone the Repository**:
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   or, if using yarn:
   ```bash
   yarn install
   ```

3. **ESRI ArcGIS API Key**: Not Required
4. **Run the Application**:
   ```bash
   npm run dev
   ```
   or, if using yarn:
   ```bash
   yarn dev
   ```
   
### Build for Production

To create an optimized production build, run:
```bash
npm run build
```

### Key Components

- **Map Component**: Handles the ESRI map instance, configurations, and rendering of layers.
- **Facility Markers**: Custom markers indicating facility locations, with pop-ups showing detailed info.
- **Layer Management**: Toggles and displays specific data layers based on user selection.

## Usage Guide

1. **Navigate the Map**: Use zoom and pan features to explore different areas.
2. **Layer Controls**: Toggle between healthcare facility and population density layers for detailed analysis.
