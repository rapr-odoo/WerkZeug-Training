import { User, Observable, Observer } from "./extra.js";

let flag = 0;

const h1 = document.getElementById('h1text');
const h2 = document.getElementById('h2text');
const h3 = document.getElementById('h3text')

const h1Observable = new Observable(h1);
const h2Observer = new Observer(h2);
const h3Observer = new Observer(h3);
h1Observable.subscribe(h2Observer);
h1Observable.subscribe(h3Observer);

const OnClickEvent = () => document.getElementById('h3text').dispatchEvent(new Event('hello-world'));
const cusOut = (ev) => {
  h1Observable.updateState("HoverOut");
  ev.target.style = "color: black";
};
const cusOver = (ev) => {
  h1Observable.updateState("Hover");
  ev.target.style = "color: red;";
};

const cusOverEvent = new Event('mouseover', {bubbles: true, cancelable: true});

const cusHelloEvent = new CustomEvent('hello-world', {'detail': "This is Custom Event"});
const OnOver = () => {
  flag = 0;
  document.getElementById('demo').innerHTML = "You are hovering button !!!";
}
const OnOut = () => {
  flag = 1;
  document.getElementById('demo').innerHTML = "You left !!!";
  setTimeout(function(){
    if (flag) document.getElementById('demo').innerHTML = "";
  },3000);
}

const updateUsersTableEvent = new CustomEvent('update_users_table');


h1.addEventListener('mouseover', cusOver);
h1.addEventListener('mouseout', cusOut);
h1.addEventListener('click', () => {
  alert('You clicked Custom Buton!!!');
});


h2.addEventListener('click', () => alert('You clicked Custom H2 Buton!!!'));
h2.dispatchEvent(cusOverEvent);


h3.addEventListener('hello-world', (event) => {event.target.innerHTML = "Hello World !!!!"});
h3.dispatchEvent(cusHelloEvent);

const clickme_but = document.getElementById('newBut');
clickme_but.addEventListener('click', OnClickEvent);
clickme_but.addEventListener('mouseover', OnOver);
clickme_but.addEventListener('mouseout' , OnOut);

document.getElementById('user_button').addEventListener('click', (event) => {
  const user_val = document.getElementById('newuser')
  const user = new User(user_val.value);
  user_val.value = '';

  event.target.dispatchEvent(updateUsersTableEvent);
});

document.getElementById('user_button').addEventListener('update_users_table', () => {
  const users_data = User.users;
  if (users_data.length == 1) {
    const div = document.createElement('div');
    div.className = 'container';
    const table = document.createElement('table');
    table.id = 'users_table';
    table.style = 'padding-top: 2%;'
    table.className = 'table table-striped table-hover';
    table.innerHTML = `<thead class="thead-dark">
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email Id</th>
      <th>UserName</th>
    </thead>
    <tbody>
      <tr>
        <td>${users_data[0].fname}</td>
        <td>${users_data[0].lname}</td>
        <td>${users_data[0].email}</td>
        <td>${users_data[0].login}</td>
      </tr>
    </tbody>`
    div.appendChild(table);
    document.body.appendChild(div);
  }else if (users_data.length > 1) {
    const table_body = document.getElementById('users_table').children[1];
    const tr = document.createElement('tr');
    const ind = users_data.length - 1 ;
    tr.innerHTML = `<td>${users_data[ind].fname}</td>
    <td>${users_data[ind].lname}</td>
    <td>${users_data[ind].email}</td>
    <td>${users_data[ind].login}</td>`;
    table_body.appendChild(tr);
  }
});