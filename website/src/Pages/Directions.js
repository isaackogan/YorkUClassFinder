import React from 'react';
import styled from "styled-components";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Map from "../Components/Directions/Map";


const Background = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#e51f1f'
        }
    },
});

const Home = () => {

    return (
        <ThemeProvider theme={theme}>
            <Background>
                <Map />
            </Background>
        </ThemeProvider>
    );


}

export default Home;
