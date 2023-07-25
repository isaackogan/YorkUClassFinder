import React, {Component} from 'react';
import styled from "styled-components";
import Form from "../Components/Home/Form";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from "../Components/Header";
import Preview from "../Components/Home/Preview";
import ErrorModal from "../Components/ErrorModal";
import StartError from "../Tools/StartError";
import Hero from "../Components/Home/Hero";

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
  
  background-color: white;
  margin-top: 25px;
  margin-bottom: 25px;
  border-radius: 5px;
  
`;

const InnerHomeContainer = styled.div`
  display: block;
  padding: 20px 30px 30px 30px;
  font-family: 'IBM Plex Sans', 'Roboto', sans-serif;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#ec1b3a'
        }
    },
});

class Home extends Component {

    first = true;

    constructor(props) {
        super(props);
        this.state = {"navs": 0};
    }

    async componentDidMount() {

        if (!this.first) {
            return;
        }

        let res = await (await fetch("https://yorkapi.isaackogan.com/v1/main/cft/stats")).json();
        this.setState(
            {navs: (res?.navs || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        );

    }

    render() {

        return (
            <ThemeProvider theme={theme}>
                <Background style={{zIndex: 100}}>
                    <Header navs={this.state.navs}/>
                    <StartError />
                    <HomeContainer>
                        <InnerHomeContainer>
                            <Hero />
                            <Form />
                            <Preview />
                        </InnerHomeContainer>
                    </HomeContainer>
                    <ErrorModal />
                </Background>
            </ThemeProvider>
        );

    }
}

export default Home;
