var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
require("sinon-as-promised");
var Social = require("../lib/Social");
var Promise = require("promise");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


describe('Social', function() {
    
    var url = 'http://grafikart.fr';
    
    it('should have twitter_url', function() {
        expect(Social).to.have.property('twitter_url');
    });
    
    it('should have facebook_url', function() {
        expect(Social).to.have.property('facebook_url');
    });
    
    describe('#getTwitterCount', function() {
        
        afterEach(function(){
            if(Social.callAPI.restore){
                Social.callAPI.restore();
            }
        });
        
        it('should be a function', function() {
            expect(Social.getTwitterCount).to.be.a('function');
        });
        
        it('should call callAPI', function() {
            sinon.spy(Social, 'callAPI');
            Social.getTwitterCount(url);
            expect(Social.callAPI.withArgs(Social.twitter_url + url).calledOnce).to.be.true;
            Social.callAPI.restore();
        });
        
        it('should return count', function(done) {
            var stub = sinon.stub(Social, 'callAPI');
            stub.resolves({count:3});
            expect(Social.getTwitterCount(url)).to.eventually.be.equal(3).notify(done);
        });
    });
    
    describe('#getFacebookCount', function() {
        
        it('should be a function', function() {
            expect(Social.getFacebookCount).to.be.a('function');
        });
        
        it('should return shares', function(done) {
            var mock = sinon.mock(Social);
            mock.expects('callAPI')
                .once()
                .withArgs(Social.facebook_url + url)
                .resolves({shares:10});
            expect(Social.getFacebookCount(url)).to.eventually.equal(10).notify(done);
            mock.verify();
            mock.restore();
        })
    });
})