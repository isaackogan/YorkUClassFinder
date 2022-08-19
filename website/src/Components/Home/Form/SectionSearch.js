import {Autocomplete, TextField} from "@mui/material";
import {declareState, DeclaredComponent} from "../../../Tools/Toolbox";

class SectionSearch extends DeclaredComponent {

    constructor(props) {
        super(props);
        this.state = {sections: [], value: null}
    }

    onDeclareState(stateChange, keys) {
        // If course name changes
        if (keys.includes("course")) this.clearValue();

        // Only care about sections
        if (!keys.includes("sections")) return;

        // Update session
        stateChange = {sections: stateChange.sections || []};
        this.setState(stateChange);
    }

    handleChange(event, change) {

        // Must declare first before declaring classes (race condition)
        this.setState({value: change});
        declareState({section: change});

        // When the course changes, get the new course schedule
        if (change) {
            let section = Object.fromEntries(Object.entries(this.state.sections).filter(([key]) => key === change));
            declareState({classes: section?.[change]?.classes || []});
        } else {
            declareState({classes: []});
        }

    }

    clearValue() {
        this.setState({value: null, sections: []});
        declareState({section: null});
    }

    render() {

        return (
            <div style={this.props.style}>
                <Autocomplete
                    disablePortal
                    disabled={this.state.sections.length < 1}
                    id="section-search-input"
                    onChange={this.handleChange.bind(this)}
                    options={Object.keys(this.state.sections)}
                    sx={this.baseStyle}
                    value={this.state.value}
                    renderInput={(params) => <TextField {...params} label="Section" />}
                />
            </div>
        )
    }

}

export default SectionSearch;
