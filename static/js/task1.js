import { RemoteCall, User } from "./extra.js";
import { createRows, resetDOM, search, arrange } from "./domOperations.js";

const loadPromise = () => {
  return new Promise((resolve) => {document.onreadystatechange = () => {
    if (document.readyState == 'complete') {resolve('done');}
  }});
};


function createUser(name) {
  this.create(name);
};

const userPrototype = {
  isAdmin: false,
  group: 'base'
};

// Can only be used after the DOM has been laoded
// So need to call the script file at the end of the codee
// h1 = document.getElementById('h1text');
// h1.addEventListener('mouseover', cusOver);
// h1.addEventListener('mouseout', cusOut);

(async function() {
  let res = await loadPromise();
  console.log(res, 'Done');




  // const click_events = [arrange, arrange, search, resetDOM]
  // click_elements.forEach((el, index) => {
  //   el.addEventListener('click', click_events[index]());
  // })


  const click_elements = Array.from(document.getElementsByClassName('clicks'));
  click_elements[0].addEventListener('click', arrange);
  click_elements[0].asc = true;
  click_elements[1].addEventListener('click', arrange);
  click_elements[1].asc = false;
  click_elements[2].addEventListener('click', search);
  click_elements[3].addEventListener('click', resetDOM);



  // Adding Some Map, Sort, Filter Functionalities
  // Get the Math Table Elemets
  const tableBody = document.getElementById('mathTable').children[1];
  const tableRows = tableBody.children;
  Array.from(tableRows).forEach((tr, index, arr) => {
    const rand = Math.ceil(Math.random() * 100);
    arr[index].children[0].innerHTML = rand;
    arr[index].children[1].innerHTML = Math.sqrt(rand).toFixed(3);
  });
  let count = 9;
  while(count--) {
    const rand = Math.ceil(Math.random() * 100);
    createRows(tableBody, rand, Math.sqrt(rand).toFixed(3));
  }

  // Changing Default Prototype for createUser
  // createUser.prototype = userPrototype;
  // createUser.prototype.constructor = createUser;
  // document.getElementById('user_button').addEventListener('click', () => {
  //   users.push(new createUser(document.getElementById('newuser').cloneNode(true).value));
  //   document.getElementById('newuser').value = '';
  //   users[0].greet();
  // })



  const req = new RemoteCall({type: 'GET', url: 'https://reqres.in/api/products/3'});
  console.log("Hello Waiting...");
  const xmlHttp_response = await req.call;
  console.log(xmlHttp_response);

  //xmlHttp.onload = () => {console.log('Done Waiting...',xmlHttp.responseText);}

})();


const wait = (time) => new Promise(
  function (resolve, reject) {
    return setTimeout(() => resolve(), time);
  }
);

wait(200)
  // onFulfilled() can return a new promise, `x`
  .then(() => new Promise((resolve, reject) => {return resolve('foo')}))
  // the next promise will assume the state of `x`
  .then(a => a)
  // Above we returned the unwrapped value of `x`
  // so `.then()` above returns a fulfilled promise
  // with that value:
  .then(b => console.log(b)) // 'foo'
  // Note that `null` is a valid promise value:
  .then(() => null)
  .then(c => console.log(c)) // null
  // The following error is not reported yet:
  .then(() => {throw new Error('foo');})
  // Instead, the returned promise is rejected
  // with the error as the reason:
  .then(
    // Nothing is logged here due to the error above:
    d => console.log(`d: ${ d }`),
    // Now we handle the error (rejection reason)
    e => console.log(e)) // [Error: foo]
  // With the previous exception handled, we can continue:
  .then(f => console.log(`f: ${ f }`)) // f: undefined
  // The following doesn't log. e was already handled,
  // so this handler doesn't get called:
  .catch(e => console.log(e))
  .then(() => { throw new Error('bar'); })
  // When a promise is rejected, success handlers get skipped.
  // Nothing logs here because of the 'bar' exception:
  .then(g => console.log(`g: ${ g }`))
  .catch(h => console.log(h)) // [Error: bar]
;