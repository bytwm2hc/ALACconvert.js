# ALACconvert.js
The goal of this project is to make the (most) browsers **didn't** support native```.caf```(Core Audio Format) container and the```ALAC```(Apple Lossless Audio Codec) decoding yet be able to play it!
## Quick Start
**ALACconvert.js** is forked from (based on) macOS forge's open source and patched the CVE vulnerability. It uses```Emscripten```to become WebAssembly version that you would simply load it by:
```html
<script src="ALACconvert.js"></script>
```
in your```.html```or anywhere your website would use.

Then, you would call the WebAssembly/C/C++ function```ALACconvert()``` to process the input```.caf```file.
```javascript
Module.ccall('ALACconvert', 'number', ['string', 'string'], ['input.caf', 'output.wav']);
```
After, you would get the result by:
```javascript
// Get the decoded WAVE file size
let size2 = Module.ccall('GetFileSize', 'number', ['string'], ['output.wav']);
// Read the file
let stream = FS.open('output.wav', 'r');
let data = new Uint8Array(size2);
FS.read(stream, data, 0, size2, 0);
FS.close(stream);
```
## See a demo
[Click Here](https://bytwm2hc.github.io/ALACconvert.js/demo/)
## Build / Download
It can be compiled with```emcc```and I made a file for the build command at```convert-utility/emcc-compile-command.txt```.

Otherwise, you can download the pre-built```ALACconvert.js```and```ALACconvert.wasm```from releases.
