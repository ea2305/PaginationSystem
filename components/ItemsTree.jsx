import React from 'react';

class ItemsTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : []
        }
        this.clickOver = this.clickOver.bind(this);
    }

    clickOver(x,e){
        console.log("id de elemento seleccionado");
        let lastSelect = document.getElementsByClassName('selected');
        if(lastSelect.length > 0)
        {
            lastSelect[0].className = lastSelect[0].className.replace("selected","");
            console.log(lastSelect);
        }

        document.getElementById(e.currentTarget.id).className += " selected";
        this.props.onSelect(x,e);
    }

    render(){
        //Assign elements in disks
        let elements = this.props.Data.disks;
        //Get all disks
        this.state.items = elements.map((e,index) =>{

            return (
                <div key={e.key}>
                    <div id={e.key} className="item-tree center" onClick={this.clickOver.bind(this,e)}>
                        <i className="fa fa-hdd-o" aria-hidden="true"></i>
                        {" " + e.name}
                    </div>
                    <Directory Files={e.dir} onClick={this.clickOver}/>
                </div>
            );
        })

        return(
            <div>{this.state.items}</div>
        );
    }
}

class Directory extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        let Folders = this.props.Files;

        let elements = Folders.map((e,index) => {
            return(
                <div id={"file_" + e.key} key={e.key + index} className="file-tree center" onClick={this.props.onClick.bind(this,e)}>
                    {(()=>{
                        if(e.kind == "folder"){
                            return(<i className="fa fa-folder-o" aria-hidden="true"></i>);
                        }else{
                            return(<i className="fa fa-files-o" aria-hidden="true"></i>);
                        }
                    })(this)}
                    {" " + e.name}
                </div>
            );
        });

        return(
            <div>
                {elements}
            </div>
        );
    }

}

//Return values to father
export default ItemsTree;
