function assert(value, desc) {
  var li = document.createElement("li");
  li.className = value ? "pass":"fali";
  li.appendChild( document.createTextNode(desc));
  document.getElementById("results").appendChild(li);
}

  window.onload = function () {
    assert( true, "The test suite is running.");
    assert( false, "Fail!");
  };
