var yoke = require("../")
var should = require("should")

describe("Missing File", function(){

  it("return error", function(done){
    yoke("test/fixtures/err-bundle.js.yoke", function(err, output){
      should.exist(err)
      err.code.should.eql("ENOENT");
      
      done()
    })
  })

})