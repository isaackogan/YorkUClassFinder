import {Modal} from "@mui/material";
import {Component} from "react";
import styled from "styled-components";

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 50%;
  max-width: 600px;
  max-height: 380px;
  box-shadow: 0 3px 24px rgb(0 0 0 / 0.3);;
  background-color: white;
  border: 4px solid rgba(255, 255, 255, 0.8);
`;

const PopUpImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const PopUpDesc = styled.div`
  position: absolute;
  bottom: 20%;
  width: 40%;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 20px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 5px;
  background-color: #e31837;
  text-align: center;
  display: flex;
  padding: 3% 5%;
  align-items: center;
`;

class MapImage extends Component {

    constructor(props) {
        super(props);
        this.first = true;
        this.state = {
            open: false,
            loaded: false
        }
    }

    componentDidMount() {
        if (!this.first) return;
        this.first = false;

        // Set up listener
        document.addEventListener("mapImageModal", () => {this.setState({open: true})});

        // Disable image if not found
        if (!this.props.image) {
            let buttons = document.getElementsByClassName("popupDivButton");
            for (let button of buttons) {
                button.classList.add("disabled")
            }
        }

    }

    handleCloseButtonClick(event) {
        if (event && event.target.id === "buildingPreviewImageModal") {
            this.setState({open: false});
        }
    }

    render() {

        // No image, no go
        if (!this.props.image) {
            this.handleCloseButtonClick();
            return <div />
        }

        return (
            <div>
                <Modal
                    open={this.state.open}
                    onClick={(e) => this.handleCloseButtonClick(e)}
                    hideBackdrop={true}
                    style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ModalBox style={{"visibility": this.state.loaded ? "visible" : "hidden"}}>
                        <PopUpImg src={this.props.image} onLoad={() => this.setState({loaded: true})}/>
                        {this.props.building ? <PopUpDesc>{(this.props.building).toUpperCase()}</PopUpDesc> : ""}
                    </ModalBox>
                </Modal>
            </div>
        );
    }

}

export default MapImage;
