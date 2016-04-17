import React from 'react';
import ReactTransitionGroup from 'react-addons-css-transition-group';

//Disk virtual script
import Disk from '../assets/js/Disk';

//Import all components
import HeadPane from './HeadPane';
import Pane_L from './Pane_L';
import Pane_R from './Pane_R';

//Modals components
import SetDisk from './SetDisk';
import SetFolder from './SetFolder';
import SetFile from './SetFile';

class Scene extends React.Component{

    constructor(props) {
        super(props);
        //Control variables
        this.indexDisk = "03";//Because 2 are previos instance
        this.indexFolder = "0300";
        this.indexFiles = "10030";
        this.VirtualDisk = [];

        //Set all disks values
        this.state = {
            disks : [],
            current : {dir : []},
            mode : 0,
            selected : {},
            nameFile : "Hola.txt",
            infoFile : "Nuevo texto de pruebas"
        }

        //Import this to use in method !important handlers
        this.setinfoText = this.setinfoText.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onMountDisk = this.onMountDisk.bind(this);
        this.onUnmountDisk = this.onUnmountDisk.bind(this);
        this.onMakeFile = this.onMakeFile.bind(this);
        this.onDeleteFile = this.onDeleteFile.bind(this);
        this.onMakeDisk = this.onMakeDisk.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onMakeDir = this.onMakeDir.bind(this);
        this.onCallDir = this.onCallDir.bind(this);
        this.onDeleteDir = this.onDeleteDir.bind(this);
        this.onCallFile = this.onCallFile.bind(this);
        this.openFile = this.openFile.bind(this);
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
        //Create variable of disk
        var DiskTemp = new Disk(e.name, e.sizeDisk, e.sizeCluster);
        console.log(DiskTemp);
        console.log(this.VirtualDisk);
        this.VirtualDisk[e.key] = DiskTemp;

        this.setState({
            disks : backup,
            current : this.state.current,
            mode : this.state.mode,
            selected : this.state.selected
        });

    }

    //REmove disk in array disks
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
    onMakeFile(y,e){

        var current = this.state.current;
        var starCluster = 0;
        var index = "";

        console.log('texto en props');
        console.log(this.state.infoFile);
        //Set key of element
        y.key = this.indexFiles++;

        switch (current.kind) {
            case "disk":
                index = current.key;
                starCluster = this.VirtualDisk[index].save(this.state.infoFile);
                y.father = this.state.current.key;//Add father
                break;
            case "folder":
                index = current.father;
                starCluster = this.VirtualDisk[index].save(this.state.infoFile);
                y.father = this.state.current.father;//Add father
                break;
            default:
                break
        }
        //information of start id
        y.clusterStart = starCluster;

        if(starCluster !== undefined){//Save in current element
            this.state.current.dir.push(y);
            this.VirtualDisk[index].saveDirectory(JSON.stringify(y));
        }

        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : this.state.mode,
            selected : this.state.selected,
            nameFile : this.state.nameFile,
            infoFile : this.state.infoFile
        })
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
    onCallDir(){
        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : 2,
            selected : this.state.selected
        });
    }

    onCallFile(){
        console.log('Call modal file');
        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : 3,
            selected : this.state.selected
        });
    }

    onMakeDir(x,e){
        console.log('Make Dir');
        console.log(x);
        let current = this.state.current;
        if(current.name != undefined && current.kind == "disk"){
            x.key = this.indexFolder++;
            x.father = current.key;
            x.kind = "folder"
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

    //Apertura de archivo modificacion de estado : mode
    openFile(x,e){
        console.log(x);
        let text  = this.VirtualDisk[x.father].getData(x.clusterStart);
        if(x.kind == "file"){
            this.setState({
                disks : this.state.disks,
                current : this.state.current,
                mode : 3,
                selected : x,
                nameFile : x.name,
                infoFile : text
            });
        }

    }

    //Modify all information of infoFile
    setinfoText(e){
        console.log('information ');
        console.log(e.target.value);
        this.setState({
            disks : this.state.disks,
            current : this.state.current,
            mode : this.state.mode,
            selected : this.state.selected,
            nameFile : this.state.nameFile,
            infoFile : e.target.value
        })
    }
    render(){

        return (
            <div className="Scene">
                {(() => {
                    switch (this.state.mode) {
                        case 0:
                            return;
                        case 1:
                            return (<SetDisk onMakeDisk={this.onMakeDisk} closeModal={this.closeModal} />);
                        case 2:
                            return (<SetFolder onMakeDir={this.onMakeDir} closeModal={this.closeModal} />);
                        default:
                            return (<SetFile textDefault={this.state.infoFile}
                                    nameFile={this.state.nameFile} onMakeFile={this.onMakeFile}
                                    closeModal={this.closeModal} setText={this.setinfoText}/>);
                    }
                })(this)}
                <HeadPane Data={this.state} onMakeFile={this.onCallFile}
                    onDeleteFile={this.onDeleteFile} onMountDisk={this.onMountDisk}
                    onUnmountDisk={this.onUnmountDisk} onDeleteDir={this.onDeleteDir} onMakeDir={this.onCallDir} />
                <div className="Panes">
                    <Pane_L Data={this.state} onSelect={this.onSelect} />
                    <Pane_R Data={this.state.current} selectedItem={this.selectedItem}
                        openFile={this.openFile}/>
                </div>
            </div>
        );

    }
}


//Return values to father
export default Scene;


/*

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
            father : "Disk_A",
            dir : [
                {
                    key : "001",
                    kind : "file",
                    father : "Disk_A",
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
                    father : "Disk_A",
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
                    father : "Disk_A",
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
*/
