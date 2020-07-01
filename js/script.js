const list = document.querySelectorAll('ul.student-list li');
const perPageMax = 10;

const searchList = (list) => {
    const pageDivHeader = document.querySelector('div.page-header');
    const div = document.createElement('div');
    div.classList.add('student-search');
    pageDivHeader.appendChild(div);
    const input = document.createElement('input');
    input.placeholder = 'Search for students...';
    const button = document.createElement('button');
    button.innerText = 'Search';
    div.append(input, button);

    
    const h3 = document.querySelectorAll('h3');
    pageDivHeader.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('.pagination').remove();
            let searchResults = [];
            for (let i = 0; i < list.length; i++) {
                list[i].style.display = 'none';
                if (h3[i].textContent.includes(input.value)) {
                    list[i].style.display = '';
                    searchResults.push(list[i]);
                }
            }
            showPage(searchResults, 1);
            appendPageLinks(searchResults);
        }
    });
}

const showPage = (list, page) => {
    const start = (page * perPageMax) - perPageMax;
    const end = page * perPageMax;

    for (let i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
        if (i >= start && i < end) {
            list[i].style.display = '';
        }
    }
}

const appendPageLinks = (list) => {
    const numberOfPages = list.length / perPageMax;
    const pageDiv = document.querySelector('div.page');
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    pageDiv.appendChild(pagination);
    const ul = document.createElement('ul');
    pagination.appendChild(ul);

    let pageNav = '';
    for (let i = 0; i < numberOfPages; i++) {
        if (i === 0) {
            pageNav += `<li><a href='#' class='active'>${i+1}</a></li>`
        } else {
            pageNav += `<li><a href='#'>${i+1}</a></li>`
        }
    }
    ul.innerHTML = pageNav;
    const anchor = document.querySelectorAll('ul li a');
    anchor[0].classList.add('active');

    pageDiv.addEventListener('click', (e) => {
        if (document.querySelector('input').value === '') {
            if (e.target.tagName === 'A') {
                for (let i = 0; i < anchor.length; i++) {
                    anchor[i].classList.remove('active');
                }
                e.target.classList.add('active');
                showPage(list, e.target.textContent);
            } 
        }

    });
}



searchList(list);
showPage(list, 1);
appendPageLinks(list);