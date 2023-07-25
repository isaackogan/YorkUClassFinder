
export function deserializeSession(payload, search, replacement) {
    return payload?.split(search)?.join(replacement) || null;
}

export function deserializeSessionList(payload, search = "_", replacement = "-") {
    return payload?.map(x => deserializeSession(x, search, replacement)) || [];
}

export function serializeSessionList(payload, search = "-") {
    return deserializeSessionList(payload, search, "_");
}

export function serializeSession(payload, search = "-") {
    return deserializeSession(payload, search, "_");
}

const sessionRanks = {"FW": 1, "SU": 0};

export function getDefaultSession(deserializedSessions) {
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

export function declareState(newState) {
    document.dispatchEvent(new CustomEvent("declareState", {detail: newState}));
}

export function convertTime(time) {

    // Fix bad formatting
    if ((time.split(":")?.[0]?.length || 2) < 2) time = "0" + time;
    else if (time === "24:00") time = "00:00";

    // Parse Time
    try {
        time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            time = time.slice (1);
            time[5] = +time[0] < 12 ? ' AM' : ' PM';
            time[0] = +time[0] % 12 || 12;
        }

        return time.join ('');
    } catch (ex) {
        return time;
    }
}


function fallbackCopyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
    }

    document.body.removeChild(textArea);
}

export function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
    }, function(err) {
    });
}
