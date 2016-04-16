import React from 'react';
import ItemsTree from './ItemsTree';

class Pane_L extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (

            <div className="left-p ">
                <ItemsTree Data={this.props.Data} onSelect={this.props.onSelect}/>
            </div>
        );

    }
}


//Return values to father
export default Pane_L;
