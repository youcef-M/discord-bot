function CommandList(){

    this.list = [];

    this.add= function(arg, callback){
        if(this.isValidArray(arg)){
            for(var c = 0; c < arg.length; c++) {
                this.addCommand(arg[c]);
            }
        }else if(this.isCommand(arg)){
            this.addCommand(arg);
        }else {
            callback('Invalid argument type, expect ' + arg.constructor.name + ' to be either a Command or an array of Command');
        }
    };

    this.addCommand= function(command) {
        if (this.isNotDuplicate(command)) {
          this.list.push(command);
        }
    };


    this.isValidArray = function(param){
        var bool = param.constructor.name === 'Array';

        if(bool) {
            for(var i = 0; i < param.length; i++) {
                bool = bool && param[i].constructor.name === 'Command';
            }
        }

        return bool;
    };

    this.isCommand = function(param){
        return param.constructor.name === 'Command';
    };

    this.isNotDuplicate = function(command) {
        var bool = true;
        for( var i = 0; i < this.list.length; i++ ) {
          bool = bool && (this.list[i].trigger !== command.trigger);
        }
        return bool;
    };

    this.getList = function() {
        return this.list;
    };
    
    this.clear = function() {
        this.list = [];
    };
    
    this.execute = function(index, args) {
        var command = this.list[index];
        return command.action(args);
    };
}

module.exports = CommandList;

