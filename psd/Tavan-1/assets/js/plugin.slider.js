function Slider(configuration) {
  this.selector = configuration.selector;
  this.selectors = {
    slides: '.slides',
    slide: '.slide'
  }
  this.class = {
    in: 'status--in',
    out: 'status--out'
  };
}
Slider.prototype.timeOutFunction = function(callback) {
  return window.setTimeout(callback, 3000);
};
Slider.prototype.getNextIndex = function(index) {
  const plugin = this;
  return ++index < plugin.slides.length ? index : 0;
};
Slider.prototype.getPreviousIndex = function(index) {
  const plugin = this;
  return --index >= 0 ? index : (plugin.slides.length-1);
};
Slider.prototype.active = function(index, previousIndex) {
  const plugin = this;
  plugin.index = index;
  const slide = plugin.slides[index];
  window.clearTimeout(plugin.timeOut);
  plugin.slides.filter(slide => slide.classList.contains(plugin.class.out)).forEach(slide => {
    slide.classList.remove(plugin.class.out);
  });
  plugin.slides.filter(slide => slide.classList.contains(plugin.class.in)).forEach(slide => {
    slide.classList.remove(plugin.class.in);
    slide.classList.add(plugin.class.out);
  });
  slide.classList.add(plugin.class.in);
  Slider.prototype.timeOut = plugin.timeOutFunction(function() {
    plugin.active(plugin.getNextIndex(index));
  });
};
Slider.prototype.init = function() {
  const plugin = this;
  plugin.slides = [...plugin.selector.querySelector(plugin.selectors.slides).children];
  plugin.active(0);
  window.addEventListener('click', function(event) {
    if (getParents(event.target, []).filter(element => {return element.classList.contains('next');}).length) {
      plugin.active(plugin.getNextIndex(plugin.index));
    }
    if (getParents(event.target, []).filter(element => {return element.classList.contains('previous');}).length) {
      plugin.active(plugin.getPreviousIndex(plugin.index));
    }
  });
};