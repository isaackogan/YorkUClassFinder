import React, {Component} from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import styled from "styled-components";
import "leaflet-routing-machine";
import MapImage from "./MapImage";
import ReactDOM from 'react-dom/client';
import RouteInfo from "./RouteInfo";
import RouteMachine from "./RouteMachine";

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

class Map extends Component {

    constructor(props) {
        super(props);

        // Parse Parameters
        this.interval = null;
        this.params = this.parseUrlQuery();
        this.dirRoot = null;
        this.first = true;

        if (!this.params) {
            return this.raiseError(
                encodeURIComponent("Failed to parse maps query. Did you break something? You shouldn't break things.")
            );
        }

        // Default state
        this.state = {ex: this.params.get("lat"), ey: this.params.get("lng"), sx: null, sy: null,}

    }

    raiseError(message) {
        try {
            clearInterval(this.interval)
        } catch(ex) {
        }

        // B64encode the message
        window.location.href = `/#${btoa(`error=${message}`)}`;

    }

    parseUrlQuery() {
        let url = new URL(window.location.href);
        let query;

        // Parse query
        try {
            query = atob(url.searchParams.get("q"))
        } catch (ex) {
            console.log("[DEBUG] Failed to parse search query");
        }

        // Check validity
        if (!query) return null;

        // Assign sx & sy values
        let params = new URLSearchParams(query);
        params.set("sx", url.searchParams.get("sx"));
        params.set("sy", url.searchParams.get("sy"));
        return params;

    }

    componentDidMount() {
        if (!this.first) return;
        this.first = false;
        this.getLocation(this);
        this.interval = setInterval(this.getLocation.bind(this), 5000);
        document.addEventListener("routeInfo", (event) => setTimeout(() => this.onRouteInfo(event.detail)));
    }

    onRouteInfo(info) {

        let controlContainer = document.getElementsByClassName("leaflet-control-container")?.[0];
        let topRightContainer = controlContainer.getElementsByClassName("leaflet-top leaflet-right")?.[0];
        this.dirRoot = (this.dirRoot) || ReactDOM.createRoot(topRightContainer);
        this.dirRoot.render(<RouteInfo info={info}/>);

    }

    getLocation() {
        navigator.geolocation ? (
            navigator.geolocation.getCurrentPosition(this.onSuccessLocation.bind(this), this.onFailLocation.bind(this))
        ) : (
            this.onFailLocation()
        )
    }

    onSuccessLocation(position) {
        let coords = position.coords;

        if (coords.latitude === this.state.sx && coords.longitude === this.state.sy) {
            return;
        }

        // If it has changed, set the state so we can reroute
        this.setState({sx: coords.latitude, sy: coords.longitude});
    }

    onFailLocation() {

        // If no params provided
        if ((this.params.get("sx") === "null" || this.params.get("sy") === "null")) {
            this.raiseError(encodeURIComponent("Geolocation not available. Enable geolocation to use the web-map service."))
            return;
        }

        // Params won't change
        if (this.params.get("sx") === this.state.sx && this.params.get("sy") === this.state.sy) {
            return;
        }

        // Use the query params
        console.log("[DEBUG] Failed geolocation, using URL sx/sy parameters");
        this.setState({sx: this.params.get("sx"), sy: this.params.get("sy")});

    }

    render() {
        let machine = <div/>;

        if (this.state.sx && this.state.sy) {
            machine = <RouteMachine
                sx={parseFloat(this.state.sx)}
                sy={parseFloat(this.state.sy)}
                ex={parseFloat(this.state.ex)}
                ey={parseFloat(this.state.ey)}
                params={this.params}
            />;
        }

        return (
            <OuterContainer>
                <MapImage image={this.params.get('image')} building={this.params.get('building')}/>
                <MapContainer doubleClickZoom={false} id="mapId" zoom={16} center={[this.state.ex, this.state.ey]}>
                    <TileLayer
                        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                        maxzoom={20}
                        subdomains={['mt0','mt1','mt2','mt3']}
                    />
                    {machine}
                </MapContainer>
            </OuterContainer>

        );
    }

}

export default Map;
