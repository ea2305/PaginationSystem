import React from 'react';
import ReactTransitionGroup from 'react-addons-css-transition-group';

//Import all components
import HeadPane from './HeadPane';
import SetDisk from './SetDisk';
import Pane_L from './Pane_L';
import Pane_R from './Pane_R';


class Scene extends React.Component{

    constructor(props) {
        super(props);
        this.indexDisk = "03";//Because 2 are previos instance
        //Set all disks values
        this.state = {
            disks : [
                {
                    name : "Disk_A",
                    sizeDisk : 1000000,
                    sizeCluster : 32,
                    selector : "FAT 16",
                    key : "1",
                    kind : "disk",
                    dir : [
                    {
                        name : "Documents",
                        key : "01",
                        kind : "folder",
                        dir : [
                            {
                                key : "001",
                                kind : "file",
                                name : "Hola.txt",
                                size : 20,
                                type : "txt",
                                permisions : "r",
                                clusterStart : "",
                                date : "00/00/00,00:00"
                            },
                            {
                                key : "002",
                                kind : "file",
                                name : "Logo.png",
                                size : 20,
                                type : "png",
                                permisions : "r",
                                clusterStart : "",
                                date : "00/00/00,00:00"
                            },
                            {
                                key : "003",
                                kind : "file",
                                name : "Mono.txt",
                                size : 20,
                                type : "txt",
                                permisions : "r",
                                clusterStart : "",
                                date : "00/00/00,00:00"
                            }
                        ]
                    }
                    ]
                }
            ],
            current : {dir : []},
            mode : 0,
            selected : {}
        }

        //Import this to use in method !important handlers
        this.onSelect = this.onSelect.bind(this);
        this.onMountDisk = this.onMountDisk.bind(this);
        this.onUnmountDisk = this.onUnmountDisk.bind(this);
        this.onMakeFile = this.onMakeFile.bind(this);
        this.onDeleteFile = this.onDeleteFile.bind(this);
        this.onMakeDisk = this.onMakeDisk.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onMakeDir = this.onMakeDir.bind(this);
        this.onDeleteDir = this.onDeleteDir.bind(this);
    }

    //Call modal to make disk
    onMountDisk(){
        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : 1,//Modify this variable to changes in modes
            selected : this.state.selected
        });
    }

    //Make disk
    onMakeDisk(e){
        let backup = this.state.disks.slice();
        e.key = this.indexDisk++;
        e.kind = "disk";
        backup.push(e)

        this.setState({
            disks : backup,
            current : this.state.current,
            mode : this.state.mode,
            selected : this.state.selected
        });
    }

    onUnmountDisk(){
        console.log("unmount");
        let current = this.state.current;
        this.state.disks.map((e,index) => {
            if(current.name == e.name && current.kind == "disk"){
               this.state.disks.splice(index, 1);
            }
        });

        console.log('pos slice .............');
        console.log(this.state.disks);

        this.setState({
            disks : this.state.disks,
            current : {dir : []},
            mode : this.state.mode,
            selected : this.state.selected
        })

    }

    //Render modal window
    onMakeFile(){
        console.log('make file');
    }

    onDeleteFile(){
        console.log("delete file");
    }

    onSelect(x,e){
        console.log(e);
        console.log(x);

        this.setState({
            disks : this.state.disks,
            current : x,
            mode : this.state.mode,
            selected : this.state.selected
        });
    }

    onMakeDir(){
        console.log('make folder');
    }

    onDeleteDir(){
        console.log('delete folder');
    }

    closeModal(){
        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : 0,//Return value to main view
            selected : this.state.selected
        });
    }

    selectedItem(x,e){
        console.log(x);
        console.log(e);
    }

    render(){
        if(this.state.mode == 0){
            return (
                <div className="Scene">
                    <HeadPane Data={this.state} onMakeFile={this.onMakeFile}
                        onDeleteFile={this.onDeleteFile} onMountDisk={this.onMountDisk}
                        onUnmountDisk={this.onUnmountDisk} onDeleteDir={this.onDeleteDir} onMakeDir={this.onMakeDir}/>
                    <div className="Panes">
                        <Pane_L Data={this.state} onSelect={this.onSelect} />
                        <Pane_R Data={this.state.current} selectedItem={this.selectedItem}/>
                    </div>
                </div>
            );
        }else{

            return (
                <div className="Scene ">
                    <SetDisk onMakeDisk={this.onMakeDisk} closeModal={this.closeModal}/>
                    <HeadPane Data={this.state} onMakeFile={this.onMakeFile}
                        onDeleteFile={this.onDeleteFile} onMountDisk={this.onMountDisk}
                        onUnmountDisk={this.onUnmountDisk} />
                    <div className="Panes">
                        <Pane_L Data={this.state} onSelect={this.onSelect} />
                        <Pane_R Data={this.state.current} />
                    </div>
                </div>
            );

        }

    }
}


//Return values to father
export default Scene;
