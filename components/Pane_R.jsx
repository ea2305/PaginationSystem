import React from 'react';
import ItemsExp from './ItemsExp';

class Pane_R extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="right-p">
                <ItemsExp Data={this.props.Data} onSelect={this.props.selectedItem}/>
            </div>

        );
    }
}


//Return values to father
export default Pane_R;
