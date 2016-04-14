import React from 'react';

//Import all components
import HeadPane from './HeadPane';
import Pane_L from './Pane_L';
import Pane_R from './Pane_R';


class Scene extends React.Component{
    render(){
        return (
            <div>
                <HeadPane />
                <Pane_R />
                <Pane_L />
            </div>
        );
    }
}


//Return values to father
export default Scene;
