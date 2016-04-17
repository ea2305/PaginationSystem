import kernel from './kernel'
import Configuration from './Configuration';

class Disk extends Configuration{

  constructor(name, diskSize, clusterSize){
    super();
    this.name;
    this.clusterSize;
    this.numberCluster;
    this.diskSize = diskSize;

    this.disk;
    this.structure;
    this.clusterTable;

    this.format(name, clusterSize);
  }

  format(name, clusterSize){
    this.name = name;
    this.clusterSize = clusterSize;
    this.numberCluster = Math.ceil(this.diskSize/clusterSize);

    this.formatStructure();
    this.formatClusterTable();
    this.formatDisk();
    this.setInfo();
    this.setClusterTable();
  }
  formatStructure(){
    this.structure = [];
    this.formatStructureOf(
      'info',
      this.CONSTANT.ZERO,
      this.CONSTANT.CLUSTERS_MINIMUM
    );
    this.formatStructureOf(
      'clusterTable',
      this.structure['info'].endPosition,
      Math.ceil(
        this.numberCluster / (this.clusterSize / this.CONSTANT.BYTES_NUMBER)
      )
    );
    this.formatStructureOf(
      'rootData',
      this.structure['clusterTable'].endPosition,
      this.CONSTANT.CLUSTERS_MINIMUM
    );
    this.formatStructureOf(
      'userData',
      this.structure['rootData'].endPosition,
      this.numberCluster - this.structure['rootData'].endPosition
    );
  }
  formatStructureOf(partition, position, numberCluster){
    this.structure[partition] = {
      startPosition: position,
      numberCluster: numberCluster,
      endPosition: position + numberCluster
    };
  }
  formatClusterTable(){
    this.clusterTable = kernel.getList(this.numberCluster, this.CONSTANT.ZERO);
  }
  formatDisk(){
    this.disk = kernel.getList(this.numberCluster, undefined);
  }

  setCluster(data, position, nextPosition){
    this.disk[position] = data;
    this.clusterTable[position] = nextPosition;
  }
  setClusters(data, position){
    for(var i=this.CONSTANT.ZERO; i<data.length; i++)
      this.setCluster(data[i], position[i], position[i+1]);
  }
  setData(partition, data){
    var emptyPositions = this.getEmptyPositions(
      Math.ceil(data.length/this.clusterSize),
      this.structure[partition].startPosition,
      this.structure[partition].endPosition
    );
    if(emptyPositions !== undefined){
      var listData = kernel.stringToList(data, this.clusterSize);
      this.setClusters(listData, emptyPositions);
      return(emptyPositions[0]);
    }else return undefined;
  }
  getEmptyPositions(size, startPosition, endPosition){
    var list = [];
    for(var i=startPosition; i<endPosition; i++){
      if(this.clusterTable[i] === 0){
        list.push(i);
        if(list.length === size) return list;
      }
    }
    return undefined;
  }
  setInfo(){
    this.delete(this.structure['info']);
    this.setData(
      'info',
      this.integerToHexadecimal(this.clusterSize)+
      this.integerToHexadecimal(
        this.structure['clusterTable'].numberCluster
      )+
      this.integerToHexadecimal(
        this.structure['rootData'].numberCluster
      )+
      this.integerToHexadecimal(
        this.structure['userData'].numberCluster
      )+
      kernel.getPartialString(this.name, this.CONSTANT.BYTES_NAME)
    );
  }
  integerToHexadecimal(number){
    return(
      kernel.getPartialString(
        String(kernel.integerToHexadecimal(number)),
        this.CONSTANT.BYTES_NUMBER
      )
    );
  }
  setClusterTable(){
    this.delete(this.structure['clusterTable'].startPosition);
    this.setData(
      'clusterTable',
      this.strClusterTable()
    );
  }
  strClusterTable(){
    var string = this.CONSTANT.EMPTY;
    for (var i=this.CONSTANT.ZERO; i<this.clusterTable.length; i++){
      string += this.integerToHexadecimal(
        (this.clusterTable[i] !== undefined) ?
        this.clusterTable[i] : i
      );
    }
    return string;
  }
  getListClusterTable(initialPosition){
    if(this.clusterTable[initialPosition] === 0)
      return undefined;
    var list = [];
    var position = initialPosition;
    list.push(position);
    while(this.clusterTable[position] !== undefined){
      position = this.clusterTable[position];
      list.push(position);
    }
    return list;
  }

  getData(initialPosition){
    var list = this.getListClusterTable(initialPosition);
    if(list === undefined)
      return undefined;
    var data = "";
    for (var i = 0; i < list.length; i++) {
      data += this.disk[list[i]];
    }
    return data;
  }

  cleanClustersPosition(initialPosition){
    var list = this.getListClusterTable(initialPosition);
    if(list === undefined)
      return undefined;
    for (var i = 0; i < list.length; i++) {
      this.clusterTable[list[i]] = 0;
    }
  }

  save(strData){
    var a = this.setData('userData', strData);
    this.setClusterTable();
    return a;
  }
  saveDirectory(strDirectory){
    this.delete(this.structure['rootData'].startPosition);
    var emptyPositions = this.getEmptyPositions(
      Math.ceil(strDirectory.length/this.clusterSize),
      this.structure['rootData'].startPosition,
      this.structure['userData'].endPosition
    );
    if(emptyPositions !== undefined){
      var listData = kernel.stringToList(strDirectory, this.clusterSize);
      this.setClusters(listData, emptyPositions);
      return(emptyPositions[0]);
    }else return undefined;
  }
  getDirectory(){
    return this.getData(this.structure['rootData'].startPosition);
  }
  delete(startPosition){
    this.cleanClustersPosition(startPosition);
  }
}

export default Disk;
