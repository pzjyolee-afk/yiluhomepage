
console.log("ANIMATE VERSION 2 - FINAL FIX");

// ============================================
// 1. 所有初始化统一在一个DOMContentLoaded里
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM加载完成，初始化所有功能');
    
    // 初始化所有功能
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initDeviceIcons();
    initCardHover();
    initCarouselArrow();
    initProductCards();
    initNavActiveState();
    initHeroDevices();
    initLoadAnimation();
    initContactForm();
    initLazyLoading();
    initMobileMenu();
    initLanguageSwitcher();  // 语言切换也放这里
    
    // 数字计数动画 - 使用修复版
    initNumberCounters();
});

// ============================================
// 2. 数字计数动画（完全修复版！）
// ============================================
function initNumberCounters() {
    console.log('🔢 初始化数字计数动画 - 修复版');
    
    // 数字动画函数 - 修复变量错误！
    function animateCounter(el, target) {
        let current = 0;  // 只用一个变量
        const duration = 2000;
        const increment = target / (duration / 16);
        
        function update() {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current).toLocaleString() + "+";
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString() + "+";
                console.log(`✅ 数字完成: ${target.toLocaleString()}+`);
            }
        }
        
        // 开始动画
        el.textContent = "0+";
        requestAnimationFrame(update);
    }

    // 获取所有数字元素
    const numbers = document.querySelectorAll(".total-shipments .number");
    console.log('找到数字元素数量:', numbers.length);
    
    if (numbers.length === 0) {
        console.warn('⚠️ 未找到数字元素');
        
        // 重试机制
        setTimeout(() => {
            const retryNumbers = document.querySelectorAll(".total-shipments .number");
            console.log('重试找到数字元素:', retryNumbers.length);
            if (retryNumbers.length > 0) {
                startAnimation(retryNumbers);
            }
        }, 500);
        return;
    }
    
    startAnimation(numbers);
    
    function startAnimation(numberElements) {
        const numberObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const el = entry.target;
                if (el.classList.contains("animated")) return;
                
                el.classList.add("animated");
                const target = parseInt(el.getAttribute("data-target"));
                
                if (!isNaN(target)) {
                    console.log(`🎯 触发数字动画: ${target}`);
                    animateCounter(el, target);
                }
                
                observer.unobserve(el);
            });
        }, {
            threshold: 0.2
        });

        numberElements.forEach(el => {
            el.classList.remove("animated");
            el.textContent = "0+";
            numberObserver.observe(el);
            console.log('👀 观察数字元素:', el);
        });
        
        // 立即显示可见的数字
        setTimeout(() => {
            numberElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add("animated");
                    const target = parseInt(el.getAttribute("data-target"));
                    if (!isNaN(target)) {
                        animateCounter(el, target);
                    }
                }
            });
        }, 200);
    }
}

// ============================================
// 3. 滚动动画（修复首页选择器）
// ============================================
function initScrollAnimations() {
    console.log('🎬 初始化滚动动画');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ✅ 正确的选择器
    const selectors = [
        '.ess-card', '.battery-card', '.app-card', 
        '.heater-card', '.component-card', 
        '.detail-cardtop',  // 首页卡片
        '.other-product-card', 
        '.detail-card', 
        '.timeline-item', 
        '.section-banner'
    ].join(',');
    
    const elementsToAnimate = document.querySelectorAll(selectors);
    console.log(`🎯 找到动画元素: ${elementsToAnimate.length} 个`);
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ============================================
// 4. Header滚动效果（修复缺失的函数）
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        header.style.boxShadow = 'none';
    });
}

