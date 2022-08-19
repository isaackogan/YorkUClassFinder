const {Component} = require("react");

function deserializeSession(payload, search, replacement) {
    return payload?.split(search)?.join(replacement) || null;
}

function deserializeSessionList(payload, search = "_", replacement = "-") {
    return payload?.map(x => deserializeSession(x, search, replacement)) || [];
}

function serializeSessionList(payload, search = "-") {
    return deserializeSessionList(payload, search, "_");
}

function serializeSession(payload, search = "-") {
    return deserializeSession(payload, search, "_");
}

const sessionRanks = {"FW": 1, "SU": 0};

function getDefaultSession(deserializedSessions) {
    let bigYear = 0, bigRank = -1, bigSess = ""

    for (let session of deserializedSessions) {
        let split = session.split("-");

        // Get details
        let sessYear = split[1], sessName = split[0]
        let sessRank = sessionRanks[sessName] || -1;

        // If same year, check which has a higher worth
        if (sessYear === bigYear) {
            if (sessRank > bigRank) {
                bigSess = session;
            }
        }

        // Bigger year always takes priority
        else if (sessYear > bigYear) {
            bigSess = session;
            bigYear = sessYear;
        }

    }

    return bigSess;

}

function declareState(newState) {
    document.dispatchEvent(new CustomEvent("declareState", {detail: newState}));
}

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

function generateKey(current, iteration = 0) {
    if (iteration > 2) {
        return current;
    }

    current += (Math.random() + 1).toString(36).substring(7);
    return generateKey(current, iteration + 1);
}

function convertTime(time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
        time = time.slice (1);
        time[5] = +time[0] < 12 ? ' AM' : ' PM';
        time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
}

module.exports = {
    deserializeSessionList: deserializeSessionList,
    serializeSessionList: serializeSessionList,
    serializeSession: serializeSession,
    getDefaultSession: getDefaultSession,
    declareState: declareState,
    DeclaredComponent: DeclaredComponent,
    generateKey: generateKey,
    convertTime: convertTime
}
