
# Common Audio

Common methods using the Web Audio API


## Install

Using Bower:
```
bower install common.audio
```


## Usage

Initiate the CommonAudio class and load the audio files, as such:

```
var audio = new CommonAudio();

// pre-load files
// Method #1
audio.load({ 'key': '/path/to/file.mp3' }); // set a specific key for a file

//Method #2
audio.load('/path/to/file.mp3'); // auto-set the key from the filename ( no extension )

//Method #3
audio.load('/path/to/file.mp3'); // an extension of the above, adding multiple files at once

// play a file
audio.play('key');

```


## Options

...


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)
