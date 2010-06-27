function Scene(backgrounds, foregrounds) {
  function drawLayersGenerator(layers) {
    return function(position, canvas) {
      $.each(layers, function(i, layer) {
        var x = layer.position.x - (position.x * layer.parallaxRate);
        var y = layer.position.y -position.y * layer.parallaxRate;

        if(layer.repeat) {
          // X-Reapeat Tiling
          while(x < position.x + CANVAS_WIDTH) {
            layer.image.draw(canvas, x, y);
            x += layer.width;
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
