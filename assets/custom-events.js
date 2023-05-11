

var main = function () {

    return {
        quizScroll: ()=> {
            document.querySelectorAll('a[href="#quiz-scroll"]').forEach(e=> {
                e.addEventListener('click', function() {
                    const targetElement = document.querySelector('[id*="__quiz"]');
                    targetElement?.scrollIntoView({
                        behavior: 'smooth'
                    });
                })
            })
        },
        bannerExclude: ()=> {
            const banners = document.querySelectorAll('[data-exclude]')

            if( banners.length == 0 ) return;

            fetch('https://ip2c.org/s')
            .then(response => response.text())
            .then(ip2c => {
              var country_code = ip2c.split(';')[1];

              banners.forEach(e=> {
                const isoCode = e.dataset.exclude.split(',');
                const parent = e.closest('slideshow-component');
                const counterLinks = parent.querySelectorAll('.slider-counter__link')

                let filteredChildren = Array.from(parent.querySelectorAll('.slideshow__slide'));
                let childIndex = filteredChildren.indexOf(e);

                if (isoCode.includes(country_code)) {
                    e.style.display = 'none';
                    counterLinks[childIndex] !== undefined ? counterLinks[childIndex].style.display = 'none' : null;
                }
              })

            })
            .catch(error => console.error(error));
        }
    };
}()

main.quizScroll()
main.bannerExclude()