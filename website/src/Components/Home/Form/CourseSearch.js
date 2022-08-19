import {Autocomplete, TextField} from "@mui/material";
import DeclaredComponent from "../../../Tools/DeclaredComponent";
const {serializeSession, declareState} = require("../../../Tools/Toolbox");



class CourseSearch extends DeclaredComponent {

    constructor(props) {
        super(props);
        this.state = {session: null, courses: [], value: null, showCourses: false};

    }

    onDeclareState(stateChange, keys) {
        // Only care about session
        if (!keys.includes("session")) return;

        // Update session
        stateChange = {session: serializeSession(stateChange.session)};
        this.setState(stateChange);

        // If session is valid
        if (stateChange.session) {
            fetch(`https://yorkapi.isaackogan.com/v1/courses/info/${stateChange.session}/codes`).then(res => res.json()).then(array => {
                this.setState({courses: array || []});
            });
        }

        this.clearValue();

    }

    clearValue() {
        this.setState({value: null});
        declareState({course: null});
    }

    handleInputChange(event, value) {

        // Close until more typed
        if (value.length < 4) {
            return this.setState({showCourses: false});
        }

        // Open when more typed
        if (!this.state.showCourses) {
            this.setState({showCourses: true})
        }

    }

    handleChange(event, change) {
        this.setState({value: change});

        // When the course changes, get the new course schedule
        if (change) {
            fetch(`https://yorkapi.isaackogan.com/v1/courses/info/${this.state.session}/${change}/schedule`).then(res => res.json()).then(json => {
                declareState({sections: json.sections});
            });
        } else {
            declareState({sections: []});
        }

        declareState({course: change});

    }

    render() {

        return (
            <div style={this.props.style}>

                <Autocomplete
                    disablePortal
                    id="course-search-input"
                    value={this.state.value}
                    disabled={!(this.state.session && this.state.courses.length > 1)}
                    open={this.state.showCourses}
                    options={this.state.courses}
                    sx={this.baseStyle}
                    onInputChange={this.handleInputChange.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    renderInput={(params) => <TextField {...params} label="Course Name" />}
                    onClose={() => this.setState({showCourses: false})}
                />
            </div>

        )
    }

}

export default CourseSearch;
