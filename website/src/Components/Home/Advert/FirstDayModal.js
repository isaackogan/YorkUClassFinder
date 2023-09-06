import * as React from 'react';
import Button from '@mui/material/Button';
import {styled as muiStyled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Component} from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

const BootstrapDialog = muiStyled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const Link = styled.a`
  text-decoration: none;
  color: #dc3030;
  font-weight: bold;
  cursor: pointer;
  transition-duration: 100ms;
  &:hover {
    color: #af1a1a;
    text-decoration: underline;
  }
`;

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

class FirstDayModal extends Component {

    constructor(props) {
        super(props);
        this.personal = "https://isaackogan.com/"
        this.instagram = "https://isaackogan.com/instagram";
        this.linkedin = "https://isaackogan.com/linkedin";

        this.disableAfter = 1694652351;
        this.currentTime = Math.floor(Date.now() / 1000);

        this.state = {
            enabled: this.getEnabled()
        }

    }

    getEnabled() {
        return ((this.disableAfter > this.currentTime) && (Cookies.get("first-day-modal") || "true") !== "false");
    }

    onClose() {
        this.setState({enabled: false});
        Cookies.set("first-day-modal", "false");
    }

    render() {
        return (
            <div>
                <BootstrapDialog  onClose={() => this.onClose()} aria-labelledby="customized-dialog-title" open={this.state.enabled}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => this.onClose()}>
                        Welcome, First-Years (et. al)!
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        Welcome, everyone! I'm <Link href={this.personal}>Isaac Kogan</Link>, this is my 2nd year at YorkU, and you're on
                        my app, <strong>Class Find Tool for YorkU</strong>.
                        <br/><br/>
                        Feel free to reach out on <Link target="_blank" href={this.linkedin}>LinkedIn</Link>.
                        <br/><br/>
                        Good luck this semester, and enjoy my app! It was a pleasure to make.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.onClose()}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
        );
    }

}

export default FirstDayModal;
