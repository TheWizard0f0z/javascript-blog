'use strict';

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const keys = { max: 0, min: 999999 };

  const params = keys;

  for (let tag in tags) {
    /*console.log(tag + ' is used ' + tags[tag] + ' times');*/
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
  }

  for (let tag in tags) {
    /*console.log(tag + ' is used ' + tags[tag] + ' times');*/
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!Object.prototype.hasOwnProperty.call(allTags, tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    /* END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
  }

  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in alltags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li> ';

    allTagsHTML += tagLinkHTML;
  }

  /* [NEW] END LOOP: for each tag in alltags: */

  /* [NEW] add html from alltagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* [DONE] add class active */
    tagLink.classList.add('active');
  }

  /* END LOOP: for each found tag link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('.post-tags a');

  /* [DONE] START LOOP: for each link */
  for (let link of links) {
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every author: */
  for (let article of articles) {
    /* [DONE] find authors wrapper */
    const authorsList = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)) {
      /* [NEW] add generated code to allAuthors array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;

    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorsList.innerHTML = html;
  }

  /* END LOOP: for every author: */

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.authors');

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';
  }
  /* [NEW] END LOOP: for each author in allAuthors: */

  /* [NEW] add html from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */
  const links = document.querySelectorAll('.post-author a');

  /* [DONE] START LOOP: for each link */
  for (let link of links) {
    /* [DONE] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
