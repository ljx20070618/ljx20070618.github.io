// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 导航栏汉堡菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinkst = document.querySelector('.nav-links');
    
    if (menuToggle && navLinkst) {
        menuToggle.addEventListener('click', function() {
            navLinkst.classList.toggle('active');
        });
    }
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });
    
    // 轮播图功能
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (carouselInner && carouselItems.length > 0 && prevBtn && nextBtn) {
            let currentIndex = 0;
            const itemWidth = carouselItems[0].clientWidth;
            const totalItems = carouselItems.length;
            
            // 设置轮播图初始宽度
            carouselInner.style.width = `${totalItems * 100}%`;
            
            // 轮播图切换函数
            function goToSlide(index) {
                if (index < 0) {
                    index = totalItems - 1;
                } else if (index >= totalItems) {
                    index = 0;
                }
                currentIndex = index;
                carouselInner.style.transform = `translateX(-${currentIndex * (100 / totalItems)}%)`;
            }
            
            // 左右按钮事件
            prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
            nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
            
            // 自动轮播
            let autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
            
            // 鼠标悬停时暂停自动轮播
            carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
            carousel.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
            });
            
            // 窗口大小改变时重新计算宽度
            window.addEventListener('resize', () => {
                const newWidth = carouselItems[0].clientWidth;
                carouselInner.style.transform = `translateX(-${currentIndex * newWidth}px)`;
            });
        }
    }
    
    // 推荐内容标签切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有活跃状态
                tabBtns.forEach(b => b.classList.remove('active'));
                // 添加当前活跃状态
                this.classList.add('active');
                
                // 这里可以添加切换内容的逻辑
                // 例如：根据标签显示不同的文章列表
                const tabType = this.dataset.tab;
                console.log('切换到标签：', tabType);
            });
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 考虑导航栏高度
                    behavior: 'smooth'
                });
                
                // 移动端点击导航后关闭菜单
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // 文章卡片点击事件
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const articleId = this.dataset.id;
            if (articleId) {
                // 跳转到文章详情页
                window.location.href = `post.html?id=${articleId}`;
            }
        });
    });
    
    // 分类项点击事件
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.dataset.category;
            if (categoryName) {
                // 跳转到分类页面
                window.location.href = `category.html?name=${encodeURIComponent(categoryName)}`;
            }
        });
    });
    
    // 互动按钮事件（点赞、收藏）
    const interactionBtns = document.querySelectorAll('.interaction-btn');
    interactionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            this.classList.toggle('active');
            
            // 这里可以添加发送请求的逻辑
            console.log(`${type} 按钮被点击`);
        });
    });
    
    // 懒加载图片
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add('loaded');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // 降级方案
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.classList.add('loaded');
        });
    }
    
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const keyword = this.value.trim();
                if (keyword) {
                    window.location.href = `archive.html?search=${encodeURIComponent(keyword)}`;
                }
            }
        });
    }
    
    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证和提交逻辑
            const formData = new FormData(this);
            console.log('表单数据：', Object.fromEntries(formData));
            
            // 模拟提交成功
            alert('留言发送成功！感谢您的反馈。');
            this.reset();
        });
    }
    
    // 评论表单提交
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const commentText = this.querySelector('textarea').value.trim();
            if (commentText) {
                // 这里可以添加评论提交逻辑
                console.log('评论内容：', commentText);
                
                // 模拟提交成功
                alert('评论提交成功！感谢您的参与。');
                this.reset();
            }
        });
    }
    
    // 分页按钮事件
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            if (page) {
                // 移除所有活跃状态
                pageBtns.forEach(b => b.classList.remove('active'));
                // 添加当前活跃状态
                this.classList.add('active');
                
                // 这里可以添加加载对应页数据的逻辑
                console.log('跳转到第', page, '页');
            }
        });
    });
    
    // 添加滚动进度条
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    // 滚动动画效果
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFadeElements() {
        fadeElements.forEach((element, index) => {
            // 立即为所有元素添加visible类，解决初始不可见问题
            element.classList.add('visible');
        });
    }
    
    // 立即调用一次，确保元素可见
    checkFadeElements();
    
    // 滚动时再次检查，确保所有元素都能正确显示
    window.addEventListener('scroll', checkFadeElements);
    
    // 窗口大小改变时重新检查
    window.addEventListener('resize', checkFadeElements);
    
    // 导航栏滚动高亮
    const navAnchorLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navAnchorLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}` || 
                (currentSection === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // 技能条动画
    function animateSkillBars() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        skillProgresses.forEach(progress => {
            const targetWidth = progress.style.width;
            progress.style.width = '0%';
            
            setTimeout(() => {
                progress.style.width = targetWidth;
            }, 300);
        });
    }
    
    // 检测技能部分是否进入视口
    function checkSkillsInView() {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillsTop = skillsSection.getBoundingClientRect().top;
            if (skillsTop < window.innerHeight - 200) {
                animateSkillBars();
                window.removeEventListener('scroll', checkSkillsInView);
            }
        }
    }
    
    // 卡片悬停效果增强
    function enhanceCardInteractions() {
        const cards = document.querySelectorAll('.article-card, .project-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    

    
    // 页面加载动画
    function pageLoadAnimation() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.5s ease';
        
        window.addEventListener('load', () => {
            body.style.opacity = '1';
        });
    }
    
    // 初始化所有增强功能
    function initEnhancements() {
        enhanceCardInteractions();
        pageLoadAnimation();
    }
    
    // 滚动时检查
    window.addEventListener('scroll', () => {
        // 更新滚动进度条
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
        
        // 检查渐入元素
        checkFadeElements();
        
        // 更新导航栏高亮
        updateActiveNavLink();
        
        // 检查技能部分是否进入视口
        checkSkillsInView();
    });
    
    // 初始化
    initEnhancements();
    
    // 打字机效果（用于关于页）
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.dataset.text || '欢迎来到我的博客！';
        typeWriter(typewriterElement, text);
    }
});