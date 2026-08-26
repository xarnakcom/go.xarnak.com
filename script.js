    window.addEventListener('load', function () {
      var preloader = document.getElementById('preloader');
      setTimeout(function () {
        preloader.classList.add('hide');
        document.body.classList.remove('preload-active');
        setTimeout(function () {
          preloader.remove();
        }, 300);
      }, 2000);
    });
