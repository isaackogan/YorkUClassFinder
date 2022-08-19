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
  cursor: pointer;
  font-size: 1.0rem;
  font-weight: 600;
  margin-left: 25px;

  &:hover {
    text-decoration: underline;
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

const Footer = () => {

    return (
        <HeaderContainer>
            <HeaderSubContainer style={{backgroundColor: "black", "height": "60px"}}>
                <DevButton style={{marginLeft: "0"}} href="https://paypal.me/isaackogan" target="_blank">Unaffiliated with YorkU, by Isaac Kogan</DevButton>
            </HeaderSubContainer>
            <HeaderSubContainer2>
                <BlackContainer>
                    <FooterLogo src="/yorklogo.png?cachebust=3" />
                    <DevButton href="https://paypal.me/isaackogan" target="_blank">DONATE</DevButton>
                    <DevButton href="https://isaackogan.com/" target="_blank">CONTACT</DevButton>
                </BlackContainer>
            </HeaderSubContainer2>

        </HeaderContainer>
    )
}

export default Footer;
