import React from 'react';

class SetDisk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            sizeDisk : 0,
            sizeCluster : 32,
            selector : "FAT 16",
            key : "",
            kind : "disk",
            dir : [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
    }

    handleChange(e){

        let changes = {
            name : this.state.name,
            sizeDisk : this.state.sizeDisk,
            sizeCluster : this.state.sizeCluster,
            selector : this.state.selector,
            key : "",
            kind : "disk",
            dir : this.state.dir
        }

        switch(e.currentTarget.id + "")
        {
            case "name":
                changes.name = e.target.value
                break;
            case "size":
                changes.sizeDisk = e.target.value
                break;
            case "cluster":
                changes.sizeCluster = e.target.value
                break;
            case "selector":
                changes.selector = e.target.value
                break;
        }
        this.setState(changes)
    }

    getInfo(){
        let isValid = true;
        let sC = this.state.sizeCluster;

        isValid = (this.state.name.length > 0 && isValid);
        isValid = (this.state.sizeDisk > 0 && isValid);
        isValid = (sC > 31 && sC < 32768 && isValid);

        if(isValid){
            alert("Datos Validos");
            this.props.onMakeDisk(this.state);
        }else {
            //Remplazar por alertas customizadas mas tarde...
            alert("Hay campos vacios");
        }
    }

    render(){
        return (
            <section className="modal-window-mount">
                <article className="tools">
                    <button className="fa fa-times left" type="button"
                         name="button" onClick={this.props.closeModal}></button>
                    <button className="fa fa-minus left" type="button" name="button"></button>
                </article>
                <article className="">
                    <img src="assets/img/Harddrive-icon.png" alt="Harddrive-icon"></img>
                    <br></br>
                    <input className="input-modal" id="name" type="text"
                        name="name" value={this.state.name} onChange={this.handleChange}
                        placeholder="Name disk"></input>

                    <br></br>
                    <input className="input-modal" id="size" type="number" name="size"
                         value={this.state.sizeDisk} onChange={this.handleChange}
                         placeholder="Size disk"></input>

                     <p>{this.state.sizeDisk * Math.pow(10,-6) + "MB"}</p>

                    <input className="input-modal" id="cluster" type="number" name="name"
                        value={this.state.sizeCluster} onChange={this.handleChange}
                        placeholder="Size cluster"></input>

                    <p>{this.state.sizeCluster * Math.pow(10,-6) + "MB"}</p>

                    <select className="selector" name="selector">
                        <option id="selector" value="FAT_16" onClick={this.handleChange}>FAT 16</option>
                        <option id="selector" value="FAT_32" onClick={this.handleChange}>FAT 32</option>
                    </select>
                    <br></br>
                    <button id="format" className="btn-format"
                         type="button" name="button" onClick={this.getInfo}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        Make Disk
                    </button>
                </article>
            </section>
        );
    }
}

//Return values to father
export default SetDisk;
