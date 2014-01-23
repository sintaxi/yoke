var yoke = require("../")
var should = require("should")

describe("yoke", function(){

  it("should exist", function(done){
    should.exist(yoke)
    done()
  })

  it("should be cool", function(done){
    yoke("test/fixtures/bundle.txt.yoke", function(err, output){
      should.not.exist(err)
      should.exist(output)
      output.should.eql("one\ntwo")
      done()
    })
  })

})