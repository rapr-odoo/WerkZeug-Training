function arrange(asc = true) {
  const tableRows = document.getElementById('mathTable').children[1].children;
  const arr = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children);
  if (asc) arr.sort((a,b) => a.children[0].innerHTML-b.children[0].innerHTML);
  else arr.sort((a,b) => b.children[0].innerHTML-a.children[0].innerHTML);
  for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
}