import styled from "styled-components";


const HeaderContainer = styled.div`
  width: 100%;
  align-items: center;
  font-family: 'IBM Plex Sans', 'Roboto', sans-serif;
  font-weight: 500;
`;

const HeaderSubContainer2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e31837;
  height: 145px;
  background-repeat: no-repeat;
  background-position: right 15% bottom -25px;
  background-image: url('https://futurestudents.yorku.ca/themes/custom/york/images/york2020/arrow.png');
  
  @media(max-width: 740px) {
    background-image: none;
  }



`;

const HeaderSubContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const BlackContainer = styled.div`
  width: 80%;
  max-width: 800px;
  display: flex;
  align-items: center;

  @media(max-width: 740px) {
    justify-content: center;
  }

  @media(max-width: 400px) {
    justify-content: space-between;
    width: 50%;
  }
`;

const DevButton = styled.a`
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  cursor: ${props => props["nounderline"] ? 'inherit' : 'pointer'};
  font-size: 1.0rem;
  font-weight: 600;
  margin-left: 25px;

  &:hover {
    text-decoration: ${props => props["nounderline"] ? '' : 'underline'};
  }

  @media(max-width: 400px) {
    font-size: 0.9rem;
    margin-left: 0;
  }

  @media(max-width: 300px) {
    font-size: 0.8rem;
  }
`;

const FooterLogo = styled.img`
  height: 50px;

  @media(max-width: 400px) {
    display: none;
  }
`;

const Footer = (props) => {

    return (
        <HeaderContainer style={props.style}>
            <HeaderSubContainer style={{backgroundColor: "black", "height": "60px"}}>
                <DevButton style={{marginLeft: "0"}} nounderline>100% Unaffiliated with YorkU</DevButton>
            </HeaderSubContainer>
            <HeaderSubContainer2>
                <BlackContainer>
                    <FooterLogo src={`/isaaclogo.png?cachebust=69420`} />
                    <DevButton href="https://github.com/isaackogan/YorkUClassFinder/issues" target="_blank">SUGGEST</DevButton>
                    <DevButton href="https://isaackogan.com/" target="_blank">CONTACT</DevButton>
                </BlackContainer>
            </HeaderSubContainer2>

        </HeaderContainer>
    )
}

export default Footer;
