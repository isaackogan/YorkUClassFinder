import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Directions from "./Pages/Directions/Directions";
import NotFound from "./Pages/NotFound/NotFound";


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />}/>
                <Route path="/directions" exact element={<Directions />} />
                <Route path="*" element={<NotFound />} status={404}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
