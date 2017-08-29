
/****Simple test******/
// function assert(value, desc) {
//   var li = document.createElement("li");
//   li.className = value ? "pass":"fali";
//   li.appendChild( document.createTextNode(desc));
//   document.getElementById("results").appendChild(li);
// }
//
//   window.onload = function () {
//     assert( true, "The test suite is running.");
//     assert( false, "Fail!");
//   };
//
/******Group test****/
//
// (function () {
//   var results;
//   this.assert = function assert(value, desc) {
//     var li = document.createElement("li");
//     li.className = value ? "pass":"fail";
//     li.appendChild( document.createTextNode(desc));
//     results.appendChild(li);
//     if(!value) {
//       li.parentNode.parentNode.className = "fail";
//     }
//     return li;
//   };
//
//   this.test = function test(name,fn) {
//     results = document.getElementById("results");
//     results = assert(true, name).appendChild(
//       document.createElement("ul")
//     );
//     fn();
//   };
//
// }) () ;
//
// window.onload = function () {
//      test(" A test.", function () {
//      assert(true,"First assertion completed");
//      assert(true,"Second assertion completed");
//      assert(true,"Third assertion completed");
//    });
//
//   test("Another test.", function () {
//     assert(true, "First test completed");
//     assert(true, "Second test completed");
//     assert(true, "Third test completed");
//   });
//
//   test("A third test." , function () {
//     assert(null, 'fail');
//     assert(5, 'pass');
//   });
//
// };

/****Asinc tests******/

(function () {
  var qeue = [] ,
      paused = false ,
      results;

  this.test = function (name, fn) {
    qeue.push(function () {
      results = document.getElementById("results");
      results = assert(true, name).appendChild(
        document.createElement("ul")
      );
      fn();
    });

    runTest();
  };

  this.pause = function () {
    paused = true;
  };

  this.resume = function () {
    paused = false;
    setTimeout(runTest, 1);
  };

  function runTest() {
    if(!paused && qeue.length){
      qeue.shift()();
      if(!paused){
        resume();
      }
    }
  }

  this.assert = function assert(value, desc) {
    var li = document.createElement('li');
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);
    if(!value){
      li.parentNode.parentNode.className = "fail";
    }
    return li;
  }
}) ();

window.onload = function () {
  test("Async Test #1", function () {
    pause();
    setTimeout(function () {
      assert(true,"First test completed");
      resume();
    }, 1000)
  });

  test("Async test #2" , function () {
    pause();
    setTimeout(function () {
      assert(true, "second test completed")
    }, 1000);
  });

};