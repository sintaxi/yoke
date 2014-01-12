var fs    = require("fs")
var path  = require("path")
var os    = require("os")

module.exports = function(sourcePath, callback){

  // convert to absolute path
  var sourceAbsolutePath = path.resolve(sourcePath)

  // read source file
  fs.readFile(sourceAbsolutePath, function(err, content){
    if(err) return callback(err)

    var files     = content.toString().split(os.EOL)
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
        if(count === total) callback(null, body.join(os.EOL))
      })
    })(i)

  })
}
