import styled from "styled-components";

const Logo = styled.img`
  height: 50px;
  width: 50px;
  
  @media(max-width: 300px) {
    height: 36px;
    width: 36px;
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

const FlexCenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: initial;
  margin-left: 15px;

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
  cursor: default;
  
  @media(max-width: 700px) {
    font-size: 1.0em;
  }

  @media(max-width: 400px) {
    font-size: 0.9em;
  }
  
`;

const TitleSub = styled.div`
  color: white;
  font-size: 0.8em;
  margin-top: -3px;
  transition: opacity 100ms;
  transition-delay: 50ms;
  
  @media(max-width: 500px) {
    display: none;
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

  @media(max-width: 700px) {
    font-size: 14px;
  }

  @media(max-width: 500px) {
    font-size: 13px;
  }
  
`;

const LogoutButtonIcon = styled.img`
  height: 26px;
  width: 26px;
  color: white;
  margin-left: 5px;
`;

function getNavText(navs) {

    if (navs === null) {
        return null;
    }

    let opacity = Boolean(navs) ? "1" : "0";

    return (
        <TitleSub style={{opacity: opacity}}>Given {navs.toLocaleString()} total directions</TitleSub>
    )

}
const Header = ({navs}) => {

    return (
        <HeaderContainer>
            <ContentContainer>
                <TextContainer>
                    <InnerTextContainer>
                        <FlexCenter><Logo src={`/icons/yorku_logo.svg?cachebust=429069`}/></FlexCenter>
                        <FlexCenterColumn>
                            <Title>Class Find Tool</Title>
                            {getNavText(navs)}
                        </FlexCenterColumn>
                    </InnerTextContainer>
                    <ButtonContainer>
                        <FlexCenter>
                            <LogoutButton href={"https://passportyork.yorku.ca/ppylogin/ppylogout"}>
                                Log Out <LogoutButtonIcon src={`/icons/logout.svg?cachebust=429069`}/>
                            </LogoutButton>
                        </FlexCenter>
                    </ButtonContainer>
                </TextContainer>
            </ContentContainer>
        </HeaderContainer>
    )
}

export default Header;
