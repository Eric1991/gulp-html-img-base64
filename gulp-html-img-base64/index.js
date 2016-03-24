var path = require('path');
var fs = require('fs');
var through = require('through2');

function toBase64(options) {
    var opts = options || {};
    var baseDir = opts.baseDir || '.';

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
				
        var content = file.contents.toString();
        var images = content.match(/src[\s]*=[\s]*"[\s]*?([^"\s]+)[\s]*"?\s*/g);
        var currentPath = __dirname + '../../../' + baseDir;
        if(images != null && images.length > 0) {
        	  images.forEach(function(item) {
				            imageURL = item.replace(/\(|\)|\'/g, '');
				            imageURL = imageURL.replace(/\s/g, "");
				            imageURL = imageURL.replace(/^url/g, '');
				            imageURL = imageURL.substring(5,imageURL.length-1);
				            var route = path.join(currentPath, imageURL);
				            var filepath = fs.realpathSync(route);
				            var extname = path.extname(imageURL).slice(1);
				            var imageContent = new Buffer(fs.readFileSync(filepath)).toString('base64');
				            content = content.replace(item, 'src="data:image/' + extname.toLowerCase() + ';base64,' + imageContent + '"');
			      });

        		file.contents = new Buffer(content);
        		this.push(file);
        }
				
				//css file
				images = content.match(/url\([^\)]+\)/g);
				if(images != null && images.length > 0) {
							images.forEach(function(item) {
				            imageURL = item.replace(/\(|\)|\'/g, '');
				            imageURL = imageURL.replace(/\s/g, "");
				            imageURL = imageURL.replace(/^url/g, '');
				            var route = path.join(currentPath, imageURL);
				            var filepath = fs.realpathSync(route);
				            var extname = path.extname(imageURL).slice(1);
				            var imageContent = new Buffer(fs.readFileSync(filepath)).toString('base64');
				            content = content.replace(item, 'url(\'data:image/' + extname.toLowerCase() + ';base64,' + imageContent + '\')');
			      	});

        			file.contents = new Buffer(content);
        			this.push(file);
				}
				
        cb();
    })
}

module.exports = toBase64;