import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeclaredComponent from "../Tools/DeclaredComponent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


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


class ErrorModal extends DeclaredComponent {

    constructor(props) {
        super(props);
        this.state = {
            content: null,
            enabled: false
        }
    }

    onDeclareState(stateChange, stateKeys) {

        if (!stateKeys.includes("errorModal")) return;
        let change = stateChange["errorModal"];

        // Make sure has valid parts
        if (change?.title && change?.body) {
            this.setState({content: change, enabled: true});
        }

    }

    render() {
        return (
            <div>
                <BootstrapDialog onClose={() => this.setState({enabled: false})} aria-labelledby="customized-dialog-title" open={this.state.enabled}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={() => this.setState({enabled: false})}>
                        {this.state.content?.title}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        {this.state.content?.body}
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => this.setState({enabled: false})}>
                            Understood
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
        );
    }

}

export default ErrorModal;
