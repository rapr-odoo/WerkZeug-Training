export function createRows(tableBody, num=null, root=null) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.append(num)
  td2.append(root)
  tr.append(td1,td2);
  //tableBody.append(tr);
  tableBody.appendChild(tr);
}

export function resetDOM() {
  const arr = Array.from(document.getElementById('mathTable').children[1].children);
  arr.forEach((tr) => {tr.style.display="";})
}

export const arrange = (event) => {
  const tableRows = document.getElementById('mathTable').children[1].children;
  const arr = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children);
  if (event.currentTarget.asc) arr.sort((a,b) => a.children[0].innerHTML-b.children[0].innerHTML);
  else arr.sort((a,b) => b.children[0].innerHTML-a.children[0].innerHTML);
  for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
}


export const search = () => {
  const search_col = document.getElementById('search_column').value;
  const search_op = document.getElementById('search_operator').value;
  let el = document.getElementById('search_value');
  const search_value = el.cloneNode(true).value;
  el.value = '';

  const tableRows = document.getElementById('mathTable').children[1].children;
  var arr = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children);
  let col_num = 0;
  var flag = false;
  if (search_col == 'number') col_num = 0;
  else col_num = 1;

  switch (search_op) {
    case '=': arr = arr.filter((tr) => tr.children[col_num].innerHTML == search_value);
              break;

    case '!=': arr = arr.filter((tr) => tr.children[col_num].innerHTML != search_value);
              break;

    case '<=': arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) <= parseInt(search_value));
              break;

    case '>=': arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) >= parseInt(search_value));
              break;

    case '<':  arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) < parseInt(search_value));
      break;

    case '>':  arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) > parseInt(search_value));
      break;

    default:flag = true;
      break;
  }


  if (flag) alert('Please Enter Valid Query!!!');
  else changeDOM(tableRows, arr);
}


function changeDOM(tableRows, arr) {
  var i = 0;
  for (let tr of tableRows) {
    try{
      if (tr.rowIndex == arr[i].rowIndex) {
        tr.style.display = '';
        i++;
      }
      else tr.style.display = "none";
    }catch (e) {
      tr.style.display = "none";
    }
  }
}