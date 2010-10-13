var Sound = (function($) {
  // TODO: detecting audio with canPlay is f***ed
  // Hopefully get more robust later
  // audio.canPlayType("audio/ogg") === "maybe" WTF?
  // http://ajaxian.com/archives/the-doctor-subscribes-html-5-audio-cross-browser-support
  var format = $.browser.webkit ? ".mp3" : ".wav";

  var soundChannels = [];
  var maxChannels = 4;

  maxChannels.times(function() {
    soundChannels.push(new Audio());
  });

  function nameToFile(name) {
    return "sounds/" + name + format;
  }

  var availableToPlay = function(sound) {
    return sound.currentTime == sound.duration || sound.currentTime == 0;
  };

  function Sound(name, maxChannels) {
    return {
      play: function() {
        Sound.play(name, maxChannels);
      }
    }
  }

  return $.extend(Sound, {
    play: function(name, maxChannels) {
      maxChannels = maxChannels || 2;

      var file = nameToFile(name);

      var splitChannels = soundChannels.partition(function(channel) {
        return channel.src.indexOf(file) != -1;
      });

      var sameSounds = splitChannels[0];

      var freeChannels = sameSounds.select(availableToPlay);

      // Don't play if sound is already playing on max # of channels
      if(sameSounds.length - freeChannels.length >= maxChannels) {
        return;
      }

      if(freeChannels[0]) {
        // Recycle an existing channel that has finished.
        freeChannels[0].play();
        return;
      }
      
      if(sameSounds.length >= maxChannels) {
        // This sound is playing on it's maximum channels allowed.
        return;
      }

      var otherSounds = splitChannels[1];

      freeChannels = otherSounds.select(availableToPlay);

      if(freeChannels[0]) {
        // Provision an available channel
        freeChannels[0].src = file;
        freeChannels[0].load();
        freeChannels[0].play();
      }
    }
  });
}(jQuery));
