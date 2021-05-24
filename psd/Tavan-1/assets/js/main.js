function getParents(element, parents) {
  parents.push(element);
  if (element.parentElement) {
    return getParents(element.parentElement, parents)
  } else {
    return parents;
  }
}
$('[switch--class-toggle]').on('click', function () {
  $(`[data-element="${$(this).attr('data-element')}"]`).toggleClass($(this).attr('data-class'));
});
$('[switch--scroll-up]').on('click', function () {
  $('html, body').animate({ scrollTop: 0 });
});