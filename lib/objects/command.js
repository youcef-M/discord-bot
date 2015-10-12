function Command(keyword, args, action) {
    this.keyword = keyword;
    this.args = args;
    this.action = action;
}

module.exports = Command;