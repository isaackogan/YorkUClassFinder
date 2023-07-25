import React from 'react';
import styled from "styled-components";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from "../../Components/Header";
import StartError from "../../Tools/StartError";
import Button from "@mui/material/Button";


const Background = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#e51f1f'
        }
    },
});

const Title = styled.h1`
  margin-top: 33%;
  font-weight: bold;
  font-size: 2.4rem;
  margin-bottom: 20px;

  @media(max-width: 600px) {
    font-size: 2.0rem;
  }
  
`;


const NotFound = () => {

    return (
        <ThemeProvider theme={theme}>
            <Background>
                <Header />
                <StartError />
                <HomeContainer>
                    <Title>Page Not Found</Title>
                    <Button
                        style={{maxWidth: "70vw", width: "250px", height: "40px"}} variant="contained"
                        onClick={() => setTimeout(() => window.location.href = "/", 1000)}
                    >
                        Go Home
                    </Button>
                </HomeContainer>
            </Background>
        </ThemeProvider>
    );


}

export default NotFound;
