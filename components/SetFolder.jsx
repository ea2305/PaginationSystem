import React from 'react';

class SetFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            key : "",
            kind : "folder",
            dir : []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            name : e.target.value,
            key : "",
            kind : "folder",
            dir : []
        });
    }

    render(){
        return(
            <section className="modal-window-mount">
                <article className="tools">
                    <button className="fa fa-times left" type="button"
                         name="button" onClick={this.props.closeModal}></button>
                    <button className="fa fa-minus left" type="button" name="button"></button>
                </article>
                <article className="">
                    <img src="assets/img/Folder-icon.png" alt="Folder-icon"></img>
                    <br></br>
                    <input className="input-modal" id="name" type="text"
                        name="name" value={this.state.name} onChange={this.handleChange}
                        placeholder="Name Folder"></input>

                    <br></br>
                    <button id="makeFolder" className="btn-folder"
                         type="button" name="button" onClick={this.props.onMakeDir.bind(this,this.state)}>
                         <i className="fa fa-folder-o" aria-hidden="true"></i>
                        Make Folder
                    </button>
                </article>
            </section>
        );
    }
}

export default SetFolder;
