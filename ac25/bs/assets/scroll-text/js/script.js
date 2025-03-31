window.addEventListener("load", function () {
  var loopContainers = document.querySelectorAll(".loop-container");

  if (loopContainers.length > 0) {
    console.log("Found loop containers:", loopContainers.length);

    loopContainers.forEach(function (container) {
      var items = container.querySelectorAll(".item");
      if (items.length === 0) return;

      console.log("Found items in container:", items.length);

      items.forEach(function (item) {
        var speed = parseFloat(item.dataset.speed) || 0.05;
        var direction = parseInt(item.dataset.direction) || -1;
        var linewords = item.dataset.linewords;

        console.log("Item parameters:", { speed, direction, linewords });

        if (linewords) {
          item.textContent = linewords + " ";
        }
      });

      container.style.position = "relative";
      container.style.display = "inline-flex";
      container.style.whiteSpace = "nowrap";

      if (container.children.length > 1) {
        var firstDirection =
          parseInt(container.children[0].dataset.direction) || -1;
        container.children[1].style.position = "absolute";
        container.children[1].style.left = 100 * -firstDirection + "%";
      }

      var offset = 0;
      var velocity = 0;

      function animate() {
        var currentSpeed =
          parseFloat(container.children[0].dataset.speed) || 0.05;
        var currentDirection =
          parseInt(container.children[0].dataset.direction) || -1;

        velocity += currentSpeed;
        offset = 0.8 * offset + 0.2 * velocity;

        if (velocity > 100) {
          offset -= velocity;
          velocity = 0;
        }

        container.style.transform =
          "translateX(" + offset * currentDirection + "%)";

        window.requestAnimationFrame(animate);
      }

      window.addEventListener("scroll", function () {
        var currentSpeed =
          parseFloat(container.children[0].dataset.speed) || 0.05;
        velocity += 1.5 * currentSpeed;
      });

      animate();
    });
  } else {
    console.log("No loop containers found");
  }
});
