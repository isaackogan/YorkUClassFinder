import {Autocomplete, TextField} from "@mui/material";
import {declareState} from "../../../Tools/Toolbox";
import DeclaredComponent from "../../../Tools/DeclaredComponent";

class SectionSearch extends DeclaredComponent {

    constructor(props) {
        super(props);
        this.state = {sections: null, value: null}
    }

    onDeclareState(stateChange, keys) {
        this.searchParamParse(stateChange, keys);

        // If course name changes
        if (keys.includes("course")) this.clearValue();

        // Only care about sections
        if (!keys.includes("sections")) return;

        // Update sections
        stateChange = {sections: stateChange.sections || null};
        this.setState(stateChange);

        // Automatically fill if only one option
        stateChange.sectionKeys = Object.keys(stateChange.sections);
        if (stateChange.sectionKeys.length === 1) {
            stateChange.querySearch = {};
            stateChange.querySearch.from = "CourseSearch";
            stateChange.querySearch.section = stateChange.sectionKeys[0];
            this.searchParamParse(stateChange, Object.keys(stateChange));
        }
    }

    searchParamParse(stateChange, _) {
        if (stateChange?.querySearch?.from !== "CourseSearch") return;

        this.waitForState("sections", () => {
            let upper = stateChange?.querySearch?.section?.toUpperCase();
            if (!this.state.sections[upper]) return;
            this.handleChange(null, upper);
            stateChange.querySearch.from = "SectionSearch";
            declareState({"querySearch": stateChange.querySearch});
        });

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
        this.setState({value: null, sections: null});
        declareState({section: null});
    }

    render() {

        return (
            <div style={this.props.style}>
                <Autocomplete
                    disablePortal
                    disabled={Object.keys(this.state.sections || []) < 1}
                    id="section-search-input"
                    onChange={this.handleChange.bind(this)}
                    options={Object.keys(this.state.sections || [])}
                    sx={this.baseStyle}
                    value={this.state.value}
                    renderInput={(params) => <TextField {...params} label="Section" />}
                />
            </div>
        )
    }

}

export default SectionSearch;
