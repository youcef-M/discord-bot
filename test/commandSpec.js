var chai = require("chai");
var expect = chai.expect;

var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var sinon = require("sinon");

var Command = require("../lib/Command");
var CommandList = require("../lib/CommandList");
var CommandParser = require("../lib/CommandParser");


var empty = new Command();
var command_list = new CommandList();
var command_parser = new CommandParser();

var item1 = new Command('item1', 0, function() {
    return 'item 1';
});
var item2 = new Command('item2', 0, function() {
    return 'item 2';
});
var item3 = new Command();

describe('Command Handling', function() {

    beforeEach(function() {
        if(command_list.list.length > 0) {
            command_list.list = [];
        }
    });

    describe('Command',function() {

        describe('Checking Object structure', function() {

            it('should have a string as trigger', function() {
                expect(empty.trigger).to.be.a('string');
            });

            it('should have an int as args', function() {
                expect(typeof empty.args).to.be.equal(typeof 0);
            });

            it('should have a function as command', function() {
                expect(empty.action).to.be.a('function');
            });
        });

    });

    describe('CommandList', function() {

        describe('#add', function() {

            it('should be a function', function() {
                expect(command_list.add).to.be.a('function');
            });

            it('should call isValidArray', function() {
                sinon.spy(command_list, 'isValidArray');
                command_list.add([], function() {});
                expect(command_list.isValidArray.withArgs([]).calledOnce).to.be.true;
                command_list.isValidArray.restore();
            });

            it('should call isCommand', function() {
                sinon.spy(command_list, 'isCommand');
                command_list.add(empty, function() {});
                expect(command_list.isCommand.withArgs(empty).calledOnce).to.be.true;
                command_list.isCommand.restore();
            });

            it('should throw and error if anything else is passed', function() {
                var spy = sinon.spy();
                command_list.add('true', spy);
                expect(spy).to.have.been.calledWith('Invalid argument type, expect String to be either a Command or an array of Command');

            });

            it('should add a Command to the list', function() {

                var item = new Command('add: Command', 0, function() {
                    return 'Testing the add method with 1 Command';
                });
                command_list.add(item);
                expect(command_list.list).to.deep.include.members([item]);
            });

            it('should add an array of Command to the list', function() {

                var item1 = new Command('item1', 0, function() {
                    return 'item 1';
                });
                var item2 = new Command('item2', 0, function() {
                    return 'item 2';
                });

                command_list.add([item1,item2]);
                expect(command_list.list).to.deep.include.members([item1,item2]);
            });

        });

        describe('#isValidArray', function() {

            it('should be a function', function() {
                expect(command_list.isValidArray).to.be.a('function');
            });

            it('should succeed if a Command array is passed', function() {
               expect(command_list.isValidArray([empty, empty])).to.be.true;
            });

            it('should fail if a casual array is passed', function() {
                expect(command_list.isValidArray(['string', 'c'])).to.be.false;
                expect(command_list.isValidArray([12, 42])).to.be.false;
                expect(command_list.isValidArray([12.42, 42.12])).to.be.false;
                expect(command_list.isValidArray([true, false])).to.be.false;
            });

            it('should fail for anything else', function() {
                expect(command_list.isValidArray(empty)).to.be.false;
                expect(command_list.isValidArray('string')).to.be.false;
                expect(command_list.isValidArray(42.12)).to.be.false;
                expect(command_list.isValidArray(42)).to.be.false;
                expect(command_list.isValidArray(true)).to.be.false;
            });

        });

        describe('#isCommand', function() {

            it('should be a function', function() {
                expect(command_list.isCommand).to.be.a('function');
            });

            it('should succeed if a Command is passed', function() {
               expect(command_list.isCommand(empty)).to.be.true;
            });

            it('should fail if anything else is passed', function() {
                expect(command_list.isCommand([])).to.be.false;
                expect(command_list.isCommand('string')).to.be.false;
                expect(command_list.isCommand(42.12)).to.be.false;
                expect(command_list.isCommand(42)).to.be.false;
                expect(command_list.isCommand(true)).to.be.false;
            })

        });

        describe('#addCommand', function() {

            it('should be a function', function() {
                expect(command_list.addCommand).to.be.a('function');
            });

            it('should call isNotDuplicate', function() {
                sinon.spy(command_list, 'isNotDuplicate');
                command_list.addCommand(empty);
                expect(command_list.isNotDuplicate.withArgs(empty).calledOnce).to.be.true;
                command_list.isNotDuplicate.restore();
            });

            it("should add item to the list", function() {

                var item = new Command('addCommand', 0, function() {
                    return 'Testing addCommand';
                });
                command_list.addCommand(item);
                expect(command_list.list).to.deep.include.members([item]);
            });

        });

        describe('#execute', function() {

            it('should be a function', function(){
                expect(command_list.execute).to.be.a('function');
            });

            it('should call the right function', function() {
                command_list.clear();
                command_list.add([item1, item2, item3]);
                expect(command_list.execute(1)).to.be.equal('item 2');
            });

        });

    });

    describe('CommandParser', function() {

        var list = new CommandList();

        list.add([item1,item2,item3]);

        describe('#init', function() {

            beforeEach(function() {
                command_parser.resetList();
            });

            it('should fail if first arg is not a CommandList', function() {
                var spy = sinon.spy();
                command_parser.init('test',spy);
                expect(spy).to.have.been.calledWith('Invalid argument type, expect String to be a CommandList');
            });

            it('should call updateList', function() {
                sinon.spy(command_parser, 'updateList');
                command_parser.init(list, function(error) {
                    console.log(error);
                });
                expect(command_parser.updateList.withArgs(list).calledOnce).to.be.true;
                command_parser.updateList.restore();
            });

            it('should update the trigger list', function() {
                command_parser.init(list, function(error) {
                    console.log(error);
                });
                expect(command_parser.trigger_list).to.deep.include.members(['item1', 'item2', '']);
            });

        });

        describe('#parse', function() {

            it('should be a function', function() {
                expect(command_parser.parse).to.be.a('function');
            });

            it('should return an array', function() {
                expect(command_parser.parse('!test command')).to.be.an('Array');
            });

        });

        describe('#trigger', function() {

            it('should return false if command is not in trigger_list', function() {
                expect(command_parser.trigger('!test')).to.be.false;
            });

            it('should return the trigger index if it is found', function() {
                expect(command_parser.trigger('item2')).to.be.equal(1);
            });

        });

        describe('#parseArgs', function() {

           it('should be a function', function() {
               expect(command_parser.parseArgs).to.be.a('function');
           });

           it('should parse a command with no long parameter', function() {
               expect(command_parser.parseArgs('String with no long parameter')).to.be.eql(['String', 'with', 'no', 'long', 'parameter']);
           });

           it('should parse a command with a long parameter', function() {
               expect(command_parser.parseArgs('String with <a long parameter>', true)).to.be.eql(['String', 'with', 'a long parameter']);
           });

        });
    });

});
