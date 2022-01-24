import { helper } from '@ember/component/helper';

export default helper(function deleteComment(deleteComment) {
  const body = document.getElementsByClassName('main')[0];
  if (deleteComment) {
    body.classList.add('delete-comment');
  } else {
    body.classList.remove('delete-comment');
  }
});
