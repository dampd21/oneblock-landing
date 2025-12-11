/* ============================================
   ONEBLOCK - Common JavaScript
   원블럭 공통 스크립트
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. 모바일 햄버거 메뉴
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // 메뉴 링크 클릭 시 메뉴 닫기
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ============================================
    // 2. 스크롤 시 헤더 스타일 변경
    // ============================================
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ============================================
    // 3. Intersection Observer (애니메이션)
    // ============================================
    const animateElements = document.querySelectorAll('.animate-fade-in');
    
    if (animateElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach(function(element) {
            observer.observe(element);
        });
    }
    
    // ============================================
    // 4. 부드러운 스크롤 (앵커 링크)
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // 5. 폼 유효성 검사 및 제출
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 간단한 유효성 검사
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#EF4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // 폼 제출 시뮬레이션 (실제로는 서버로 전송)
                // FormSpree 등 사용 시 이 부분 수정
                
                // 성공 메시지 표시
                contactForm.style.display = 'none';
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                
                // 또는 실제 제출
                // contactForm.submit();
            }
        });
        
        // 입력 시 에러 스타일 제거
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    // ============================================
    // 6. 필터 기능 (포트폴리오, 블로그)
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // 활성 버튼 변경
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // 카드 필터링
                const cards = document.querySelectorAll('[data-category]');
                cards.forEach(function(card) {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = '';
                        // 애니메이션 재실행
                        card.classList.remove('visible');
                        setTimeout(function() {
                            card.classList.add('visible');
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ============================================
    // 7. 전자책 폼 처리
    // ============================================
    const ebookForm = document.getElementById('ebookForm');
    const ebookSuccess = document.getElementById('ebookSuccess');
    
    if (ebookForm) {
        ebookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const requiredFields = ebookForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#EF4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                ebookForm.style.display = 'none';
                if (ebookSuccess) {
                    ebookSuccess.style.display = 'block';
                }
            }
        });
    }
    
    // ============================================
    // 8. 현재 페이지 네비게이션 활성화
    // ============================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        
        // 경로 비교 (간단한 버전)
        if (href && currentPath.includes(href.replace('../', '').replace('./', ''))) {
            // 이미 HTML에서 active 클래스가 설정되어 있으므로
            // 필요한 경우에만 추가 로직 작성
        }
    });
    
    // ============================================
    // 9. 카카오톡 플로팅 버튼 스크롤 효과
    // ============================================
    const kakaoFloat = document.querySelector('.kakao-float');
    
    if (kakaoFloat) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                // 스크롤 다운 - 버튼 숨기기 (선택적)
                // kakaoFloat.style.transform = 'translateY(100px)';
            } else {
                // 스크롤 업 - 버튼 보이기
                // kakaoFloat.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ============================================
    // 10. 숫자 카운트업 애니메이션 (선택적)
    // ============================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // 통계 숫자 카운트업 (필요시 활성화)
    // const statNumbers = document.querySelectorAll('.stat-number');
    // statNumbers.forEach(function(stat) {
    //     const target = parseInt(stat.textContent);
    //     if (!isNaN(target)) {
    //         animateCounter(stat, target, 2000);
    //     }
    // });
    
    // ============================================
    // 11. 이미지 레이지 로딩 (선택적)
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // 12. 콘솔 로고 (재미 요소)
    // ============================================
    console.log('%c ONEBLOCK ', 'background: #0F172A; color: #EAB308; font-size: 24px; font-weight: bold; padding: 10px 20px;');
    console.log('%c 마케팅의 첫 블럭, 원블럭 ', 'color: #64748B; font-size: 12px;');
    
});

// ============================================
// 전역 함수 (필요시)
// ============================================

// 외부에서 메뉴 닫기
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 스크롤 맨 위로
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
