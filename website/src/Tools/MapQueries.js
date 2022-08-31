
function modifyQuery(props) {
    props.buildingCode = props.day?.["room"]?.trim()?.split(" ")?.[0];
    props.buildingName = props.building_codes?.[props.buildingCode];
    if (!props.buildingName) return null;

    props.location = `${props.buildingName}, York University`;
    props.locationQuery = encodeURIComponent(props.location);
    return props;

}

export function buildGoogleMapsQuery(props) {
    props = modifyQuery(props);
    if (!props) return null;

    return `https://www.google.com/maps/dir/?api=1&travelmode=walking&dir_action=navigate&destination=${props.locationQuery}`;
}

export function buildWazeQuery(props) {
    props = modifyQuery(props);
    if (!props) return null;

    return `https://waze.com/ul?navigate=yes&q=${props.locationQuery}`;
}

export function buildAppleMapsQuery(props) {
    props = modifyQuery(props);
    if (!props) return null;

    return `https://maps.apple.com/?dirflg=w&z=20&t=k&q=${props.locationQuery}`;
}

export function buildOSMQuery(props) {
    props = modifyQuery(props);
    if (!props) return null;

    let buildingCode = props?.day?.["room"]?.trim()?.split(" ")?.[0];

    // Invalid coords default to YorkU
    let lat, lng;
    if (props.mapCoords.lat && props.mapCoords.lng) {
        lat = props.mapCoords.lat;
        lng = props.mapCoords.lng;
    } else {
        lat = "43.773353";
        lng = "-79.502340";
    }

    let internalQuery = {
        picture: null,
        courseCode: props.course,
        query: `${props.buildingName}, Toronto`,
        lat: lat,
        lng: lng,
        day: props.day.day,
        duration: props.day.duration,
        room: props.day.room,
        time: props.day.time,
        building: props.buildingName,
        image: `https://yorkapi.isaackogan.com/v1/main/home/building-images?code=${buildingCode}`
    };

    return `/directions?q=${btoa(new URLSearchParams(internalQuery).toString())}`;

}
