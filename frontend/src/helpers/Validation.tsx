

export async function Validation(param: any, method: 'null' | 'nullString' | 'nullArray' )  {
    switch(method) {
        case 'null':
            if(param !== null){
                return true
              }else{
                return false
              }
          break;
        case 'nullString':
          if(param !== ""){
            return true
          }else{
            return false
          }
          break;
        case 'nullArray':
          if(param.length > 0){
            return true
          }else{
            return false
          }
          break;
        default:
          return false
      }
  }