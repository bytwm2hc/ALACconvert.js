'use strict';
const btn = document.getElementById('btn');
const aCtx = new AudioContext();
var buffer;

btn.addEventListener('click', function () {
  'use strict';
  aCtx.resume();
});

// Download the file
fetch('example.caf').then(async function (response) {
  'use strict';
  if (!response.ok) {
    console.log('Download file failed!');
    return;
  }     

  // Convert ArrayBuffer to Uint8Array
  let ab = await response.arrayBuffer();
  let data = new Uint8Array(ab);

  // Save the file
  const filename = 'input.caf';
  let stream = FS.open(filename, 'w+');
  FS.write(stream, data, 0, data.length, 0);
  FS.close(stream);

  // Call WebAssembly/C++ to process the file (deocde ALAC)
  Module.ccall('ALACconvert', 'number', ['string', 'string'], ['input.caf', 'output.wav']);
  // Get the decoded WAVE file size
  let size2 = Module.ccall('GetFileSize', 'number', ['string'], ['output.wav']);
  // Read the file
  stream = FS.open('output.wav', 'r');
  data = new Uint8Array(size2);
  FS.read(stream, data, 0, size2, 0);
  FS.close(stream);

  // Create an AudioBufferSourceNode to play it
  buffer = await aCtx.decodeAudioData(data.buffer);
  let absn = new AudioBufferSourceNode(aCtx, {buffer: buffer});
  absn.connect(aCtx.destination);
  absn.start();
});
