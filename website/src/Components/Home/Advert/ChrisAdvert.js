import {Component} from "react";
import styled from "styled-components";

const AdvertContainer = styled.div`
  width: 100%;
  display: none; // Disable until election starts
  justify-content: center;
  align-items: center;
  margin-top: 36px;
  border: none;
  border-radius: 5px;
  
  @media(min-width: 1000px) {
    display: none;
  }
`;

const AdvertBox = styled.div`
  display: flex;
  vertical-align: top;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: none;

`;

const AdvImgBacking = styled.div`
  border: none;

`;

const AdvertImage = styled.img`
  cursor: pointer;
  transition-duration: 150ms;
  width: 100%;
  max-width: 400px;
  border: none;

  &:hover {
    filter: brightness(90%);
  }
  
`;

class ChrisAdvert extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AdvertContainer>
                <AdvImgBacking>
                    <AdvertBox onClick={() => window.open("https://www.instagram.com/christian_fyr/")}>
                        <AdvertImage src="/foreign/chris.jpeg"/>
                    </AdvertBox>
                </AdvImgBacking>
            </AdvertContainer>

        )
    }

}

export default ChrisAdvert;
