module.exports = {
    
    evolution: function(a,b) {
        if (a == 0){
            return Infinity;
        }
        return this.round(100 * (b -a) / a);
    },
    
    round: function(value){
        return Math.round(100 * value)/100;
    },
    
    wait: function(time, callback){
        setTimeout(function() {
            callback(18)
        }, time);
    }
}