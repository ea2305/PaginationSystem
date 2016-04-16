import React from 'react';

class ItemsExp extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        //Assign elements in disks
        let elements = this.props.Data.dir;
        console.log(elements);
        //Get all disks
        let items = elements.map((e,index) =>{
            return (
                <div key={"0" + index} className="item-exp" onClick={this.props.onSelect.bind(this,e)}>
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
