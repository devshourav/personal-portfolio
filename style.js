// Wait for page to load
window.addEventListener('load', function () {
    // Hide loader after page is fully loaded
    setTimeout(function () {
        document.querySelector('.loader-wrapper').style.opacity = '0';
        setTimeout(function () {
            document.querySelector('.loader-wrapper').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Initialize Scroll Animation
    const scrollElements = document.querySelectorAll('.about-img, .about-text, .contact-info, .contact-form');
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            }
        });

        serviceCards.forEach((card, index) => {
            if (elementInView(card, 80)) {
                setTimeout(() => {
                    displayScrollElement(card);
                }, parseFloat(card.dataset.delay || 0) * 1000);
            }
        });

        portfolioItems.forEach((item, index) => {
            if (elementInView(item, 80)) {
                setTimeout(() => {
                    displayScrollElement(item);
                }, parseFloat(item.dataset.delay || 0) * 1000);
            }
        });

        // Animate skill bars when in view
        const skillBars = document.querySelectorAll('.progress');
        skillBars.forEach((bar) => {
            const parentElement = bar.parentElement.parentElement;
            if (elementInView(parentElement, 80)) {
                const width = bar.dataset.width;
                bar.style.width = width + '%';
            }
        });
    };

    // Animate elements that are initially in view
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Trigger once on page load
    handleScrollAnimation();

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            const items = portfolioGrid.querySelectorAll('.portfolio-item');

            items.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // Testimonial Slider
    const slides = document.querySelector('.testimonial-slides');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function goToSlide(slideIndex) {
        slides.style.transform = `translateX(-${slideIndex * 100}%)`;

        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');

        currentSlide = slideIndex;
    }

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        goToSlide(currentSlide);
    }, 5000);

    // Page Navigation with Transition
    const navItems = document.querySelectorAll('.nav-links a');
    const transition = document.querySelector('.page-transition');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Only apply to internal links
            if (this.getAttribute('href').includes('.html')) {
                e.preventDefault();
                const targetPage = this.getAttribute('href');

                // Show transition
                transition.classList.add('active');

                // Navigate to the page after transition
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 500);
            }
        });
    });

    // Form Submission with AJAX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch('process_form.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Message sent successfully!');
                        contactForm.reset();
                    } else {
                        alert('Error sending message. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
        });
    }
});

// document.querySelectorAll('.portfolio-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//         const projectId = btn.getAttribute('data-project');
//         window.location.href = `gallery.html?project=${projectId}`;
//     });
// });