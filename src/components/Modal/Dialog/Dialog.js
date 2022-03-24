import React, {Component} from 'react';
import {Dialog as MDialog, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {Grid} from "@material-ui/core";


export class Dialog extends Component {

    render() {
        return (
            <MDialog onClose={this.props.handleClose} open={this.props.open} style={{maxHeight: 550,}}>
                <DialogTitle>
                    <Grid container alignItems={'center'}>
                        <Grid item xs={11}>
                            {this.props.dialogTitle}
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                aria-label="close"
                                onClick={this.props.handleClose}
                                sx={{
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>


                </DialogTitle>
                {this.props.children}
            </MDialog>
        );
    }
}
