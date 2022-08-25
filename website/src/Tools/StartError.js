import {Alert, AlertTitle} from "@mui/material";
import {useState} from "react";

let style = {
    width: "80%",
    display: "flex",
    borderBottomRightRadius: "15px",
    borderBottomLeftRadius: "15px",
    maxWidth: "600px",
    cursor: "pointer"
}

function parseUrlQuery() {
    let url = new URL(window.location.href);
    let query;

    // Parse query
    try {
        query = atob(url.hash.substring(1));
    } catch (ex) {
    }

    // Check validity
    if (!query) return null;

    // Assign sx & sy values
    let params = new URLSearchParams(query);
    return params.get("error");
}

function StartError() {
    const [enabled, setEnabled] = useState(true);

    // Parse
    let error = parseUrlQuery();
    if (!error) return <div/>

    if (enabled) {
        return (
            <Alert severity="error" style={style} onClick={() => {
                window.location.href = "#";
                setEnabled(false);
            }}>
                <AlertTitle>Navigation Error</AlertTitle>
                Class Finder: Map Service — <strong>{error}</strong>
            </Alert>
        )
    }



}

export default StartError;
