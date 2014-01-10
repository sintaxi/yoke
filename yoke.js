var fs    = require("fs")
var path  = require("path")

module.exports = function(sourcePath, callback){
  var sourceAbsolutePath = path.resolve(sourcePath)
  fs.readFile(sourceAbsolutePath, function(err, content){
    if(err) return callback(err)

    var files     = content.toString().split("\n")
    var total     = files.length
    var count     = 0
    var contents  = []
    var sourceDir = path.dirname(sourceAbsolutePath)
    var body      = []

    files.forEach(function(item){
      var childPath = path.join(sourceDir, item)
      fs.readFile(childPath, function(err, cont){
        count ++
        // TODO: order this
        body.push(cont.toString())
        if(count === total) callback(null, body.join("\n"))
      })
    })

  })
}
