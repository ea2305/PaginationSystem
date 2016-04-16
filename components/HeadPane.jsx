import React from 'react';

class HeadPane extends React.Component{

    constructor (props){//Method really importat to use react
        super(props);
    }

    render() {
        //Add buttons for actions in explorer main
        return (
            <div className="head-explorer ">
                <button className="btn left" type="button" name="button" >
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <button className="btn left" type="button" name="button" >
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
                <button className="btn right" type="button" name="button" onClick={this.props.onMountDisk}>
                    <i className="fa fa-hdd-o" aria-hidden="true"></i>
                    <p>Mount</p>
                </button>
                <button className="btn right" type="button" name="button" onClick={this.props.onUnmountDisk}>
                    <i className="fa fa-minus-square" aria-hidden="true"></i>
                    <p>Unmount</p>
                </button>
                <button className="btn right" type="button" name="button" onClick={this.props.onMakeFile}>
                    <i className="fa fa-file-o " aria-hidden="true"></i>
                    <p>Make</p>
                </button>
                <button className="btn right" type="button" name="button" onClick={this.props.onDeleteFile}>
                    <i className="fa fa-file-excel-o" aria-hidden="true"></i>
                    <p>Delete</p>
                </button>
                <button className="btn right" type="button" name="button" onClick={this.props.onMakeDir}>
                    <i className="fa fa-folder" aria-hidden="true"></i>
                    <p>Make</p>
                </button>
                <button className="btn right" type="button" name="button" onClick={this.props.onDeleteDir}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    <p>Delete</p>
                </button>
            </div>
        );
    }
}


//Return values to father
export default HeadPane;
