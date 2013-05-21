var num = parseInt(process.argv[2], 10);

var start = parseInt(process.argv[3], 10);

console.log(start);
var async = require('async');
var Canvas = require('canvas')
  , canvas = new Canvas(5000,4000)
  , fs = require('fs')
  , ctx = canvas.getContext('2d');

  
  ctx.rotate(.1);
  
  var q = async.queue(function (task, callback) {
	  	ctx.font = '200px Impact';
	  	ctx.clearRect ( 0 , 0 , 5000 , 4000 );
	
	  	ctx.fillText("IMAGE: " + task.num, 1000, 1000);

	  	var out = fs.createWriteStream('/Users/saw/test_images/img_'+task.num+'.png');
	
	  	var stream = canvas.pngStream();

	  	stream.on('data', function(chunk){
	  	  out.write(chunk);
	  	});

	  	stream.on('end', function(){
	  	  console.log('saved png' + task.num);
		  callback();
	  	});
	  
     	 
  }, 2);
  
  q.drain = function() {
      console.log('all items have been processed');
  }
  
  
  
   
for (var i = start; i < start + num; i++) {
	q.push({num:i});
}




