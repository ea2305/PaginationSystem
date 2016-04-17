import React from 'react';

class ItemsExp extends React.Component {
    constructor(props) {
        super(props);
    }

    clickOver(x,e){
        console.log("id de elemento seleccionado");
        let lastSelect = document.getElementsByClassName('selected_item');
        if(lastSelect.length > 0)
        {
            lastSelect[0].className = lastSelect[0].className.replace("selected_item","");
            console.log(lastSelect);
        }

        document.getElementById(e.currentTarget.id).className += " selected_item";
        this.props.onSelect(x,e);
    }

    render(){
        //Assign elements in disks
        let elements = this.props.Data.dir;
        console.log(elements);
        //Get all disks
        let items = elements.map((e,index) =>{
            return (

                <div id={"item-exp_" + e.key} key={"0" + e.key} className="item-exp"
                    onClick={this.clickOver.bind(this,e)}
                    onDoubleClick={this.props.openFile.bind(this,e)}>

                    {(()=>{
                        if(e.kind == "folder")
                            return (<i className="fa fa-folder-open-o" aria-hidden="true"></i>);
                        else
                            return (<i className="fa fa-file-text" aria-hidden="true"></i>);
                    })(this)}

                    <br></br>
                    {e.name}
                </div>
            );
        })

        return(
            <div>{items}</div>
        );
    }
}

//Return values to father
export default ItemsExp;
