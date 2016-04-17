import Configuration from './Configuration';

var config = new Configuration();
const CONSTANT = config.CONSTANT;

class kernel extends Configuration{

  static getPartialString(string, limit){
    return (
      (string.length > limit) ?
        (string.substring(CONSTANT.ZERO, limit)) :
        (string + kernel.getSpaces(limit-string.length))
    );
  }
  static getSpaces(numberSpaces){
    return (
      (numberSpaces > CONSTANT.ZERO) ?
        (CONSTANT.SPACE + kernel.getSpaces(--numberSpaces)) :
        (CONSTANT.EMPTY)
    );
  }
  static hexadecimalToInteger(number){
    return(
      parseInt(number, CONSTANT.HEXADECIMAL_BASE)
    );
  }
  static integerToHexadecimal(number){
    return(
      number.toString(CONSTANT.HEXADECIMAL_BASE)
    );
  }
  static getList(number, element){
    var list = [];
    for(var i=CONSTANT.ZERO; i<number; i++)
      list.push(element);
    return list;
  }
  static stringToList(string, number){
    var list = [];
    while (string !== undefined){
      if(string.length > number){
        list.push(string.substring(CONSTANT.ZERO, number));
        string = string.substring(number);
      }else{
        list.push(string);
        string = undefined;
      }
    }
    return list;
  }

}

export default kernel;
