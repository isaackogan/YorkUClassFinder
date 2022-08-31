import {Button} from "@mui/material";
import {copyTextToClipboard} from "../../../Tools/Toolbox";
import DeclaredComponent from "../../../Tools/DeclaredComponent";
import { Link, Check } from '@mui/icons-material';

class ShareButton extends DeclaredComponent {

    constructor(props) {
        super(props);
        this.first = true;
        this.state = {
            course: null,
            section: null,
            class: null,
            day: null,
            building_codes: {},
            open: false,
            session: null,
            mapCoords: {},
            anim: false
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

    isDisabled() {
        return !(this.state.class && this.state.course && this.state.section && this.state.day && this.state.session);
    }

    onSubmit(self) {
        let host = new URL(window.location.href);
        let copyText = new URL(host.origin);

        for (let key of ["session", "course", "section", "class"]) {
            if (!self.state[key]) break;
            copyText.searchParams.set(key, self.state[key]);
        }

        if (self.state["day"] && copyText.searchParams.get("class")) {
            copyText.searchParams.set("day", self.state.day.day);
        }

        copyTextToClipboard(copyText);
        this.setState({anim: true});
        setTimeout(() => {
            this.setState({anim: false});
        }, 1000);

    }

    render() {
        let style = {...this.props.style, ...{"width": "100%", "height": "100%", "borderTopLeftRadius": 0, "borderBottomLeftRadius": 0}};

        return (
            <div>
                <Button
                    disabled={this.isDisabled()}
                    onClick={() => this.onSubmit(this)}
                    style={style}>
                    {this.state.anim ? <Check /> : <Link />}
                </Button>
            </div>
        )
    }

}

export default ShareButton;
