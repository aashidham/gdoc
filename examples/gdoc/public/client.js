//jQuery functions in the client collected here
$(function() {
	var editor = ace.edit("editor");
	var socket = io();

	//if the server sends a 'text' event, restore the screen, but preserver old cursor position
	socket.on('text', function(msg){
		var oldPos = editor.getCursorPosition();
		editor.getSession().setValue(msg);
		editor.moveCursorTo(oldPos.row,oldPos.column)
	});

	//in the first connection, ask to be populated with the text from prior state
	socket.on('connect',function(msg){
		socket.emit('init');
	});

	/*editor.getSession().on('change', function (event) {
		var text = editor.getSession().getValue();
		socket.emit('text', text);
	});*/
	
	//when the state is changed through a key operation, refresh the state of all your peers
	$(".editor").keyup(function (event) {
			var text = editor.getSession().getValue();
			socket.emit('text', text);
	});

});
