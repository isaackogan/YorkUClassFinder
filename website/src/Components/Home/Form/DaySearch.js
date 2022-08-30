import {Autocomplete, TextField} from "@mui/material";
import {declareState} from "../../../Tools/Toolbox";
import DeclaredComponent from "../../../Tools/DeclaredComponent";

class DaySearch extends DeclaredComponent {

    static abbreviations = {
        "M": "Monday",
        "T": "Tuesday",
        "W": "Wednesday",
        "R": "Thursday",
        "F": "Friday",
        "S": "Saturday",
        "U": "Sunday",
        "MWF": "Mon, Wed, Fri",
        "TR": "Tues, Thurs",
        "SU": "Saturday, Sunday"
    }

    constructor(props) {
        super(props);
        this.state = {days: [], value: null}
    }

    onDeclareState(stateChange, keys) {
        // If class changes
        if (keys.includes("class")) {
            this.clearValue();
        }

        // Should be our key
        if (!keys.includes("days")) return;
        this.clearValue();

        stateChange = {days: stateChange.days};
        this.setState(stateChange);
    }

    handleChange(event, change) {
        this.setState({value: change});

        // When the day changes, get the new day
        if (change) {
            let day = this.state.days.filter(day => this.getQualifiedName(day) === change)?.[0];
            declareState({day: day});
        } else {
            declareState({day: null});
        }

        // When the day changes, if not null, tick the directions statistic
        if (change) {
            fetch("https://yorkapi.isaackogan.com/v1/main/cft/stats", {method: "post"}).then(r => r.json()).then(r => {
                this.setState({navs: (r.navs || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
            });
        }

    }

    clearValue() {
        this.setState({value: null, day: null, days: []});
        declareState({day: null});
    }

    getQualifiedName(day) {
        let cleanedDay = day?.["day"]?.trim();
        return `${cleanedDay} (${DaySearch.abbreviations[cleanedDay]})`;
    }

    render() {
        let optionList = []
        for (let day of this.state.days || []) {
            if (!day?.day) continue;
            optionList.push(this.getQualifiedName(day));
        }

        return (
            <div style={this.props.style}>
                <Autocomplete
                    id="day-search-input"
                    disablePortal
                    disabled={optionList.length < 1}
                    onChange={this.handleChange.bind(this)}
                    options={optionList}
                    sx={this.baseStyle}
                    value={this.state.value}
                    renderInput={(params) => <TextField {...params} label="Day" />}
                />
            </div>
        )
    }

}

export default DaySearch;
