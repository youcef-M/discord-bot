function CommandList() {
    
    /**
     * TODO: Learn how to implement unit tests with Mocha to delete the '../test.js' file and gain some time (this isn't in the repo BTW)
     * TODO: Handle the case where args is an array of commands and add a this.merge(CommandList) function
     * TODO: Figure out how to handle the callback with proper errors
     * TODO: Refactor this mess, too many conditions.
     * TODO: Rethink this.notIn(), it should be simpler
     */
    this.list = [];
    
    
    
    this.add = function(args, callback){
        if (typeof args !== 'object') {
            callback(new Error('Invalid type argument 1 of add'));
        }else{
            if(args.constructor.name === 'Command' && this.notIn(args,callback)) {
                this.list.push(args);
            }else if (!this.notIn(args,callback)){
                console.log('Error');
            }
        }
    };
    
    
    
    
    this.notIn = function(args, callback) {
        if(args.constructor.name === 'Command' && this.list.length > 0){
            for(var i=0; i<this.list.length; i++) {
                if(this.list[i].keyword === args.keyword) {
                    return false;
                }else{
                    return true;
                }
            }
        }else if(args.constructor.name === 'Command' && this.list.length === 0){
            return true;
        }
    }
};

module.exports = CommandList;