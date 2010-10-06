function Stateful(I) {
  I = I || {};

  $.reverseMerge(I, {
    currentState: null
  });

  return {
    currentModel: function() {
      if(I.currentState) {
        return I.currentState.model();
      } else {
        return undefined;
      }
    },

    draw: function(canvas) {
      var self = this;

      canvas.withTransform(self.getTransform(), function() {
        I.currentState.draw(canvas);
      });

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    getCircles: function() {
      var self = this;

      var componentCircles = $.map(self.components(), function(component) {
        var transform = component.getTransform();
        return $.map(component.getCircles(), function(circle) {
          var point = transform.transformPoint(component.position());
          return {
            radius: circle.radius,
            x: point.x,
            y: point.y,
            component: component
          };
        });
      });

      var objectCircles;

      if(I.currentState.hitCircles()) {
        objectCircles = I.currentState.hitCircles();
      } else {
        objectCircles = [{
          radius: I.radius,
          x: 0,
          y: 0,
          component: self
        }];
      }

      var circles = componentCircles.concat(objectCircles);

      var transform = self.getTransform();
      return $.map(circles, function(circle) {
        var point = transform.transformPoint(circle);
        return {
          x: point.x,
          y: point.y,
          radius: circle.radius,
          component: circle.component || self
        };
      });
    },
    transition: function(state) {
      if (I.currentState.allowedTransitions) {
        if (I.currentState.allowedTransitions.indexOf(state) > 0) {
          // TODO: Handle resetting inside the state class with more robust transitions
          I.currentState.reset();

          I.currentState = state;
          
          // TODO: Handle resetting inside the state class with more robust transitions
          I.currentState.reset();
        }
      }
    },
    before: {
      update: function(levelPosition) {
        I.currentState.update(levelPosition);
      }
    }
  };
}
