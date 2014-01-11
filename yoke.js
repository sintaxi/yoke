var fs    = require("fs")
var path  = require("path")

module.exports = function(sourcePath, callback){

  // convert to absolute path
  var sourceAbsolutePath = path.resolve(sourcePath)
  var lf = (process.platform === "win32") ? "\r\n" : "\n";

  // read source file
  fs.readFile(sourceAbsolutePath, function(err, content){
    if(err) return callback(err)

    var files     = content.toString().split(lf)
    var total     = files.length
    var count     = 0
    var contents  = []
    var sourceDir = path.dirname(sourceAbsolutePath)
    var body      = new Array(total - 1)

    for (var i = 0; i < total; i++)(function(i){
      var childPath = path.join(sourceDir, files[i])
      fs.readFile(childPath, function(err, cont){
        count ++
        body.splice(i, 1, cont.toString())
        if(count === total) callback(null, body.join(lf))
      })
    })(i)

  })
}
