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
  margin-left: 10px;

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

  @media(max-width: 350px) {
    font-size: 1.2em;
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

  @media(max-width: 350px) {
    justify-content: center;
    margin-left: -30px;
  }
  
`;

const InnerTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  @media(max-width: 350px) {
    display: none;
  }
`;

const Text2 = styled.span`
  color: white;
  text-decoration: none;
  align-items: center;
  display: flex;
  transition: opacity 100ms;
  font-weight: bold;
  text-align: right;
  
  @media(max-width: 700px) {
    font-size: 14px;
  }

  @media(max-width: 500px) {
    font-size: 13px;
  }

  @media(max-width: 400px) {
    font-size: 11px;
  }
  
`;

const LinkURL = styled.a`
  text-align: right;
  color: white;
  text-decoration: none;
  align-items: center;
  display: flex;
  transition: opacity 100ms;
  font-size: 15px;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:active {
    opacity: 0.85;
  }

  @media(max-width: 700px) {
    font-size: 13px;
  }

  @media(max-width: 400px) {
    font-size: 10px;
  }
  
`;


const LogoutButtonIcon = styled.img`
  height: 20px;
  width: 20px;
  color: white;
  margin-left: 2px;
  margin-top: 2px;

  @media(max-width: 500px) {
    display: none;
  }
  
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
                        <FlexCenter><Logo src={`/icons/map_logo.png`}/></FlexCenter>
                        <FlexCenterColumn>
                            <Title>Class Find Tool</Title>
                            {getNavText(navs)}
                        </FlexCenterColumn>
                    </InnerTextContainer>
                    <ButtonContainer>
                        <FlexCenterColumn style={{alignItems: "end"}}>
                            <Text2>
                                Student-Made for YorkU
                            </Text2>
                            <LinkURL target={"_blank"} href={"https://www.isaackogan.com/linkedin"}>
                                by Isaac Kogan
                                <LogoutButtonIcon src={"/icons/link.svg"} />
                            </LinkURL>
                        </FlexCenterColumn>
                    </ButtonContainer>
                </TextContainer>
            </ContentContainer>
        </HeaderContainer>
    )
}

export default Header;
