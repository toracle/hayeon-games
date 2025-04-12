// 떠다니는 요소들을 생성하는 함수
function createFloatingElements(parentElement, options = {}) {
    // 기본 옵션 설정
    const settings = {
        count: options.count || 15,
        shapes: options.shapes || ['circle', 'square', 'triangle', 'star', 'heart'],
        colors: options.colors || ['#FF5252', '#42A5F5', '#66BB6A', '#FFD54F', '#AB47BC'],
        minSize: options.minSize || 10,
        maxSize: options.maxSize || 30,
        minDuration: options.minDuration || 10,
        maxDuration: options.maxDuration || 25,
        zIndex: options.zIndex || -1
    };

    // 부모 요소 상대적 위치 설정
    if (getComputedStyle(parentElement).position === 'static') {
        parentElement.style.position = 'relative';
    }

    // 떠다니는 요소들 생성
    for (let i = 0; i < settings.count; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // 임의의 모양 선택
        const shape = settings.shapes[Math.floor(Math.random() * settings.shapes.length)];
        element.classList.add(shape);
        
        // 임의의 색상 선택
        const color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
        element.style.backgroundColor = color;
        
        // 크기 설정
        const size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // 초기 위치 설정
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // 스타일 설정
        element.style.position = 'absolute';
        element.style.opacity = '0.4';
        element.style.pointerEvents = 'none';
        element.style.zIndex = settings.zIndex;
        
        // 애니메이션 설정
        const duration = Math.random() * (settings.maxDuration - settings.minDuration) + settings.minDuration;
        const delay = Math.random() * 5;
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        // 부모 요소에 추가
        parentElement.appendChild(element);
    }
    
    // CSS 애니메이션 추가
    if (!document.getElementById('floating-elements-style')) {
        const style = document.createElement('style');
        style.id = 'floating-elements-style';
        style.innerHTML = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(10px, -15px) rotate(5deg);
                }
                50% {
                    transform: translate(-5px, -25px) rotate(10deg);
                }
                75% {
                    transform: translate(-15px, -10px) rotate(5deg);
                }
                100% {
                    transform: translate(5px, -30px) rotate(0deg);
                }
            }
            
            .floating-element {
                pointer-events: none;
                will-change: transform;
            }
            
            .circle {
                border-radius: 50%;
            }
            
            .square {
                border-radius: 3px;
            }
            
            .triangle {
                width: 0 !important;
                height: 0 !important;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 20px solid currentColor;
                background-color: transparent !important;
            }
            
            .star {
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            }
            
            .heart {
                transform: rotate(45deg);
            }
            
            .heart:before,
            .heart:after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: inherit;
                border-radius: 50%;
            }
            
            .heart:before {
                left: -50%;
                top: 0;
            }
            
            .heart:after {
                top: -50%;
                left: 0;
            }
        `;
        document.head.appendChild(style);
    }
}

// 전역으로 함수 노출
window.createFloatingElements = createFloatingElements;