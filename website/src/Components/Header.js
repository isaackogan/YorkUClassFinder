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
  background-color: #e31837;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1.3em;
  color: white;
  margin-left: 20px;
  cursor: default;
  
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

const ContentContainer = styled.div`
  max-width: 1600px;
  width: 90%;
`;

const TextContainer = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InnerTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  
`;

const LogoutButton = styled.a`
  color: white;
  text-decoration: none;
  align-items: center;
  display: flex;
  transition: opacity 100ms;
  
  &:hover {
    opacity: 0.85;
  }
  
  &:active {
    opacity: 0.75;
  }
`;

const LogoutButtonIcon = styled.img`
  height: 26px;
  width: 26px;
  color: white;
  margin-left: 5px;
`;

const Header = () => {

    return (
        <HeaderContainer>
            <ContentContainer>
                <TextContainer>
                    <InnerTextContainer>
                        <FlexCenter><Logo src={`/yorku_logo.svg?cachebust=429069`}/></FlexCenter>
                        <Title>Class Find Tool</Title>
                    </InnerTextContainer>
                    <ButtonContainer>
                        <FlexCenter>
                            <LogoutButton href={"https://passportyork.yorku.ca/ppylogin/ppylogout"}>
                                Log Out <LogoutButtonIcon src={`/logout.svg?cachebust=429069`}/>
                            </LogoutButton>
                        </FlexCenter>
                    </ButtonContainer>
                </TextContainer>
            </ContentContainer>
        </HeaderContainer>
    )
}

export default Header;
