import {Button, Modal} from "@mui/material";
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

class ImageModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loaded: false
        }
    }

    handleOpenButtonClick() {
        this.setState({open: true, loaded: false});
    }

    handleCloseButtonClick(event) {
        if (event && event.target.id === "buildingPreviewImageModal") {
            this.setState({open: false});
        }
    }

    render() {
        let popUpDesc = this.props.desc ? <PopUpDesc>{(this.props.desc).toUpperCase()}</PopUpDesc> : ""
        let style = {"visibility": this.state.loaded ? "visible" : "hidden"}

        return (
            <div>
                <Button style={{marginTop: "10px", marginBottom: "5px"}} variant="contained" onClick={(e) => this.handleOpenButtonClick(e)}>See Picture</Button>
                <Modal
                    id={"buildingPreviewImageModal"}
                    open={this.state.open}
                    onClick={this.handleCloseButtonClick.bind(this)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    hideBackdrop={true}
                    style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
                >
                    <ModalBox style={style}>
                        <PopUpImg src={this.props.src} onLoad={() => this.setState({loaded: true})}/>
                        {popUpDesc}
                    </ModalBox>
                </Modal>
            </div>
        );
    }

}

export default ImageModal;
