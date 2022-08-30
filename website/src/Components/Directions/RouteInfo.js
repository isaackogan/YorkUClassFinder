import {Component} from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-right: 10px;
  margin-top: 10px;
  border: 2px solid rgba(0,0,0,0.3);
  background-color: white;
  border-radius: 5px;
  padding: 11px;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
`;

const DirectionText = styled.span`
  display: block;
`;

class RouteInfo extends Component {

    constructor(props) {
        super(props);
        this.routeInfo = props?.info?.routes?.[0]?.summary;
    }

    render() {

        if (!this.routeInfo) return <div />;

        let dist = this.routeInfo.totalDistance < 1000 ? `${this.routeInfo.totalDistance} m` : (
            `${(this.routeInfo.totalDistance / 1000).toFixed(1)} km`
        )

        return (
            <Container>
                <DirectionText><u>Directions by Foot</u></DirectionText>
                <DirectionText><strong>Distance: </strong>{dist}</DirectionText>
                <DirectionText><strong>Time: </strong>{(this.routeInfo.totalTime / 60).toFixed(1)} min</DirectionText>
            </Container>
        );
    }

}

export default RouteInfo;
