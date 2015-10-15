module.exports = {
    
    list: [],
    
    add: function(arg, callback){
        if(this.isValidArray(arg)){
            
        }else if(this.isCommand(arg)){
            
        }else {
            callback(new Error('Invalid argument type, expect ' + arg.constructor.name + ' to be either a Command or an array of Command'));
        }
    },
    
    addCommand: function(command) {
        
    },
    
    
    isValidArray: function(param){
        var bool = param.constructor.name === 'Array';
        
        if(bool) {
            for(var i = 0; i < param.length; i++) {
                bool = bool && param[i].constructor.name === 'Command';
            }
        }
            
        return bool;
    },
    
    isCommand: function(param){
        return param.constructor.name === 'Command';
    }
    
};