// ============================================
// 5. 其他函数（保持不变，但确保都存在）
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initDeviceIcons() {
    const deviceIcons = document.querySelectorAll('.device-icon');
    deviceIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function initCardHover() {
    const cards = document.querySelectorAll('.ess-card, .battery-card, .app-card, .heater-card, .component-card, .other-product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

function initCarouselArrow() {
    const carouselArrow = document.querySelector('.carousel-arrow');
    if (carouselArrow) {
        carouselArrow.addEventListener('click', function() {
            this.style.transform = 'translateY(-50%) scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'translateY(-50%) scale(1)';
            }, 200);
        });
    }
}

function initProductCards() {
    const productCards = document.querySelectorAll('.battery-card, .heater-card, .other-product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function initNavActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initHeroDevices() {
    const heroDevices = document.querySelector('.hero-devices');
    if (heroDevices) {
        heroDevices.addEventListener('mousemove', (e) => {
            const rect = heroDevices.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            const devices = heroDevices.querySelectorAll('.device-icon');
            devices.forEach((device, index) => {
                device.style.transform = `translate(${moveX * (index + 1) * 0.1}px, ${moveY * (index + 1) * 0.1}px)`;
            });
        });
        
        heroDevices.addEventListener('mouseleave', () => {
            const devices = heroDevices.querySelectorAll('.device-icon');
            devices.forEach(device => {
                device.style.transform = '';
            });
        });
    }
}

function initLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

function initContactForm() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });
        
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
            });
        });
    }
}

