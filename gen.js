var num = parseInt(process.argv[2], 10);

var start = parseInt(process.argv[3], 10);

console.log(start);
var async = require('async');
var Canvas = require('canvas')
  , canvas = new Canvas(5000,4000)
  , fs = require('fs')
  , ctx = canvas.getContext('2d');

 
  ctx.fillStyle = "white";
  
  var q = async.queue(function (task, callback) {
	  	ctx.font = '700px Impact';
	  	ctx.clearRect ( 0 , 0 , 5000 , 4000 );
			ctx.fillStyle = "white";
		ctx.fillRect( 0 , 0 , 5000 , 4000 );
		 ctx.fillStyle = "black";
	  	ctx.fillText("IMAGE: " + task.num, 100, 1500);

	  	var out = fs.createWriteStream('test_images/test.jpg');
	
	  	var stream = canvas.createJPEGStream({quality : 40});

	  	// stream.on('data', function(chunk){
// 	  	  out.write(chunk);
// 	  	});
		stream.pipe(out);

	  	stream.on('end', function(){
	  	  console.log('saved jpg' + task.num);
		  callback();
	  	});
	  
     	 
  }, 2);
  
  q.drain = function() {
      console.log('all items have been processed');
  }
  
  
  
   
for (var i = start; i < start + num; i++) {
	q.push({num:i});
}




