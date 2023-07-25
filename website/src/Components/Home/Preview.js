
import styled from "styled-components";
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import ImageModal from "./Preview/ImageModal";
import {convertTime, declareState} from "../../Tools/Toolbox";
import DeclaredComponent from "../../Tools/DeclaredComponent";
import L from 'leaflet';
import React from "react";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 50vh;
`;

const Text = styled.span`
  display: block;
  width: 100%;
`;

const PopupTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

class Preview extends DeclaredComponent {

    constructor(props) {
        super(props);
        this.lastCoords = [43.7735, -79.50474900961275];
        this.first = true;
        this.state = {
            course: null,
            section: null,
            class: null,
            day: null,
            building_codes: {},
            zoom: 14.5,
            coordinates: this.lastCoords,
        }

        this.popupReference = React.createRef();

    }

    onDeclareState(stateChange, stateKeys) {
        let states = Object.keys(this.state);
        let changeList = null;

        // Check for changes
        for (let key of stateKeys) {
            if (states.includes(key)) {
                changeList = {};
                changeList[key] = stateChange[key]
                this.setState(changeList);
                break;
            }
        }

        // If no changes made
        if (changeList == null) return;

        // Build query URL
        let newState = {...this.state, ...changeList};
        let query = Preview.buildGeocodeQuery(newState);
        if (!query) return;
        let self = this;

        // Run the query & do updates
        fetch(query).then(r => r.json()).then(r => {

            // Get result
            let result = r?.[0];
            if (!result) return;

            // Should never happen, but just in case
            let lat = result["lat"];
            let lon = result["lon"];
            if (!(lat && lon)) return;

            this.lastCoords = this.state.coordinates;

            // Make sure we're not refreshing for nothing
            if (!(this.lastCoords[0] === lat && this.lastCoords[1] === lon)) {
                this.popupReference = React.createRef();
                self.setState({coordinates: [lat, lon], zoom: 18});
                declareState({mapCoords: {lat: lat, lng: lon}});
            }

        });
    }

    static buildGeocodeQuery(currentState) {

        // Get the building code
        let buildingCode = currentState.day?.["room"]?.trim()?.split(" ")?.[0];

        // Parse for building name
        let buildingName = currentState?.building_codes?.[buildingCode];
        if (!buildingName) return null;

        buildingName = buildingName
            .replaceAll(/[^a-zA-Z0-9 ]/g, "")
            .replaceAll("Glendon Campus", "")
            .replaceAll(" +", " ");

        // Return value
        let query = `${buildingName}, Toronto`
        return `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.allDataPresent()) {
            setTimeout(() => {
                this.popupReference.current?.openPopup();
            }, 500);
        }
    }

    render() {

        const icon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            className: "main-popup-icon"
        });

        return (
            <PreviewContainer>
                <MapContainer center={this.state.coordinates} zoom={this.state.zoom} scrollWheelZoom={false} style={{borderRadius: "3px"}}>
                    <MapController coordinates={this.state.coordinates} zoom={this.state.zoom} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker ref={this.popupReference} icon={icon} position={this.state.coordinates} >
                        <Popup maxWidth={"200"}>
                            {this.getPopupContent()}
                        </Popup>
                    </Marker>
                </MapContainer>
            </PreviewContainer>
        )
    }

    allDataPresent() {
        return this.state.class && this.state.course && this.state.section && this.state.day;
    }

    getPopupContent() {
        if (!this.allDataPresent()) {
            return "York University";
        }

        let buildingCode = this.state.day?.["room"]?.trim()?.split(" ")?.[0];

        return (
            <PopupTextBox>
                <Text style={{marginBottom: "5px", marginTop: "5px"}}><strong>{this.state.course}</strong></Text>
                <Text><strong>Time: </strong>{convertTime(this.state.day?.["time"]?.trim())}</Text>
                <Text><strong>Duration: </strong>{this.state.day["duration"] || "N/A"} min</Text>
                <Text><strong>Location: </strong>{this.state.day["room"]}</Text>
                <ImageModal desc={this.state.building_codes[buildingCode]} src={`https://yorkapi.isaackogan.com/v1/main/home/building-images?code=${buildingCode}`} />
            </PopupTextBox>
        )

    }

}

function MapController({coordinates, zoom}) {

    const map = useMap();

    if (coordinates?.length === 2) {
        map.setView(coordinates, zoom);
    }

    return null;

}


export default Preview;
