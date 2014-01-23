var yoke = require("../");
var should = require("should");

describe("Mix Mime", function() {

  it("return error", function(done) {
    yoke("test/fixtures/mix-bundle.js.yoke", function(err, output) {
      should.exist(err);
      done();
    });
  });

it("return no error on good mix-mime results", function(done) {
    yoke("test/fixtures/mix-good-bundle.html.yoke", function(err, output) {
      should.not.exist(err);
      done();
    });
  });

});