const {Component} = require("react");

class DeclaredComponent extends Component {
    baseStyle = {width: "100%"};

    constructor(props) {
        super(props);
        this.mounted = false;

        document.addEventListener("declareState", (event) => this._waitForMount(this, event));
    }

    _waitForMount(self, event) {
        let interval = setInterval(() => {
            if (!self.mounted) return;
            clearInterval(interval);
            self.onDeclareState.bind(self)(event.detail, Object.keys(event.detail));
        }, 100);

    }

    setState(state, callback) {
        super.setState(state, callback);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onDeclareState(stateChange, stateKeys) {

    }

}

export default DeclaredComponent;
