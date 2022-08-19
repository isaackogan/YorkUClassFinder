import {Autocomplete, TextField} from "@mui/material";
import DeclaredComponent from "../../../Tools/DeclaredComponent";
const {getDefaultSession, deserializeSessionList, declareState} = require("../../../Tools/Toolbox");


class SessionSearch extends DeclaredComponent {

    constructor(props) {
        super(props);
        this.state = {sessions: [], value: null};
        this.first = true;
    }

    componentDidMount() {

        // Make sure it's first
        if (!this.first) return;
        this.first = false;

        // fetch session list
        fetch("https://yorkapi.isaackogan.com/v1/courses/info/periods").then(r => r.json()).then(r => {
            let sessions = deserializeSessionList(r);
            let defaultSession = getDefaultSession(sessions);
            this.setState({sessions: sessions, value: defaultSession});
            declareState({session: defaultSession});
        });

    }

    handleChange(event, result) {
        this.setState({value: result});
        declareState({session: result});
    }

    render() {

        return (
            <div style={this.props.style}>

                <Autocomplete
                    disablePortal
                    disabled={this.state.sessions.length < 1}
                    id="session-search-input"
                    onChange={this.handleChange.bind(this)}
                    options={this.state.sessions}
                    value={this.state.value}
                    sx={this.baseStyle}
                    renderInput={(params) => <TextField {...params} label="School Session" />}
                />
            </div>
        )
    }

}

export default SessionSearch;
