import React from "react";
import styled from "styled-components";
import {InfoNotification} from "./Notifications";
import {Link} from "@mui/icons-material";

const TitleIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 1.4rem;
  margin: 0 0 0 8px;
  color: #e31837;
`;

const Desc = styled.span`
  margin-top: 0;
  display: flex;
  margin-bottom: 0;
  align-items: center;
`;

const OnboardingDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Span = styled.div`
  padding: 3px;
  align-items: center;
  font-size: 16px;
  
  @media(max-width: 700px) {
    font-size: 14px;
  }
  
`;

function Onboarding() {
    return (
        <OnboardingDiv>
            <Span>Enter the desired course code in <strong>SC-BIOL-1000-3.0</strong> format to look up its timetable.</Span>
            <Span>Then, select the course <strong>Section</strong>, <strong>Class</strong>, and <strong>Day</strong> to load directions.</Span>
            <Span>
                Click the <Link className={"notifs-link-icon"}/> <strong>Share&nbsp;</strong> button to copy the URL for the current class' directions.
            </Span>
        </OnboardingDiv>
    )
}

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export default function Hero() {

    return (
        <HeroContainer>
            <Desc>
                <TitleIcon src={"/icons/map.svg"} />
                <Title>Class Finder</Title>
            </Desc>
            <div>
                <InfoNotification content={<Onboarding />} />
            </div>
        </HeroContainer>

    )
}
