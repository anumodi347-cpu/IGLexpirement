document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // --- Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Sticky Stats Scroll Magnification Interaction ---
    const statsSection = document.getElementById('investor-snapshot');
    const statCards = document.querySelectorAll('.stat-scroll-card');
    const currentIndicator = document.querySelector('.indicator-current');
    const indicatorBarFill = document.querySelector('.indicator-bar-fill');

    function updateStickyStats() {
        if (!statsSection || statCards.length === 0) return;

        const viewHeight = window.innerHeight;
        const centerY = viewHeight / 2;

        let activeIndex = 0;
        let minDistance = Infinity;

        statCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            // Card center Y relative to viewport
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(cardCenter - centerY);

            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = index;
            }
        });

        // Toggle active states for card scaling/magnifying
        statCards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update progress line and text counter (01 / 04, 02 / 04 etc)
        if (currentIndicator) {
            currentIndicator.textContent = `0${activeIndex + 1}`;
        }
        if (indicatorBarFill) {
            const fillPercent = ((activeIndex + 1) / statCards.length) * 100;
            indicatorBarFill.style.width = `${fillPercent}%`;
        }
    }

    window.addEventListener('scroll', updateStickyStats);
    window.addEventListener('resize', updateStickyStats);
    updateStickyStats(); // Initialize on load








    // --- Timeline Wheat Stalk Scroll Fall-off Interaction ---
    const timeline = document.querySelector('.timeline-wrapper');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const wheatGrains = document.querySelectorAll('.wheat-grain');

    function updateTimeline() {
        if (!timeline) return;
        
        const viewHeight = window.innerHeight;
        
        timelineItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            // When the timeline item crosses 60% of the viewport (scrolled past)
            if (itemRect.top < (viewHeight * 0.60)) {
                item.classList.add('active');
                
                // Animate corresponding wheat grains falling off
                const indexGrains = document.querySelectorAll(`.wheat-grain[data-index="${index}"]`);
                indexGrains.forEach(grain => {
                    if (!grain.classList.contains('fallen-left') && !grain.classList.contains('fallen-right')) {
                        if (grain.classList.contains('left-grain')) {
                            grain.classList.add('fallen-left');
                        } else {
                            grain.classList.add('fallen-right');
                        }
                    }
                });
            } else {
                item.classList.remove('active');
                
                // Put grains back if scrolled back up
                const indexGrains = document.querySelectorAll(`.wheat-grain[data-index="${index}"]`);
                indexGrains.forEach(grain => {
                    grain.classList.remove('fallen-left', 'fallen-right');
                });
            }
        });
    }

    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    updateTimeline(); // Initial run


    // --- Investor Modal Controls ---
    const modalOverlay = document.querySelector('.investor-modal-overlay');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const investorForm = document.getElementById('investorForm');
    const successMsg = document.querySelector('.modal-success-message');

    function openModal() {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
        // Reset form state after transition
        setTimeout(() => {
            investorForm.style.display = 'block';
            successMsg.style.display = 'none';
            investorForm.reset();
        }, 300);
    }

    openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close on clicking outside modal box
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Form Submission Handling
    investorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulating email/kit download dispatch
        investorForm.style.display = 'none';
        successMsg.style.display = 'block';
    });
});
