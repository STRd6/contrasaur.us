var Sound = (function($) {
  // TODO: detecting audio with canPlay is f***ed
  // Hopefully get more robust later
  // audio.canPlayType("audio/ogg") === "maybe" WTF?
  // http://ajaxian.com/archives/the-doctor-subscribes-html-5-audio-cross-browser-support
  var format = $.browser.webkit ? ".mp3" : ".wav";
  var sounds = {};

  function loadSoundChannel(name) {
    var sound = $('<audio />').appendTo('#game_container').get(0);
    sound.src = "sounds/" + name + format;

    return sound;
  }
  
  function Sound(name, maxChannels) {
    return {
      play: function() {
        Sound.play(name, maxChannels);
      },

      stop: function() {
        Sound.stop(name);
      }
    }
  }

  return $.extend(Sound, {
    play: function(name, maxChannels) {
      // TODO: Too many channels crash Chrome!!!1
      maxChannels = maxChannels || 2;

      if(!sounds[name]) {
        sounds[name] = [loadSoundChannel(name)];
      }

      var freeChannels = $.grep(sounds[name], function(sound) {
        return sound.currentTime == sound.duration || sound.currentTime == 0
      });

      if(freeChannels[0]) {
        freeChannels[0].play();
      } else {
        if(!maxChannels || sounds[name].length < maxChannels) {
          var sound = loadSoundChannel(name);
          sounds[name].push(sound);
          sound.play();
        }
      }
    },

    stop: function(name) {
      if(sounds[name]) {
        sounds[name].stop();
      }
    }
  });
}(jQuery));
