import React from 'react';

class ItemsExp extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        //Assign elements in disks
        let elements = this.props.Data.disks.dir;
        console.log(elements);
        return(
            <div>x</div>
        );
    }
}

//Return values to father
export default ItemsExp;
