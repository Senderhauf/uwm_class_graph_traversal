import React from 'react';
import {Button, Dialog, DialogContent, DialogActions, DialogTitle, withMobileDialog} from '@material-ui/core'
import {AppBar, Tabs, Tab, Typography} from '@material-ui/core'
import CurrentPreqs from './CurrentPrereqs.js'
import AddSinglePrereq from './AddSinglePrereq.js'

const TabContainer = (props) => (
    <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.filler}
    </Typography>
)

export default class Prereqs extends React.Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClickCancel = this.handleClickCancel.bind(this)
        this.state = {
            open:false,
            value: 0
        }
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClickCancel = () => {
        this.setState({open: false})
    }

    handleChange = (event, value) => {
        this.setState({value: value});
    };

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
                        <div>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Current" />
                                <Tab label="Add Single" />
                                <Tab label="Add 'OR' Group" />
                            </Tabs>
                            </AppBar>
                            {this.state.value === 0 && <CurrentPreqs course={this.props.course}/>}
                            {this.state.value === 1 && <AddSinglePrereq course={this.props.course}/>}
                            {this.state.value === 2 && <div>Add OR Group</div>}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}