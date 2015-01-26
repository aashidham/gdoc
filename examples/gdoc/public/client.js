$(function() {
	var editor = ace.edit("editor");
	var socket = io();
	socket.on('text', function(msg){
		var oldPos = editor.getCursorPosition();
		editor.getSession().setValue(msg);
		editor.moveCursorTo(oldPos.row,oldPos.column)
	});

	socket.on('connect',function(msg){
		socket.emit('init');
	});

	/*editor.getSession().on('change', function (event) {
		var text = editor.getSession().getValue();
		socket.emit('text', text);
	});*/
	
	$(".editor").keyup(function (event) {
			var text = editor.getSession().getValue();
			socket.emit('text', text);
	});

});