// ============================================
// 6. 多语言功能
// ============================================
        const languageData = {
  'ko': {
            btn_home: '솔루션',
            btn_product: '제품',
            btn_company: '회사 소개',
            btn_contact: '문의하기',

            title: '스마트 통합 관리 시스템',
            title2: '신속하고 안정적인 기술 지원',
            description: '스마트폰 애플리케이션을 통해 다양한 디바이스를 효율적으로 관리하고, 이상 발생 시 즉시 알림을 제공합니다.',
            description2: '최근 2개월간의 운영 이력을 확인할 수 있으며, 현장 방문 없이 원격 제어를 통해 신속한 초기 대응이 가능합니다.',
            bannerpoint: '고객 맞춤형 개발 서비스도 제공합니다.',

            titlezizhi: '자체 기술 기반',
            titleone: 'ESS 통합 솔루션',

            batteryh1: '배터리 밸런스',
            batteryh2: '자동 밸런싱 기능 적용',
            batteryh3: '셀 밸런스 이상 발생 시 충전을 자동으로 제어하며, 정상 상태로 복원되면 충전을 중단합니다.',

            carh1: '혹한기에도 안심',
            carh2: '저온 보호 설계 적용',
            carh3: '극한의 저온 환경에서도 충·방전을 자동으로 제어하여 영하 10℃에서도 안정적인 사용이 가능합니다.',

            essh1: 'ESS 안전 인증 획득',
            essh2: '신뢰할 수 있는 배터리 시스템',

            boardh1: '안전과 신뢰를 위한',
            boardh2: 'BMS부터 소프트웨어까지 자체 개발',

            titlekc: 'KC62619 인증 IoT BMS',
            Textkc1: '엄격한 시험 기준을 통과하여 다양한 안전 인증을 획득하였습니다. 캠핑카, 가정용 에너지 저장 시스템, 산업 설비, 태양광 연계 시스템 등 다양한 에너지 저장 환경에 적용 가능합니다.',
            Textkc2: 'AI 기술을 적용하여 배터리 밸런스의 능동 제어와 저온 환경 방전 제어 등 고도화된 자동 관리 기능을 구현하였습니다.',

            titletwo: '인산철(LiFePO₄) 리튬 배터리',
            Bannerpoint2: '고객 맞춤형 개발 서비스도 제공합니다.',

            textchukou: '출하 실적 (한국)',
            Powertext1: '휴대용 전원 장치',
            Powertext2: 'KC62619 안전 인증',
            Power2text1: '배터리 팩',
            Power3text1: '대용량 배터리',
            Power4text1: '충전기',

            Powermiaoshu: '제품의 안전성과 내구성 확보를 위해 세계 최고 수준의 품질을 자랑하는 EVE사의 인산철 리튬 셀을 적용하고 있습니다.',
            Powertitle1: 'EVE C33 원통형 셀',
            Powershuoming1: 'C33 원통형 셀은 최대 3C 방전 성능을 지원합니다.',
            Powertitle2: '고속 충전 대응 셀 구조',
            Powershuoming2: '최대 1C 연속 충전을 지원하며, 40A 급속 충전기 사용 시 약 3시간 이내 완충이 가능합니다.',

            cangjingtext: '아웃도어, 산업 현장, 비상 전원 등 다양한 환경에서 안정적인 전력 공급을 제공합니다.',
            Changjing1: '차박',
            Changjing2: '드론',
            Changjing3: '낚시',
            Changjing4: '비상 전원',
            Changjing5: '야외 활동',
            Changjing6: '야외 촬영',

            titlethree: 'FF 히터',
            Textoem: 'OEM 생산을 지원합니다.',

            Heatertext1: '일체형 FF 히터 2kW',
            Heatertext2: '연료: 경유 / 등유',
            Heater2text1: '일체형 FF 히터 5kW',
            Heater3text1: '차량용 FF 히터 2kW',
            Heater4text1: '차량용 FF 히터 5kW',

            Titlekc2: 'KC 안전 인증 획득',
            Pointtext1: '장기간 축적된 공급망 네트워크를 기반으로 엄선된 고품질 부품을 적용하여 뛰어난 품질과 합리적인 가격 경쟁력을 제공합니다.',
            Pointtext2: '자체 설계 및 개발한 핵심 부품을 적용하여 내구성과 신뢰성을 한층 강화했습니다.',

            titlefour: '기타 제품',
            Othertext1: '주행 충전기',
            Othertext2: '고출력 설계',
            Othertext3: '양방향 충전 지원',
            Other2text1: '인버터',
            Other2text2: '순수 정현파 출력',
            Other3text1: '차량용 에어컨',
            Other4text1: '무동력 팬',
            Other4text2: '알루미늄 케이스 적용',
            Other5text1: '태양광 패널',

            Textaboutus1: '당사는 2017년 설립 이후 인산철 리튬 배터리 및 FF 히터 제조, IoT-ESS 솔루션 개발에 주력해 왔습니다.',
            Textaboutus2: '일본 시장을 시작으로 글로벌 시장으로 사업을 확장하며, 고객의 의견을 반영한 지속적인 기술 혁신을 이어가고 있습니다.',

            Titlecom: '회사 연혁',
            Comtext1: '회사 설립',
            Comtext2: 'mdhong 브랜드 FF 히터 출시',
            Comtext3: '캠핑 용품 수입·유통 사업 개시',
            Comtext4: '인산철 리튬 배터리 출시',
            Comtext5: '주행 충전기 출시',
            Comtext6: 'IoT 시스템 자체 개발 착수',
            Comtext7: '제품 디자인·PCB·소프트웨어 자체 개발',
            Comtext8: '차량용 에어컨 출시',
            Comtext9: '무동력 팬 출시',
            Comtext10: 'BMS 제품 출시',
            Comtext11: 'IoT-ESS 솔루션 정식 출시',
            Comtext12: 'IoT 앱 QLink 출시',

            Year1: '2017',
            Year2: '2018',
            Year3: '2019',
            Year4: '2020',
            Year5: '2023',
            Year6: '2024',
            Year7: '2025',

            Textdaili1: '대리점 모집',
            Textdaili2: '파트너사의 성장을 최우선 가치로 삼아 체계적인 지원을 제공합니다.',
            Textdaili3: 'OEM 공급을 통해 귀사 브랜드로 고품질 제품을 전개하실 수 있습니다.',

            Textiot1: 'IoT-ESS 솔루션',
            Textiot2: '캠핑카 제조사를 위한 오프그리드 전원 시스템과 스마트 제어 기술을 결합한 통합 솔루션을 제공합니다.',
            Textiot3: '보다 고부가가치 전력 시스템 구현을 위해 도입을 적극 검토해 주시기 바랍니다.',

            Titlecontact: '문의하기',
            Textcontact: '제품 및 솔루션 관련 문의는 아래 연락처를 통해 언제든지 문의해 주시기 바랍니다.',
            contactmail: '연락처',
            contactaddress: '주소',

            bannerImg: 'img/top-visual.png',
            langText: '한국어'

            },

  'en': {
btn_home: 'Solutions',
btn_product: 'Products',
btn_company: 'About Us',
btn_contact: 'Contact Us',

title: 'Smart Integrated Management System',
title2: 'Fast and Reliable Technical Support',
description: 'Efficiently manage multiple devices through a dedicated smartphone application and receive real-time alerts whenever abnormalities are detected.',
description2: 'Review operational data from the past two months and respond quickly through remote control without the need for on-site visits.',
bannerpoint: 'Customized development services are also available.',

titlezizhi: 'In-House Technology',
titleone: 'ESS Integrated Solutions',

batteryh1: 'Battery Balancing',
batteryh2: 'Automatic Cell Balancing',
batteryh3: 'The system automatically regulates charging when cell imbalance is detected and stops charging once optimal balance is restored.',

carh1: 'Reliable Even in Extreme Cold',
carh2: 'Low-Temperature Protection Design',
carh3: 'Automatically manages charging and discharging in harsh cold environments, ensuring stable operation even at -10°C.',

essh1: 'ESS Safety Certification Achieved',
essh2: 'A Reliable and Secure Battery System',

boardh1: 'Engineered for Safety and Reliability',
boardh2: 'Fully In-House Development from BMS to Software',

titlekc: 'KC62619 Certified IoT BMS',
Textkc1: 'Certified under rigorous testing standards and compliant with multiple safety certifications. Suitable for diverse energy storage applications including camper vans, residential ESS, industrial equipment, and solar-integrated systems.',
Textkc2: 'AI-driven control technology enables advanced automatic management features such as active cell balancing and low-temperature discharge control.',

titletwo: 'Lithium Iron Phosphate (LiFePO₄) Battery',
Bannerpoint2: 'Customized development services are also available.',

textchukou: 'Shipment Records (Korea)',
Powertext1: 'Portable Power System',
Powertext2: 'KC62619 Safety Certified',
Power2text1: 'Battery Pack',
Power3text1: 'High-Capacity Battery',
Power4text1: 'Charger',

Powermiaoshu: 'To ensure maximum safety and durability, we utilize premium lithium iron phosphate cells from EVE, a globally recognized leader in battery manufacturing.',
Powertitle1: 'EVE C33 Cylindrical Cell',
Powershuoming1: 'The C33 cylindrical cell supports a maximum discharge rate of up to 3C.',
Powertitle2: 'High-Speed Charging Cell Structure',
Powershuoming2: 'Supports up to 1C continuous charging and achieves a full charge in approximately 3 hours when using a 40A fast charger.',

cangjingtext: 'Delivers stable power supply across various environments including outdoor activities, industrial sites, and emergency backup applications.',
Changjing1: 'Car Camping',
Changjing2: 'Drones',
Changjing3: 'Fishing',
Changjing4: 'Emergency Backup Power',
Changjing5: 'Outdoor Activities',
Changjing6: 'Outdoor Filming',

titlethree: 'FF Heater',
Textoem: 'OEM manufacturing services are available.',

Heatertext1: 'Integrated FF Heater 2kW',
Heatertext2: 'Fuel: Diesel / Kerosene',
Heater2text1: 'Integrated FF Heater 5kW',
Heater3text1: 'Vehicle-Mounted FF Heater 2kW',
Heater4text1: 'Vehicle-Mounted FF Heater 5kW',

Titlekc2: 'KC Safety Certified',
Pointtext1: 'Leveraging our long-established supply chain network, we carefully select high-quality components to ensure outstanding performance and competitive pricing.',
Pointtext2: 'Core components are designed and developed in-house to significantly enhance durability and long-term reliability.',

titlefour: 'Other Products',
Othertext1: 'DC-DC Charger',
Othertext2: 'High-Output Design',
Othertext3: 'Bidirectional Charging Support',
Other2text1: 'Inverter',
Other2text2: 'Pure Sine Wave Output',
Other3text1: 'Vehicle Air Conditioner',
Other4text1: 'Passive Ventilation Fan',
Other4text2: 'Aluminum Housing',
Other5text1: 'Solar Panel',

Textaboutus1: 'Since our establishment in 2017, we have specialized in lithium iron phosphate battery manufacturing, FF heater production, and IoT-ESS solution development.',
Textaboutus2: 'Beginning with the Japanese market, we are expanding globally while continuously advancing our technology and product quality through customer-driven innovation.',

Titlecom: 'Company History',
Comtext1: 'Company Established',
Comtext2: 'Launched FF heaters under the mdhong brand',
Comtext3: 'Initiated import and distribution of camping products',
Comtext4: 'Launched LiFePO₄ battery products',
Comtext5: 'Launched DC-DC charger products',
Comtext6: 'Began in-house IoT system development',
Comtext7: 'Expanded into product design, PCB engineering, and software development',
Comtext8: 'Launched vehicle air conditioner products',
Comtext9: 'Launched passive ventilation fan products',
Comtext10: 'Launched BMS products',
Comtext11: 'Officially launched IoT-ESS solutions',
Comtext12: 'Released IoT app QLink',

Year1: '2017',
Year2: '2018',
Year3: '2019',
Year4: '2020',
Year5: '2023',
Year6: '2024',
Year7: '2025',

Textdaili1: 'Distributor Recruitment',
Textdaili2: 'We prioritize our partners’ growth and provide structured, comprehensive support.',
Textdaili3: 'OEM supply is available, enabling you to market high-quality products under your own brand.',

Textiot1: 'IoT-ESS Solution',
Textiot2: 'We provide an integrated solution that combines advanced off-grid power systems with smart control technology tailored for RV manufacturers.',
Textiot3: 'We look forward to supporting the implementation of higher value-added power systems for your product lineup.',

Titlecontact: 'Contact Us',
Textcontact: 'For inquiries regarding our products and solutions, please feel free to reach out using the contact information below.',
contactmail: 'Contact',
contactaddress: 'Address',

bannerImg: 'img/top-visual.png',
langText: 'English'

                    },


    'jp': {
                btn_home: 'ソリューション',
                btn_product: '製品情報',
                btn_company: '会社概要',
                btn_contact: 'お問い合わせ',
                title: 'スマート管理',
                title2: 'サポート対応',
                description: 'スマホアプリで各種デバイスを効率的に管理し、異常時には即座にメッセージでお知らせします。',
                description2: '過去2ヶ月間以内の稼働履歴を確認し、現地訪問を行わずに、遠隔制御などの初期対応ができます！',
                bannerpoint: 'カスタマイズ開発も承っております。',
                titlezizhi: '自社特製',
                titleone: 'ESSソリューション',
                batteryh1: 'バッテリーバランス',
                batteryh2: '自動調整機能搭載',
                batteryh3: 'セルバランスが崩れると充電を開始し、整うと停止します。',
                carh1: '真冬でも安心！',
                carh2: '厳寒期の安全装置搭載',
                carh3: '厳しい寒さの中でも充電量と放電量を自動で調整し、マイナス10度でも無理なく、安心してお使いいただけます！',
                essh1: 'ESS安全認証取得済',
                essh2: '信頼できるバッテリーシステム',
                boardh1: '安心・安全のための',
                boardh2: 'BMSからソフトウェアまで自社開発',
                titlekc: 'KC62619 認証 IOT BMS',
                Textkc1: '厳しい検査基準をクリアし、各種安全認証を取得しています。キャンピングカーはもちろん、家庭用蓄電、工場設備、 太陽光システムとの連携など、幅広いエネルギー貯蔵用途に対応し、多様な環境で高いパフォーマンスを発揮します。',
                Textkc2: 'AI技術の導入により、バッテリーバランスのアクティブ調整や低温環境での放電調整など、これまで以上に高度でスピ ーディーな自動処理機能を実現しています。',
                titletwo: 'リン酸鉄リチウムバッテリー',
                Bannerpoint2: 'カスタマイズ開発も承っております。',
                textchukou: '出荷台数実績（韓国）',
                Powertext1: 'ポータブル電源',
                Powertext2: 'KC62619安全認証',
                Power2text1: 'バッテリーパック',
                Power3text1: '大型バッテリー',
                Power4text1: '充電器',
                Powermiaoshu: '製品の安全性と耐久性を確保するため、当社のリン酸鉄リチウムバッテリー製品には、世界トップレベルの品質を誇るEVE社のセルを厳選して採用しています。',
                Powertitle1: 'EVE社製 C33円筒形セル',
                Powershuoming1: 'C33円筒形セルの最大放電率は「3C」すなわちバッテリー容量の3倍！',
                Powertitle2: '超高速充電対応セル構造',
                Powershuoming2: 'C33円筒形セルは最大1Cの連続充電に対応。 40A急速充電器を使用すれば、わずか3時間でフル充電を実現',
                cangjingtext: 'アウトドア用途から業務現場、非常用バックアップまで、幅広い環境で安定した電力供給を実現します。',
                Changjing1: '車中泊',
                Changjing2: 'ドローン',
                Changjing3: '釣り',
                Changjing4: '非常用電力',
                Changjing5: 'バスキング',
                Changjing6: '野外撮影',
                titlethree: 'FFヒーター',
                Textoem: 'OEM生産のご依頼も承っております。',
                Heatertext1: '一体型FFヒーター　2KW',
                Heatertext2: '軽油/灯油',
                Heater2text1: '一体型FFヒーター　5KW',
                Heater3text1: '車載用FFヒーター　2KW',
                Heater4text1: '車載用FFヒーター　5KW',
                Titlekc2: 'KC安全認証取得済み',
                Pointtext1: '長年にわたって築き上げたサプライヤーネットワークを基盤に、常に最適な高品質パーツを厳選し、製品の品質向上と優れたコストパフォーマンスを実現しています。',
                Pointtext2: '自社が独自に設計・開発したパーツを搭載することで、耐久性や信頼性など、製品品質の大幅な強化を実現しております。',
                titlefour: 'その他製品',
                Othertext1: '走行充電器',
                Othertext2: '最大電流',
                Othertext3: '双方向充電対応',
                Other2text1: 'インバーター',
                Other2text2: '純正弦波',
                Other3text1: '車載エアコン',
                Other4text1: '無動力ファン',
                Other4text2: 'アルミニウム製ケース',
                Other5text1: 'ソーラーパネル',
                Textaboutus1: '当社は2017年の設立以来、リン酸鉄リチウムバッテリーおよびFFヒーターの製造、ならびにIoT-ESSソリューションの開発に注力してまいりました。',
                Textaboutus2: '今後は日本市場をはじめ、グローバルな事業展開を進めるとともに、お客様からいただく貴重なご意見を製品づくりに活かし、さらなる品質向上と技術革新に取り組んでまいります。',
                Titlecom: '会社沿革',
                Comtext1: '会社設立',
                Comtext2: 'mdhongブランドのFFヒーター製品を発売',
                Comtext3: 'キャンピング用品の輸入販売事業を開始',
                Comtext4: 'リン酸鉄リチウム（LiFePO₄）バッテリー製品を発売',
                Comtext5: '走行充電器製品を発売',
                Comtext6: 'IoTシステムの自社開発を開始',
                Comtext7: '製品デザイン、PCB設計、プログラム開発を推進',
                Comtext8: '車載用エアコン製品を発売',
                Comtext9: '無動力ファン製品を発売',
                Comtext10: 'BMS（バッテリーマネジメントシステム）製品を発売',
                Comtext11: 'IoT-ESSソリューションを正式リリース',
                Comtext12: 'IoTアプリ「QLink」をリリース',
                Year1: '2017年',
                Year2: '2018年',
                Year3: '2019年',
                Year4: '2020年',
                Year5: '2023年',
                Year6: '2024年',
                Year7: '2025年',
                Textdaili1: '代理店募集',
                Textdaili2: '当社はパートナー企業様の成功を最優先に考え、充実したサポート体制でビジネスの拡大を全面的にバックアップいたします。',
                Textdaili3: '当社製品はOEM供給にも対応しており、高品質な製品を貴社ブランドで展開いただけます。',
                Textiot1: 'IoT-ESS ソリューション',
                Textiot2: 'キャンピングカーメーカー様向けに、最先端のオフグリッド電源システムとスマートコントロール技術を組み合わせた直感的で使いやすい統合ソリューション をご提案しています。',
                Textiot3: 'お客様のモデルに、より高度で付加価値の高い電力システムを実装できるよう、ぜひ導入をご検討いただければ幸いです。',
                Titlecontact: 'お問い合わせ',
                Textcontact: '当社製品および各種ソリューションに関するお問い合わせは、下記よりお気軽にご連絡ください。',
                contactmail: '連絡先',
                contactaddress: '住所',
                bannerImg: 'img/top-visual.png',
                langText: '日本語'
            }
        };

