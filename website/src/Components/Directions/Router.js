import L from "leaflet";
import {convertTime} from "../../Tools/Toolbox";
import zIndex from "@mui/material/styles/zIndex";

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function getDivIcon(text, color, zIndex = "0") {

    let html = (`
        <div style="z-index: ${zIndex}">
            <div class="outerIconDiv">
                <div style="background-color: ${color}" class="innerIconDiv">
                       <span class="innerIconText">
                         ${text}
                    </span>
                </div>
            </div>
        </div>
    `);

    return L.divIcon({
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -35],
        html: html,
        className: ''
    })

}

function getPopUpDiv(params, onClick) {

    return (`
        <div class="popUpDiv">
             <p style="margin-bottom: 12px;"><strong style="font-weight: 700; ">${params.get("building")}</strong></p>
             <p style="text-decoration: underline; margin-bottom: 12px;">${params.get('courseCode')}</p>
             <p><strong>Time:</strong> ${convertTime(params.get("time"))}</p>
             <p><strong>Duration:</strong> ${params.get("duration")}</p>
             <p><strong>Room:</strong> ${params.get("room")}</p>
             <button class="popupDivButton" onclick="${onClick}">SEE PICTURE</button>
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
             <button class="popupDivButton" onclick="${onClick};">SEE PICTURE</button>
        </div>
    `);

}


export default function createRoutineMachineLayer(props) {
    let start = new Coordinate(props.sx, props.sy);
    let end = new Coordinate(props.ex, props.ey);

    // noinspection UnnecessaryLocalVariableJS
    let control = L["Routing"].control({
        waypoints: [L.latLng(start.x, start.y), L.latLng(end.x, end.y)],
        lineOptions: {styles: [{color: "rgb(33,136,205)", weight: 8, opacity: 0.6}]},
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        watch: true,
        serviceUrl: "https://routing.openstreetmap.de/routed-foot/route/v1/",

        createMarker: function (i, wp, numberOfWaypoints) {
            let building = props.params.get('building');
            let image = props.params.get('picture');

            let popupExpression = (
                `document.dispatchEvent(new CustomEvent('mapImageModal',{detail: {building: '${building}', image: '${image}'}}));`
            );

            if (wp.latLng.lat === start.x && wp.latLng.lng === start.y) {
                return L
                    .marker(wp.latLng, {icon: getDivIcon('YOU', 'rgb(116,141,215)')})
                    .bindPopup(getPopUpDiv2(props.params, popupExpression));
            }

            if (wp.latLng.lat === end.x && wp.latLng.lng === end.y) {


                return L
                    .marker(wp.latLng, {icon: getDivIcon('END', 'rgb(94,125,186)', 69420)})
                    .bindPopup(getPopUpDiv(props.params, popupExpression));
            }

            return null;
        },

    });

    return control;
}
