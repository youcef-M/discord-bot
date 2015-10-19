function CommandParser(){
    this.trigger_list = [];
    
    this.init = function(list, callback) {
        if(list.constructor.name !== 'CommandList'){
            callback('Invalid argument type, expect ' + list.constructor.name + ' to be a CommandList');
        }else {
            this.updateList(list);
        }
    };
    
    this.updateList = function(list) {
        if(list.getList().constructor.name === "Array") {
            for(var c = 0; c < list.getList().length; c++) {
                this.trigger_list.push(list.getList()[c].trigger);
            }
        }
    };
    
    this.reset = function() {
        this.trigger_list = [];
    };
    
    this.parse = function(message, list) {
        var index = message.indexOf(" "); 
        var command = message.substr(0, index); 
        var args = message.substr(index + 1);  
    
        return [this.trigger(command), args];
    };
    
    this.trigger = function(command) {
        for (var i = 0; i < this.trigger_list.length; i++) {
            if(this.trigger_list[i] === command) {
                return i;
            }
        }
        return false;
    };
    
    this.parseArgs = function(str, lookForQuotes) {
        var args = [];
        var readingPart = false;
        var part = '';
        for(var i=0; i<str.length; i++) {
            if(str.charAt(i) === ' ' && !readingPart) {
                args.push(part);
                part = '';
            } else {
                if((str.charAt(i) === '<' || str.charAt(i) === '>') && lookForQuotes) {
                    readingPart = !readingPart;
                } else {
                    part += str.charAt(i);
                }
            }
        }
        args.push(part);
        return args;
    };
    
}

module.exports = CommandParser;