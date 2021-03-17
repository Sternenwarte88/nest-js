const postApp = () => {
  const appValue = document.querySelector('select');
  switch (appValue.value) {
    case 'Money Helper':
      window.location.href = 'http://www.money-helper.coding-experience.de';
      break;
    case 'mh':
      window.location.href = '#';
      break;

    default:
      break;
  }
};

const headBtnHandler = event => {
  const headBtnId = event.target.id;

  switch (headBtnId) {
    case 'blog':
      window.location.href = 'http://www.blog.coding-experience.de';
      break;
    case 'main-page':
      window.location.href = 'http://www.coding-experience.de';
      break;
    case 'mh':
      window.location.href = '#';
      break;
    default:
      break;
  }
};

const menuShow = () => {
  const menuModal = document.querySelector('.menu_link');
  menuModal.classList.toggle('flex');
};

const menuHide = () => {
  const menuLink = document.querySelector('.menu_link');
  menuLink.classList.remove('flex');
};
