import React from 'react';

class SetFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key : "",
            kind : "file",
            father : "",
            name : this.props.nameFile,
            size : 0,
            type : "txt",
            permisions : "rw",
            clusterStart : "",
            date : "00/00/00,00:00"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    setText(e){
        this.props.textDefault = e.target.value;
        console.log('hola ----');
        console.log(this.props.textDefault);
    }

    handleChange(e){
        this.setState({
            name : e.target.value,
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
                    <br></br>
                    <input className="input-modal" id="name" type="text"
                        name="name" value={this.state.name} onChange={this.handleChange}
                        placeholder="Name File"></input>
                    <textarea name="name" rows="8" cols="40" defaultValue={this.props.textDefault} onChange={this.props.setText}></textarea>
                    <br></br>
                    <button id="makeFolder" className="btn-file"
                         type="button" name="button" onClick={this.props.onMakeFile.bind(this,this.state)}>
                         <i className="fa fa-file-o" aria-hidden="true"></i>
                         Save File
                    </button>
                </article>
            </section>
        );
    }
}

export default SetFile;