function initLanguageSwitcher() {
    console.log('🌐 初始化语言切换');
    
    const langDropdown = document.getElementById('langDropdown');
    const dropdownTrigger = document.getElementById('dropdownTrigger');
    const currentLangText = document.getElementById('currentLangText');
    const langOptions = document.querySelectorAll('#langOptions li');
    const langElements = document.querySelectorAll('[data-lang-key]');
    
    if (!langDropdown || !dropdownTrigger) return;

    // ========== 在这里添加图片切换函数 ==========
    function switchImages(lang) {
        console.log(`🖼️ 切换图片到: ${lang}`);
        
        // 处理所有带 data-src-lang 的图片
        document.querySelectorAll('img[data-src-lang]').forEach(img => {
            const baseImageName = img.dataset.srcLang;
            img.src = `img/${lang}/${baseImageName}`;
        });
        
        // 处理 banner 图片
        const bannerImg = document.querySelector('img[data-lang-img-key="bannerImg"]');
        if (bannerImg) {
            bannerImg.src = `img/${lang}/top-visual.png`;
        }
    }
    // ==========================================

    function switchLanguage(lang) {
        if (!languageData[lang]) return;
        
        // 1. 切换文本内容
        langElements.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (languageData[lang][key]) {
                element.textContent = languageData[lang][key];
            }
        });
        
        // ========== 在这里添加图片切换调用 ==========
        // 2. 切换图片
        switchImages(lang);
        // ==========================================
        
        // 3. 更新UI状态
        langOptions.forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-lang') === lang);
        });
        
        if (currentLangText) {
            currentLangText.textContent = languageData[lang].langText || lang.toUpperCase();
        }
        
        localStorage.setItem('selectedLanguage', lang);
        langDropdown.classList.remove('active');
    }

    dropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            switchLanguage(selectedLang);
        });
    });

    const savedLang = localStorage.getItem('selectedLanguage') || 'ko';
    switchLanguage(savedLang);
}
console.log('✅ YILU HK LTD Website - 所有功能加载完成');