import React from 'react';
import ReactTransitionGroup from 'react-addons-css-transition-group';

//Import all components
import HeadPane from './HeadPane';
import SetDisk from './SetDisk';
import SetFolder from './SetFolder';
import Pane_L from './Pane_L';
import Pane_R from './Pane_R';


class Scene extends React.Component{

    constructor(props) {
        super(props);
        this.indexDisk = "03";//Because 2 are previos instance
        this.indexFolder = "0300";
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
        this.onMountDir = this.onMountDir.bind(this);
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

    //CallModal
    onMountDir(){
        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : 2,
            selected : this.state.selected
        });
    }

    onMakeDir(x,e){
        console.log('Make Dir');
        console.log(x);
        let current = this.state.current;
        if(current.name != undefined && current.kind == "disk"){
            x.key = this.indexFolder++;
            current.dir.push(x)
        }

        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : this.state.mode,
            selected : this.state.selected
        })
    }

    onDeleteDir(){
        console.log('delete folder');
        let current = this.state.current;

        for(var i = this.state.disks.length - 1; i >= 0 ; i--){
            for(var j = this.state.disks[i].dir.length - 1; j >= 0 ; j--){
                if(current.name == this.state.disks[i].dir[j].name && current.kind == "folder"){
                    this.state.disks[i].dir.splice(j,1);
                }
            }
        }

        console.log(this.state.disks);
        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : this.state.mode,
            selected : this.state.selected
        });
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

        return (
            <div className="Scene">
                {(() => {
                    switch (this.state.mode) {
                        case 0:
                            return;
                        case 1:
                            return <SetDisk onMakeDisk={this.onMakeDisk} closeModal={this.closeModal} />;
                        case 2:
                            return <SetFolder onMakeDir={this.onMakeDir} closeModal={this.closeModal} />;
                        default:
                            return;
                    }
                })(this)}
                <HeadPane Data={this.state} onMakeFile={this.onMakeFile}
                    onDeleteFile={this.onDeleteFile} onMountDisk={this.onMountDisk}
                    onUnmountDisk={this.onUnmountDisk} onDeleteDir={this.onDeleteDir} onMakeDir={this.onMountDir} />
                <div className="Panes">
                    <Pane_L Data={this.state} onSelect={this.onSelect} />
                    <Pane_R Data={this.state.current} selectedItem={this.selectedItem}/>
                </div>
            </div>
        );

    }
}


//Return values to father
export default Scene;
