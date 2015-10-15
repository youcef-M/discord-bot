var Percentage = require('../lib/Percentage');
var expect = require("chai").expect;

describe('Percentage', function() {
    
    describe('#evolution', function() {
        
        it('should give an evolution', function() {
            expect(Percentage.evolution(100, 200)).to.be.equal(100);
            expect(Percentage.evolution(100, 150)).to.be.equal(50);
            expect(Percentage.evolution(100, 50)).to.be.equal(-50);
        })
        
        it('should handle 0 evolution', function() {
            expect(Percentage.evolution(0, 100)).to.be.equal(Infinity);
        })
        
        it('should round values', function() {
            expect(Percentage.evolution(30, 100)).to.be.equal(233.33);
        })
        
    })
    
    describe('#wait', function() {
        
        it('should exist', function(){
            expect(Percentage.wait).to.be.a('function');
        })
        
        it('should wait', function(done) {
            Percentage.wait(300, function(test){
                expect(test).to.be.equal(18);
                done();
            })
        })
    })
    
    
})