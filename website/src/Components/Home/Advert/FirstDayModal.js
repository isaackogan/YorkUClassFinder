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

const FirstDayText = styled.div`
  font-size: 26px;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  text-align: center;
`;

class FirstDayCountdown extends Component {
    constructor(props) {
        super(props);
        this.daysUntilHell = 9 - new Date().getDate();
    }

    daysMessage() {
        if (this.daysUntilHell < 0) {
            return "it already did"
        }

        if (this.daysUntilHell === 0) {
            return "Today! Woo-hoo!"
        }

        if (this.daysUntilHell === 1) {
            return "in 1 short day"
        }

        return `in ${this.daysUntilHell} short days`;
    }

    render() {

        return (
            <FirstDayText>
                {this.daysMessage()}
            </FirstDayText>
        );
    }

}

class FirstDayModal extends Component {

    constructor(props) {
        super(props);
        this.personal = "https://isaackogan.com/"
        this.instagram = "https://isaackogan.com/instagram";
        this.linkedin = "https://isaackogan.com/linkedin";

        this.disableAfter = 1673308799;
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
                <BootstrapDialog onClose={() => this.onClose()} aria-labelledby="customized-dialog-title" open={this.state.enabled}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => this.onClose()}>
                        Happy New Years!
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        Welcome! I'm <Link href={this.personal}>Isaac Kogan</Link>, this is my first year at York and at University, and you're on
                        my app, <strong>Class Find Tool for YorkU.</strong>
                        <br/><br/>
                        I want to wish you <strong>good luck</strong> on the second semester, starting:
                        <br/><br/>
                        <FirstDayCountdown />
                        <br/>
                        Reach out on <Link target="_blank" href={this.instagram}>Instagram</Link> or <Link target="_blank" href={this.linkedin}>LinkedIn</Link>,
                        I'm hoping to make new connections at York. Good luck, and enjoy the app!
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
