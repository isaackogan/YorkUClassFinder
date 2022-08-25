import React from 'react';
import styled from "styled-components";
import Form from "../../Components/Home/Form";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from "../../Components/Header";
import Preview from "../../Components/Home/Preview";
import Footer from "../../Components/Footer";
import ErrorModal from "../../Components/ErrorModal";
import StartError from "../../Tools/StartError";
import Button from "@mui/material/Button";


const Background = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 90%;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#e51f1f'
        }
    },
});

const Title = styled.h1`
  font-weight: bold;
  font-size: 2.4rem;
  margin-bottom: 20px;

  @media(max-width: 600px) {
    font-size: 2.0rem;
  }
  
`;


const Desc = styled.p`
  font-size: 1.15rem;
  margin-top: 15px;

  @media(max-width: 600px) {
    font-size: 1.0rem;
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
                <Footer style={{bottom: 0, position: "absolute"}} />
            </Background>
        </ThemeProvider>
    );


}

export default NotFound;
