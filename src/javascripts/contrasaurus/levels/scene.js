function Scene(backgrounds, foregrounds) {
  function drawLayersGenerator(layers) {
    return function(position, canvas) {
      $.each(layers, function(i, layer) {
        var x = layer.position.x - (position.x * layer.parallaxRate);
        var y = layer.position.y -position.y * layer.parallaxRate;

        var imgWidth = layer.image.width;
        var x1 = Math.mod(-x, imgWidth);
        var x2 = Math.mod(-x + CANVAS_WIDTH, imgWidth);

        if(layer.repeat) {
          if(x2 < x1) {
            layer.image.draw(canvas, 0, y, x1, 0, CANVAS_WIDTH - x2);
            layer.image.draw(canvas, CANVAS_WIDTH - x2, y, 0, 0, x2);
          } else {
            layer.image.draw(canvas, 0, y, x1, 0, CANVAS_WIDTH);
          }
        } else if(layer.every) {
          x1 = Math.mod(x, layer.every);
          x2 = Math.mod(x + imgWidth, layer.every);

          if(x1 < CANVAS_WIDTH) {
            layer.image.draw(canvas, x1, y);
          }

          // TODO: This is grody.
          if(x2 < x1) {
            var r = Math.mod(-x2, imgWidth);
            layer.image.draw(canvas, 0, y, r, 0, imgWidth - r);
          }
        } else {
          x = layer.position.x;
          y = layer.position.y;

          layer.image.draw(canvas, x, y);
        }
      });
    }
  }

  function updateIterator(i, layer) {
    if(layer.velocity) {
      layer.position.x += layer.velocity.x;
      layer.position.y += layer.velocity.y;
    }
  }

  return {
    drawBackgrounds: drawLayersGenerator(backgrounds),
    drawForegrounds: drawLayersGenerator(foregrounds),
    update: function() {
      $.each(backgrounds, updateIterator);
      $.each(foregrounds, updateIterator);
    }
  };
}
