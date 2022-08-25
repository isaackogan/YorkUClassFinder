import CourseSearch from "./Form/CourseSearch";
import SectionSearch from "./Form/SectionSearch";
import ClassSearch from "./Form/ClassSearch";
import DaySearch from "./Form/DaySearch";
import styled from "styled-components";
import ButtonSubmit from "./Form/ButtonSubmit";
import SessionSearch from "./Form/SessionSearch";
import {declareState} from "../../Tools/Toolbox";

const {Component} = require("react")

const FormContainer = styled.div`
  display: inline-block;
  height: 100%;
  margin-bottom: 35px;
`;


class Form extends Component {
    padding = "50px";

    constructor(props) {
        super(props);
        this.first = true;
        this.state = this.getWindowState()

    }

    getWindowState() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }
    }

    componentDidMount() {
        if (!this.first) return;
        this.first = false;

        fetch("https://yorkapi.isaackogan.com/v1/main/home/building-codes").then(res => res.json()).then(json => {
            declareState({building_codes: json})
        })

        window.addEventListener("resize", () => this.setState(this.getWindowState()));

    }

    render() {

        let width = "300px";
        if (this.state.windowWidth < 1000) {
            width = "100%";
        }

        let sx = {height: "50px", width: width}
        let sx2 = {...sx, ...{marginTop: "20px"}}
        let sx3 = {...sx, ...{marginTop: "10px"}}
        return (
            <FormContainer style={{width: width}}>
                <SessionSearch style={sx} />
                <CourseSearch style={sx2} />
                <SectionSearch style={sx2}/>
                <ClassSearch style={sx2}/>
                <DaySearch style={sx2}/>
                <ButtonSubmit style={sx2} />
            </FormContainer>
        )
    }

}

export default Form;
