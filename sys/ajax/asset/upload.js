/*
 * author bh-lay
 * demo 
 */

var fs = require('fs');

exports.upload = function (req,res_this){
	var json = {
		'code':200,
		'fields' : [],
		'files' : []
	}
	parse.request(req,function(err,fields, files){
		var errorFiles = [];
		var ROOT = fields.root || '';
		ROOT = ROOT.replace(/^\/|\/$/g,'');
		if(err){
			code = 201
		}else if(files.length){
			json.fields = fields;
			var baseRoot = fields.root || '';
			//消除参数中首尾的｛/｝
			baseRoot = baseRoot.replace(/^\/|\/$/g,'');
			var newFiles = [];
			for(var i in files){
			/*
				fs.rename(files[i].path, "../../asset/" + baseRoot + '/' + files[i].name,function(err){
	    	    	if(err){
	    	    		errorFiles.push(files[i]);
	    	    	}else{
	    	    		newFiles.push({
	    	    			'name' : files[i]['name'],
	    	    			'path' : 'http://asset.bh-lay.com/' + ROOT + '/' + files[i]['name']
	    	    		});
	    	    	}
				});
			*/
				fs.rename(files[i].path,"../../asset/" + ROOT + '/' + files[i].name);
				newFiles.push({
 	    			'name' : files[i]['name'],
 	    			'path' : 'http://asset.bh-lay.com/' + ROOT + '/' + files[i]['name']
 	    		});
			}
			json.files = newFiles;
			if(errorFiles.length > 0){
				json.code = 203;
				json.fail = errorFiles;
			}
		}
		res_this.json(json);
	//	res_this.html(200,JSON.stringify(json));
	//	res_this.html(200,'<!DOCTYPE HTML><html lang="en-US"><head><meta charset="UTF-8" /></head><body>121212</body></html>');
	});
}