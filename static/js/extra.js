export class RemoteCall {
  constructor(ob){
    this.call_type = ob.type;
    this.url = ob.url
    this.result = null;
  }

  get call() {
    return new Promise((resolve) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open(this.call_type, this.url, true);
      xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          resolve(xhttp.responseText);
        }
      }
      xhttp.send();
    });
  }
}

export class User {
  static #users_list = []

  constructor(name) {
    let arr = name.split(' ');
    this.firstName = arr[0];
    this.lastName = arr[1];
    this.email = arr[0].toString() + '@odoo.com';
    this.login = arr[0];
    this.password = this.login;
    this.isAdmin = false;
    this.group = 'base';
    this.notify();
    this.val = 10;
    User.#users_list.push(this)
  }

   static get users() {
    const users_list = User.#users_list.map((user) => {
      const ob = {
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        login: user.login
      }
      return ob;
    })
    return users_list;
  }

  notify() {
    alert(`Success:: User "${this.login}" created with Password "${this.password}"`);
  }

  // call the method: UserOb.greet()
  greet() {
    console.log("Hello", this.firstName);
  }

  // call the method: UserOb.area
  get area() {
    return this.val * this.val;
  }

  //call the method : UserOb.hello
  get ['hello']() {
    return "name";
  }
};