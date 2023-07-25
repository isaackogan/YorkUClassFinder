import React from 'react';
import styled from "styled-components";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from "../Components/Header";
import StartError from "../Tools/StartError";
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
  flex-grow: 1;
  margin: 15px;
  min-width: 40%;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#e51f1f'
        }
    },
});

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 2rem;
  
`;

const TextContainer = styled.div`
  padding: 25px;
  background-color: white;
  border-radius: 5px;
`;


const NotFound = () => {

    return (
        <ThemeProvider theme={theme}>
            <Background>
                <Header navs={null} />
                <StartError />
                <HomeContainer>
                    <TextContainer>
                        <Title>Page Not Found</Title>
                        <Button
                            style={{maxWidth: "70vw", width: "250px", height: "40px"}} variant="contained"
                            onClick={() => setTimeout(() => window.location.href = "/", 1000)}
                        >
                            Go Home
                        </Button>
                    </TextContainer>
                </HomeContainer>
            </Background>
        </ThemeProvider>
    );


}

export default NotFound;
