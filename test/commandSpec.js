var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var sinon = require("sinon");
require("sinon-as-promised");

var Promise = require("promise");

var Command = require("../lib/Command");
var CommandList = require("../lib/CommandList");

var empty = new Command();

describe('Command Handling', function() {

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
                expect(CommandList.add).to.be.a('function');
            });

            it('should call isValidArray', function() {
                sinon.spy(CommandList, 'isValidArray');
                CommandList.add([], function() {});
                expect(CommandList.isValidArray.withArgs([]).calledOnce).to.be.true;
                CommandList.isValidArray.restore();
            });

            it('should call isCommand', function() {
                sinon.spy(CommandList, 'isCommand');
                CommandList.add(empty, function() {});
                expect(CommandList.isCommand.withArgs(empty).calledOnce).to.be.true;
                CommandList.isCommand.restore();
            });

            it('should throw and error if anything else is passed', function() {
                var spy = sinon.spy();
                CommandList.add('true', spy);
                expect(spy).to.have.been.calledWith('Invalid argument type, expect String to be either a Command or an array of Command');
                
            });
            
            it('should add a Command to the list', function() {
                CommandList.list = [];
                var item = new Command('add: Command', 0, function() { 
                    return 'Testing the add method with 1 Command';
                });
                CommandList.add(item);
                expect(CommandList.list).to.deep.include.members([item]);
            });
            
            it('should add an array of Command to the list', function() {
                CommandList.list = [];
                var item1 = new Command('item2', 0, function() { 
                    return 'item 1';
                });
                var item2 = new Command('item2', 0, function() { 
                    return 'item 2';
                });
                CommandList.add([item1,item2]);
                expect(CommandList.list).to.deep.include.members([item1,item2]);
            });

        });

        describe('#isValidArray', function() {

            it('should be a function', function() {
                expect(CommandList.isValidArray).to.be.a('function');
            });

            it('should succeed if a Command array is passed', function() {
               expect(CommandList.isValidArray([empty, empty])).to.be.true;
            });

            it('should fail if a casual array is passed', function() {
                expect(CommandList.isValidArray(['string', 'c'])).to.be.false;
                expect(CommandList.isValidArray([12, 42])).to.be.false;
                expect(CommandList.isValidArray([12.42, 42.12])).to.be.false;
                expect(CommandList.isValidArray([true, false])).to.be.false;
            });


            it('should fail for anything else', function() {
                expect(CommandList.isValidArray(empty)).to.be.false;
                expect(CommandList.isValidArray('string')).to.be.false;
                expect(CommandList.isValidArray(42.12)).to.be.false;
                expect(CommandList.isValidArray(42)).to.be.false;
                expect(CommandList.isValidArray(true)).to.be.false;
            });
        });

        describe('#isCommand', function() {

            it('should be a function', function() {
                expect(CommandList.isCommand).to.be.a('function');
            });

            it('should succeed if a Command is passed', function() {
               expect(CommandList.isCommand(empty)).to.be.true;
            });

            it('should fail if anything else is passed', function() {
                expect(CommandList.isCommand([])).to.be.false;
                expect(CommandList.isCommand('string')).to.be.false;
                expect(CommandList.isCommand(42.12)).to.be.false;
                expect(CommandList.isCommand(42)).to.be.false;
                expect(CommandList.isCommand(true)).to.be.false;
            })
        });

        describe('#addCommand', function() {

            it('should be a function', function() {
                expect(CommandList.addCommand).to.be.a('function');
            });
            
            it('should call isNotDuplicate', function() {
                sinon.spy(CommandList, 'isNotDuplicate');
                CommandList.addCommand(empty);
                expect(CommandList.isNotDuplicate.withArgs(empty).calledOnce).to.be.true;
                CommandList.isNotDuplicate.restore();
            });
    
            it("should add item to the list", function() {
                CommandList.list = [];
                var item = new Command('addCommand', 0, function() { 
                    return 'Testing addCommand';
                });
                CommandList.addCommand(item);
                expect(CommandList.list).to.deep.include.members([item]);
            });
            
        });
    });

});
