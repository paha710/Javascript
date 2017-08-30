
/****Simple test******/
function assert(value, desc) {
  var li = document.createElement("li");
  li.className = value ? "pass":"fali";
  li.appendChild( document.createTextNode(desc));
  document.getElementById("results").appendChild(li);
}
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
//
// (function () {
//   var qeue = [] ,
//       paused = false ,
//       results;
//
//   this.test = function (name, fn) {
//     qeue.push(function () {
//       results = document.getElementById("results");
//       results = assert(true, name).appendChild(
//         document.createElement("ul")
//       ); // Добавляет функцию в конец массива
//       fn();
//     });
//     runTest();
//   };
//
//   this.pause = function () {
//     paused = true;
//   };
//
//   this.resume = function () {
//     paused = false;
//     setTimeout(runTest, 1);
//   };
//
//   function runTest() {
//     if(!paused && qeue.length){
//       qeue.shift()(); // Удаляет последнюю функцию и пытается ее выполнить
//       if(!paused){
//         resume();
//       }
//     }
//   }
//
//   this.assert = function assert(value, desc) {
//     var li = document.createElement('li');
//     li.className = value ? "pass" : "fail";
//     li.appendChild(document.createTextNode(desc));
//     results.appendChild(li);
//     if(!value){
//       li.parentNode.parentNode.className = "fail";
//     }
//     return li;
//   }
// }) ();
//
// window.onload = function () {
//   test("Async Test #1", function () {
//     pause();
//     setTimeout(function () {
//       assert(true,"First test completed");
//       resume();
//     }, 1000)
//   });
//
//   test("Async test #2" , function () {
//     pause();
//     setTimeout(function () {
//       assert(true, "second test completed")
//     }, 1000);
//   });
//
// };

function isNimble() {
  return true;
}
assert(typeof window.isNimble === 'function', "isNimble() defined");
assert(isNimble.name === "isNimble", "isNimble() has a name");

var canFly = function () {
  return true;
};
assert(typeof window.canFly === 'function', "canFly() defined");
assert(canFly.name === "isNimble", "canFly() has a name");

window.isDeadly = function () {
  return true;
};
assert(typeof window.isDeadly === 'function', "isDeadly() defined");

function outer() {
  assert(typeof inner === 'function', "inner() in scope before declaration");
  function inner() {
    assert(typeof inner === 'function', "inner in scope after declaration");
    assert(window.inner === undefined, "inner() not in global scope");
  }

  inner();

}

outer();

/**********/

function forEach(list,callback) {
  for(var n = 0; n < list.length; n++){
    callback.call(list[n],n);
  }
}

var weapons = ['shuriken', 'katana','nunchucks'];

forEach(
  weapons,
  function (index) {
    assert(this === weapons[index], "Got expected value of" + weapons[index])
  }
);


/**********/

function chirp(n) {
  return n > 1 ? chirp(n-1) + "-chirp" : "-chirp";
}
console.log(chirp(2));
assert(chirp(3) === "chip-chirp", " Calling the name function comes naturally.");

/****Сохранение одинаковых функций в колекцию******/

var store = {
  nexId: 1,
  cache: {},
  add: function (fn) {
    if(!fn.id){ // если id нет
      fn.id = store.nexId++; // присваеваем его
      return !!(store.cache[fn.id] = fn); // записываем в память , возрващаем true
    }
  }
};

function ninja() {}
assert(store.add(ninja), "Функция была сохранена ");
assert(!store.add(ninja), "Можно добавить только разные функции");

/****Запоминание вычеслений******/

function isPrime(value) {
  if(!isPrime.answers) isPrime.answers = {};
  if(isPrime.answers[value] != null) {
    return isPrime.answers[value];
  }
  var prime = value != 1;

  for(var i = 2; i < value; i++) {
    if(value % i == 0) {
      prime = false;
      break;
    }
  }
   return isPrime.answers[value] = prime;
}

assert(isPrime(5), "5 простое число");
assert(isPrime.answers[5], 'Ответ был запомнен');

/**********/
var outerValue = 'ninja';
var later;

function outerFunction() {
  var innerValue = 'samurai';

  function innerFunction(paramValue) {
    assert(outerValue, "Inner can see the ninja");
    assert(innerValue, " Inner can see the samurai");
    assert(paramValue, " Inner can see the wakizaschi");
    assert(tooLate, " Inner can see the ronin");
  }
  later = innerFunction;
}

assert(!tooLate, "Outer can`t see the ronin");

var tooLate = 'ronin';

outerFunction();
later('wakizaschi');