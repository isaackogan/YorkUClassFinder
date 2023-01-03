import L from "leaflet";
import {convertTime} from "../../Tools/Toolbox";
import zIndex from "@mui/material/styles/zIndex";
import {createControlComponent} from "@react-leaflet/core";

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function getMeIcon() {
    let html = (`
        <div style="z-index: ${zIndex}">
            <div style="display: flex; align-items: center; justify-content: center; background-color: rgba(78,150,246,0.39); border: 1px solid rgba(83,149,236,0.38)" class="outerIconDiv">
                <div style="border: 2px solid white; width: 50%; height: 50%; background-color: rgb(74,119,222);" class="innerIconDiv">
                </div>
            </div>
        </div>
    `);

    return L.divIcon({
        iconSize: [26, 26],
        iconAnchor: [13, 0],
        popupAnchor: [0, -35],
        html: html,
        className: ''
    })

}

function getDestinationIcon(text, color, zIndex = "0") {

    let html = (`
        <div style="z-index: ${zIndex}">
            <div style="width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; background-color: rgb(0,0,0); border: 1px solid rgba(83,149,236,0.38)" class="outerIconDiv">
                <div style="border: 4px solid #ffffff; width: 33%; height: 33%; background-color: rgb(0,0,0);" class="innerIconDiv">
                    <img alt="" src="/marker.png" style="width: 35px; height: 35px; opacity: 1; z-index: 1000; margin-top: -33px;"/>
                </div>
            </div>
        </div>
    `);

    return L.divIcon({
        iconSize: [20, 20],
        iconAnchor: [10, 0],
        popupAnchor: [0, -59],
        html: html,
        className: ''
    })


}

function getPopUpDiv(params, onClick) {

    return (`
        <div class="popUpDiv">
             <p style="margin-bottom: 12px;"><strong style="font-weight: 700; ">${params.get("building")}</strong></p>
                 <p style="text-decoration: underline; margin-bottom: 12px;">Course Information</p>
             <p><strong>Code:</strong> ${params.get('courseCode')}</p>          
             <p><strong>Time:</strong> ${convertTime(params.get("time"))}</p>
             <p><strong>Duration:</strong> ${params.get("duration")}</p>
             <p><strong>Room:</strong> ${params.get("room")}</p>
             <button class="popupDivButton" onclick="${onClick};">SEE PICTURE</button>
        </div>
    `);
}

function getPopUpDiv2(params, onClick) {

    return (`
        <div class="popUpDiv">
             <p style="margin-bottom: 12px;"><strong style="font-weight: 700; ">Your Current Location</strong></p>
             <p style="text-decoration: underline; margin-bottom: 12px;">Course Information</p>
             <p><strong>Code:</strong> ${params.get('courseCode')}</p>          
             <p><strong>Building:</strong> ${params.get("building")}</p>
             <p><strong>Time:</strong> ${convertTime(params.get("time"))}</p>
             <p><strong>Duration:</strong> ${params.get("duration")}</p>
             <p><strong>Room:</strong> ${params.get("room")}</p>
             <div id="routeInfo">
             </div>
             <button class="popupDivButton" onclick="${onClick};">SEE PICTURE</button>
        </div>
    `);

}

//     {color: "rgba(46,154,236,0.77)", weight: 8, opacity: 0.9, dashArray: '0.5,12'},
const lineStyles = [
    {color: 'rgba(24,105,211,1)', opacity: 1, weight: 10, dashArray: '0.5,12'},
    {color: 'rgba(0,176,255,1)', opacity: 1, weight: 7, dashArray: '0.5,12'}
]


function createRoutineMachineLayer(props) {
    let start = new Coordinate(props.sx, props.sy);
    let end = new Coordinate(props.ex, props.ey);

    // noinspection UnnecessaryLocalVariableJS
    let control = L["Routing"].control({
        waypoints: [L.latLng(start.x, start.y), L.latLng(end.x, end.y)],
        lineOptions: {styles: lineStyles},
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        watch: true,
        serviceUrl: "https://routing.openstreetmap.de/routed-foot/route/v1/",
        createMarker: function (i, wp) {
            let building = props.params.get('building');
            let image = props.params.get('picture');

            let popupExpression = (
                `document.dispatchEvent(new CustomEvent('mapImageModal',{detail: {building: '${building}', image: '${image}'}}));`
            );

            let popUpCustomStyle = {
                "className": "popupCustom"
            }

            if (wp.latLng.lat === start.x && wp.latLng.lng === start.y) {
                return L
                    .marker(wp.latLng, {icon: getMeIcon()})
                    .bindPopup(getPopUpDiv2(props.params, popupExpression), popUpCustomStyle);
            }

            if (wp.latLng.lat === end.x && wp.latLng.lng === end.y) {


                return L
                    .marker(wp.latLng, {icon: getDestinationIcon('END', 'rgb(94,125,186)', 69420)})
                    .bindPopup(getPopUpDiv(props.params, popupExpression), popUpCustomStyle);
            }

            return null;
        },

    });

    control.on("routesfound", (event) => {
        document.dispatchEvent(new CustomEvent("routeInfo", {detail: event}));
    })

    return control;
}

export default createControlComponent(createRoutineMachineLayer);
