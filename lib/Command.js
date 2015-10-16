
function Command(trigger, args, action) {
    this.trigger = trigger || '';
    this.args = args || 0;
    this.action = action || function() {};
}


module.exports = Command;