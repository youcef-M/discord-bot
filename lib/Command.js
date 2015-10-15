function Command(trigger, args, action) {
    this.trigger = trigger;
    this.args = args;
    this.action = action;
}

function Command(){
    this.trigger = '';
    this.args = 0;
    this.action = function() {};
}

module.exports = Command;