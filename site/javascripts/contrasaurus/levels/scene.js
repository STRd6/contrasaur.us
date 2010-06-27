function Scene(backgrounds, foregrounds) {
  function drawLayersGenerator(layers) {
    return function(position, canvas) {
      $.each(layers, function(i, layer) {
        var xPosition = layer.position.x + -position.x * layer.parallaxRate;
        var yPosition = layer.position.y + -position.y * layer.parallaxRate;

        if(layer.repeat) {
          xPosition = Math.mod(xPosition, CANVAS_WIDTH);
          yPosition = Math.mod(yPosition, CANVAS_HEIGHT);

          xPosition = xPosition - layer.width;

          while(xPosition < CANVAS_WIDTH) {
            layer.image.draw(canvas,
              xPosition,
              yPosition
            );

            xPosition += layer.width;
          }

        } else {
          layer.image.draw(canvas,
            xPosition,
            yPosition
          );
        }

        // TODO: Move to update
        if(layer.rate) {
          layer.position.x += layer.rate.x;
        }
      });
    }
  }

  return {
    drawBackgrounds: drawLayersGenerator(backgrounds),
    drawForegrounds: drawLayersGenerator(foregrounds)
  };
}
