import React, {Component} from 'react';
import styled from "styled-components";
import Form from "../../Components/Home/Form";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from "../../Components/Header";
import Preview from "../../Components/Home/Preview";
import Footer from "../../Components/Footer";
import ErrorModal from "../../Components/ErrorModal";
import StartError from "../../Tools/StartError";


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
`;

const InnerHomeContainer = styled.div`
  display: block;
  max-width: 1300px;
  width: 90%;
  margin: 30px auto 40px;
  font-family: 'IBM Plex Sans', 'Roboto', sans-serif;

`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#e51f1f'
        }
    },
});

const Title = styled.h1`
  font-weight: 500;
  font-size: 2.4rem;
  margin: 0;

  @media(max-width: 600px) {
    font-size: 2.0rem;
  }
  
`;

const Desc = styled.p`
  font-size: 1.15rem;
  margin-top: 15px;
  margin-bottom: 35px;

  @media(max-width: 600px) {
    font-size: 1.0rem;
  }
  
`;

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "navs": "..."
        }
    }

    componentDidMount() {
        fetch("https://yorkapi.isaackogan.com/v1/main/cft/stats").then(r => r.json()).then(r => {
            this.setState({navs: (r.navs || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
        });
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Background>
                    <Header />
                    <StartError />
                    <HomeContainer>
                        <InnerHomeContainer>
                            <Title>Welcome</Title>
                            <Desc>
                                Welcome to the <strong>Class Find Tool: Student-Made for YorkU!</strong> The goal of this app is to help
                                students find their way around York's campus. To date, this project has provided directions to students
                                on <strong>{this.state.navs}</strong> separate occasions.
                            </Desc>
                            <Form />
                            <Preview />
                        </InnerHomeContainer>
                    </HomeContainer>
                    <ErrorModal />
                    <Footer />
                </Background>
            </ThemeProvider>
        );

    }
}

export default Home;
