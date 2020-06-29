/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const list = document.querySelectorAll('ul.student-list li');
const pageDiv = document.querySelector('div.page');

/*
showPage(list, page) uses the page passed in to find the min and max to set the 
display of the individual people to only show if it is within those values.
*/
const showPage = (list, page) => {
   let min = page * 10 - 10;
   let max = page * 10;
   for (let i = 0; i < list.length; i++) {
      if (i >= min && i < max) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/*
appendPageLinks(list) gets the total list items and uses that to dynamically create
the pagination links. It then uses and event listener to send showPage the correct "page"
to show. 
*/
const appendPageLinks = (list) => {
   let numOfPages = list.length / 10;

   let pagination = document.createElement('div');
   pagination.className = 'pagination';
   pageDiv.appendChild(pagination);

   let pageList = document.createElement('ul');
   pagination.appendChild(pageList);

   let x = '';
   for (let i = 0; i < numOfPages; i++) {
      x += `<li><a href="#">${i+1}</a></li>`;
   }
   
   pageList.innerHTML = x;
   showPage(list, 1);

   pageDiv.addEventListener('click', (e) => {
      if (e.target.tagName == 'A') {
         showPage(list, e.target.innerText);
      }
   });
}

appendPageLinks(list);
