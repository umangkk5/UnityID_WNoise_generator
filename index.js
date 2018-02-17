fetch('https://www.random.org/integers/?num=10000&min=0&max=1&col=1&base=10&format=plain&rnd=new')
  .then((res) => res.text())
  .then(res => res.toString())
  .then(res => {
    res = res.split('\n');
    var buffer_length = 4096;
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var audio = new AudioContext();
	var wnoise = audio.createScriptProcessor(buffer_length, 1, 1);
	wnoise.onaudioprocess = function(e) {
		var output = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < buffer_length; i++) {
			output[i] = res[i] * 2 - 1;
		}
	}
	wnoise.connect(audio.destination);
	setTimeout(function(){ wnoise.disconnect(); }, 3000);
  })
  .catch(console.log)