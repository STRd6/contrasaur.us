function Stateful(I) {
  I = I || {};

  $.reverseMerge(I, {
    currentState: null
  });

  return {
    currentModel: function() {
      if(I.currentState) {
        return I.currentState.model;
      } else {
        return undefined;
      }
    },

    draw: function(canvas) {
      var self = this;

      canvas.withTransform(self.getTransform(), function() {
        if (I.currentState.sprite()) {
          I.currentState.sprite().draw(canvas, -I.currentState.sprite().width/2, -I.currentState.sprite().height/2);
        } else {
          canvas.fillColor(I.color);
          canvas.fillRect(-I.width/2, -I.height/2, I.width, I.height);
        }
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
          I.currentState = state;
        }
      }
    },
    before: {
      update: function() {
        I.currentState.update();
      }
    }
  };
}
