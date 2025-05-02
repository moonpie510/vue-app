export default {
    name: 'intersection',

    mounted(el, binding) {
        const options = {
      rootMargin: '0px 0px 75px 0px',
      threshold: 0,
    }

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
          binding.value();
      }
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(el);
    }
}