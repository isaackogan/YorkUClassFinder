import {Autocomplete, TextField} from "@mui/material";
import {declareState} from "../../../Tools/Toolbox";
import DeclaredComponent from "../../../Tools/DeclaredComponent";

class ClassSearch extends DeclaredComponent {

    daysNotFound = {
        "title": "Cannot Get Directions",
        "body": (
            <p>
                This class does not have any scheduled meeting days. You will not be able to continue.
                Select a different class to continue.
            </p>
        )
    }

    constructor(props) {
        super(props);
        this.state = {classes: [], value: null}
    }

    onDeclareState(stateChange, keys) {
        // If course name changes
        if (keys.includes("section")) {
            this.clearValue();
        }

        // Should be our key
        if (!keys.includes("classes")) return;

        // Update classes
        stateChange = {classes: stateChange.classes};
        this.setState(stateChange);

    }

    handleChange(event, change) {
        this.setState({value: change});
        declareState({class: change});

        // When the course changes, get the new course schedule
        if (change) {
            let classy = this.state.classes.filter(classy => this.getQualifiedName(classy) === change);
            let days = (classy?.[0]?.["schedule"] || []).filter(data => Boolean(data?.day));

            if (days.length < 1) {
                declareState({errorModal: this.daysNotFound});
            }

            declareState({days: days});
        } else {
            declareState({days: []});
        }


    }

    clearValue() {
        this.setState({value: null, classes: []});
        declareState({class: null});
    }

    getQualifiedName(classy) {
        return `${classy["type"]}-${classy["meet"]}`
    }

    render() {

        let optionList = []
        for (let classy of this.state.classes || []) {
            optionList.push(this.getQualifiedName(classy))
        }

        return (
            <div style={this.props.style}>
                <Autocomplete
                    id="class-search-input"
                    disablePortal
                    disabled={(this.state.classes?.length || 0) < 1}
                    onChange={this.handleChange.bind(this)}
                    options={optionList}
                    sx={this.baseStyle}
                    value={this.state.value}
                    renderInput={(params) => <TextField {...params} label="Class" />}
                />
            </div>
        )
    }

}

export default ClassSearch;
