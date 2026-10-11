/* ============================================
   定瓷有声 - 公共交互脚本
   ============================================ */

(function() {
    'use strict';

    // ---------- 导航栏滚动效果 ----------
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ---------- 移动端菜单 ----------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // 点击导航链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ---------- 滚动淡入动画 ----------
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // ---------- 平滑滚动到锚点 ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- 音频播放交互（数字页面） ----------
    const audioItems = document.querySelectorAll('.audio-item');
    audioItems.forEach(item => {
        const playBtn = item.querySelector('.audio-play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                // 切换播放状态图标
                const isPlaying = this.dataset.playing === 'true';
                audioItems.forEach(other => {
                    const otherBtn = other.querySelector('.audio-play-btn');
                    if (otherBtn) {
                        otherBtn.dataset.playing = 'false';
                        otherBtn.innerHTML = '▶';
                    }
                });
                if (!isPlaying) {
                    this.dataset.playing = 'true';
                    this.innerHTML = '❚❚';
                }
            });
        }
    });

    // ---------- 商城筛选按钮 ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ---------- 加入购物车按钮反馈 ----------
    const addCartBtns = document.querySelectorAll('.add-cart-btn');
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const originalText = this.textContent;
            this.textContent = '已加入 ✓';
            this.style.background = 'var(--tea-brown)';
            this.style.color = 'var(--rice-white)';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 1500);
        });
    });

    // ---------- 初始化 ----------
    function init() {
        handleNavbarScroll();
        window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
