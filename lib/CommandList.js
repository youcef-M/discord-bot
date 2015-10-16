module.exports = {

    list: [],

    add: function(arg, callback){
        if(this.isValidArray(arg)){
            for(var i = 0; i < arg.length; i++) {
                this.addCommand(arg[i]);
            }
        }else if(this.isCommand(arg)){
            this.addCommand(arg);
        }else {
            callback('Invalid argument type, expect ' + arg.constructor.name + ' to be either a Command or an array of Command');
        }
    },

    addCommand: function(command) {
        if (this.isNotDuplicate(command)) {
          this.list.push(command);
        }
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
    },

    isNotDuplicate: function(command) {
        var bool = true;
        for( var i = 0; i < this.list.length; i++ ) {
          bool = bool && (this.list[i].trigger === command.trigger);
        }
        return bool;
    }

};
