import {Button} from "@mui/material";
import {DeclaredComponent, declareState} from "../../../Tools/Toolbox";


class ButtonSubmit extends DeclaredComponent {

    roomNotFound = {
        "title": "Cannot Get Directions",
        "body": (
            <p>
                This class does not meet in person today. Google Maps directions are only available for classes that
                have a scheduled, in-person meeting time.
            </p>
        )
    }

    constructor(props) {
        super(props);
        this.first = true;
        this.state = {
            course: null,
            section: null,
            class: null,
            day: null,
            building_codes: {}
        }
    }

    onDeclareState(stateChange, stateKeys) {
        let states = Object.keys(this.state);

        for (let key of stateKeys) {
            if (states.includes(key)) {
                let changeList = {};
                changeList[key] = stateChange[key]
                this.setState(changeList);
                break;
            }
        }
    }

    #buildMapsQuery() {

        // Get the building code
        let buildingCode = this.state.day?.["room"]?.trim()?.split(" ")?.[0];

        // Parse for building name
        let buildingName = this.state.building_codes?.[buildingCode];
        if (!buildingName) return null;

        // Return value
        let query = `${buildingName}, York University`
        return `https://www.google.com/maps/dir/?api=1&travelmode=walking&dir_action=navigate&destination=${encodeURIComponent(query)}`
    }

    render() {

        let direction = this.#buildMapsQuery();

        return (
            <Button
                disabled={!(this.state.class && this.state.course && this.state.section && this.state.day)}
                variant="contained"
                onClick={() => direction ? window.open(direction) : declareState({errorModal: this.roomNotFound})}
                style={{...this.props.style, ...{"width": "100%"}}}>Get Walking Directions
            </Button>
        )
    }

}

export default ButtonSubmit;
