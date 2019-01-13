import React from 'react';
import {Button, Dialog, DialogContent, DialogActions, DialogTitle, withMobileDialog} from '@material-ui/core'

export default class Prereqs extends React.Component{
    constructor(){
        super()
        this.state = {
            open:false
        }
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClickCancel = () => {
        this.setState({open: false})
    }

    render(){
        const {fullscreen} = this.props

        return(
            <div>
                <Button onClick={this.handleClickOpen}>
                    Prequisites
                </Button>
                <Dialog
                    fullScreen={fullscreen}
                    open={this.state.open}
                    onClose={this.handleClickCancel}
                >
                    <DialogTitle>{"Prequisites"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>

                </Dialog>
            </div>
        )
    }
}