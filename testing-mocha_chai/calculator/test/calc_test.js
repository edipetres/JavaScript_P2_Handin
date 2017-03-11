var expect = require('chai').expect;
var calculator = require('../lib/calculator');


describe("Calculator with basic functions", function() {
    it("adds two numbers", function(done) {
        expect(calculator.add(3,5)).to.equal(8);
        done();
    }); 
    it("subtracts two numbers", function(done) {
        expect(calculator.subtract(10,4)).to.equal(6);
        done();
    }); 
    it("multiplies two numbers", function(done) {
        expect(calculator.multiply(3,5)).to.equal(15);
        done();
    }); 
    it("divides two numbers", function(done) {
        expect(calculator.divide(14,2)).to.equal(7);
        done();
    }); 
    it("throws error if trying to divide by 0", function(done) {
        expect(calculator.divide(3,0)).to.throw(Error);
        done();
    })
});