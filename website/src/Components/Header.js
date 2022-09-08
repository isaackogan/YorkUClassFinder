import styled from "styled-components";

const Logo = styled.img`
  height: 50px;

  @media(max-width: 300px) {
    height: 36px;
  }

  @media(max-width: 300px) {
    height: 36px;
  }
  
  
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;

  @media(max-width: 700px) {
    justify-content: center;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  align-items: center;
  font-family: 'IBM Plex Sans', 'Roboto', sans-serif;
  font-weight: 500;
`;

const HeaderSubContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;


const Header2XSubContainer = styled.div`
  max-width: 1300px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const FirstRedText = styled.div`
  font-size: 1.3em;
  color: white;

  @media(max-width: 700px) {
    font-size: 1.0em;
  }

  @media(max-width: 400px) {
    font-size: 0.9em;
  }
  
  @media(max-width: 350px) {
    font-size: 0.7em;
  }
`;

const Button = styled.a`
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.75);
  padding: 0 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 400;
  content: "•";
  &:hover {
    background-color: #e31837;
  }

  @media(max-width: 700px) {
    padding: 0 10px;
    font-size: 0.8rem;
  }
  
  @media(max-width: 350px) {
    font-size: 0.7em;
    padding: 0 5px;
  }
  
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
`;

const DevButton = styled.a`
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 400;
  padding-left: 30px;
  &:hover {
    text-decoration: underline;
  }
  
  @media(max-width: 600px) {
    display: none;
  }
`;


const CreditLabel = styled.span`
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  font-size: 1.1rem;
  font-weight: 400;
  padding-left: 30px;

  @media(max-width: 600px) {
    display: none;
  }
`;

const Header = () => {

    return (
        <HeaderContainer>
            <HeaderSubContainer style={{backgroundColor: "transparent", height: "75px"}}>
                <Header2XSubContainer>
                    <FlexCenter><Logo src={`/logo.png?cachebust=429069`}/></FlexCenter>
                </Header2XSubContainer>
            </HeaderSubContainer>
            <HeaderSubContainer style={{backgroundColor: "#e31837"}}>
                <Header2XSubContainer>
                    <FlexCenter>
                        <FirstRedText>Class Find Tool: Student-Made for YorkU</FirstRedText>
                        <CreditLabel>Isaac Kogan</CreditLabel>
                    </FlexCenter>
                </Header2XSubContainer>
            </HeaderSubContainer>
            <HeaderSubContainer style={{backgroundColor: "#8C0000", height: "45px"}}>
                <Header2XSubContainer>
                    <FlexCenter>
                        <ButtonContainer>
                            <Button target="_blank" href="https://github.com/isaackogan/YorkUClassFinder">GitHub Project</Button>
                            <Button target="_blank" href="https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm.woa/wa/DirectAction/cds">View Timetable</Button>
                            <Button target="_blank" href="https://www.reddit.com/r/yorku/comments/vcr0q1/yorks_underground_and_groundlevel_pedways_can/">Tunnel Map</Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <DevButton href="https://paypal.me/isaackogan" target="_blank">DONATE</DevButton>
                            <DevButton href="https://isaackogan.com/" target="_blank">CONTACT</DevButton>
                        </ButtonContainer>
                    </FlexCenter>
                </Header2XSubContainer>
            </HeaderSubContainer>

        </HeaderContainer>
    )
}

export default Header;
