var expect = require('chai').expect;
var lister = require('../lib/2_async_code');

describe("File lister", function() {
    it("should list all .js files", function(done){
        lister('./','js', function(err,data){
            expect(err).to.be.null;
            done();
        })
        
    })
})