var fs    = require("fs")
var path  = require("path")
var os    = require("os")
var mime = require('mime');

// Load Moden Web Languages Mine types
mime.load('./mwl.types');

var destFileMime = function(sourcePath) {
  var destFile = sourcePath.split(path.sep).pop();
  var fileParts = destFile.split(".");
  // We should err if there are not at least 3 parts, perhaps exactly three parts.
  // console.log(fileParts.length);

  // Should we error if this isnt a yoke file?
  var yokeExt = fileParts.pop();
  var destExt = fileParts.pop();

  return mime.lookup(destExt);
}

module.exports = function(sourcePath, callback){

  // convert to absolute path
  var sourceAbsolutePath = path.resolve(sourcePath)

  // Lets do this first, so we can error before touching disk;
  var destMime = destFileMime(sourceAbsolutePath);

  // read source file
  fs.readFile(sourceAbsolutePath, function(err, content){
    if(err) return callback(err)

    var files     = content.toString().split(os.EOL)
    var total     = files.length
    var count     = 0
    var contents  = []
    var sourceDir = path.dirname(sourceAbsolutePath)
    var body      = new Array(total - 1)
    var types     = [];

    for (var i = 0; i < total; i++)(function(i){
      var childPath = path.join(sourceDir, files[i])
      types.push(mime.lookup(files[i]));

      fs.readFile(childPath, function(err, cont){
    
        if (err) {
          return callback(err);
        } else {
          count ++;
          body.splice(i, 1, cont.toString())  
        }
        
        if(count === total) {
          var passed = types.every(function(element){
            return (element === destMime);
          })

          if (passed) {
            callback(null, body.join(os.EOL)); 
          } else {
            callback(new Error("Mixed Mime Types"), null);
          }
          
        }
      })
    })(i)
  })
}