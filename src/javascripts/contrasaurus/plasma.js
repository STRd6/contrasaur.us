function Plasma(element) {
  var p1 = 0,
      p2 = 0,
      p3 = 0,
      p4 = 0,
      t1, t2, t3, t4,
      aSin = [],
      timeout = 1,
      canvas = element.getContext('2d'),
      canvasImageData = canvas.createImageData(element.width, element.height),
      index,
      as = 2.6, fd = 0.4, as1 = 4.4, fd1 = 2.2, ps = -4.4, ps2 = 3.3;


  function init() {
    var i = 512, rad;
    while (i--) {
      rad = (i * 0.703125) * 0.0174532;
      aSin[i] = Math.sin(rad) * 1024;
    }
  }

  function main() {
    init();
    draw();
  }

  function rand(va) {
    return Math.random(va);
  }

  document.onclick = function(){
    as = rand(300)*5;
    fd = rand(300)*10;
    as1 = rand(200)*50;
    fd2 = rand(300)*50;
    ps = (rand(200)*20)-10;
    ps2 = (rand(200)*40)-20;
  };

  function draw() {
    var i, j, x;

    var data = canvasImageData.data;

    t4 = p4;
    t3 = p3;

    i = 320; while(i--) {
      t1 = p1 + 5;
      t2 = p2 + 3;

      t3 &= 511;
      t4 &= 511;

      j = 240; while(j--) {
        t1 &= 511;
        t2 &= 511;

        x = aSin[t1] + aSin[t2] + aSin[t3] + aSin[t4];

        index = (i + j * element.width) * 4;

        data[index + 0] = x/as;
        data[index + 1] = x/fd;
        data[index + 2] = x/ps;
        data[index + 3] = 255;

        t1 += 5;
        t2 += 3;
      }

      t4 += as1;
      t3 += fd1;

    }

    canvasImageData.data = data;

    canvas.putImageData(canvasImageData, 0, 0);

    p1 += ps;
    p3 += ps2;



    setTimeout ( draw, timeout);
  }
  main();
}

function TimeTravel() {
  var c = $("<canvas />").get(0);
  var size = c.width = c.height = 50;
  var context = c.getContext("2d");
  context.globalCompositeOperation = "destination-in";
  var imageData = context.createImageData(size, size);
  var source = Point(size/2, size/2);
  var t = 0;
  var phases = 3;
  var phase = 0;
  var movement = 1;

  return {
    update: function() {
      var j = size; while(j--) {
        var i = size + phase; while((i-=phases) >= 0) {
          var index = (i + j * size) * 4;

          var dx = i - source.x;
          var dy = j - source.y;

          var d = Math.sqrt(dx*dx + dy*dy);

          var d2sine = Math.sin((d + t)/8);

          imageData.data[index + 0] = (d2sine * 255).clamp(0, 255);
          imageData.data[index + 1] = (125 + d2sine * 80).clamp(0, 255);
          imageData.data[index + 2] = (235 + d2sine * 20).clamp(0, 255);
          imageData.data[index + 3] = (255 * (1 - d/(size/2 - movement))).clamp(0, 255);
        }
      }

      context.putImageData(imageData, 0, 0);

      t -= 1;
      source.x = size/2 + movement*Math.cos(t/20);
      source.y = size/2 + movement*Math.sin(t/20);
      phase = (phase + 1) % phases;
    },

    draw: function(canvas, x, y) {
      canvas.drawImage(c, 0, 0, size, size, x, y, size, size);
    },

    frame: function(newFrame) {
      if(newFrame !== undefined) {
        return this;
      } else {
        return 0;
      }
    },

    frameCount: function() {
      return 1;
    },

    width: size,
    height: size
  };
}

