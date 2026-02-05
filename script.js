// 平滑滚动
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

// 滚动时显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有卡片和部分
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.ess-card, .battery-card, .app-card, .heater-card, .component-card, .other-product-card, .detail-card, .timeline-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Header滚动效果
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 阴影效果已取消
    header.style.boxShadow = 'none';
    
    lastScroll = currentScroll;
});

// 设备图标动画
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

// 卡片悬停效果增强
const cards = document.querySelectorAll('.ess-card, .battery-card, .app-card, .heater-card, .component-card, .other-product-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// 数字计数动画
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 16);
}

// 观察数字元素
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target;
            const targetText = numberElement.textContent;
            const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
            
            if (targetNumber && !numberElement.classList.contains('animated')) {
                numberElement.classList.add('animated');
                animateCounter(numberElement, targetNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const numberElements = document.querySelectorAll('.total-shipments .number');
    numberElements.forEach(el => {
        numberObserver.observe(el);
    });
});

// 轮播箭头点击效果
const carouselArrow = document.querySelector('.carousel-arrow');
if (carouselArrow) {
    carouselArrow.addEventListener('click', function() {
        this.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
        
        // 这里可以添加实际的轮播功能
        console.log('Carousel arrow clicked');
    });
}

// 产品卡片点击效果
const productCards = document.querySelectorAll('.battery-card, .heater-card, .other-product-card');
productCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// 视差滚动效果（轻微）
// 已移除 hero 区域的视差与上滑虚化效果，保留此前实现记录以便需要时恢复。

// 导航链接激活状态
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
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

// 导航链接的活动样式已移入 `styles.css`

// 鼠标跟随效果（可选，用于特殊元素）
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
            const delay = index * 0.1;
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

// 加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 响应式菜单（移动端）
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-dark);
            `;
            
            if (window.innerWidth <= 768) {
                toggle.style.display = 'block';
            }
            
            const headerContent = document.querySelector('.header-content');
            headerContent.insertBefore(toggle, nav);

            // 创建或获取遮罩层（用于在移动端打开菜单时禁用背景交互）
            let overlay = document.querySelector('.mobile-menu-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'mobile-menu-overlay';
                overlay.style.display = 'none';
                document.body.appendChild(overlay);
            }
            
            // 切换菜单并同步图标状态
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Toggle navigation');
            toggle.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('mobile-open');
                toggle.innerHTML = isOpen ? '✕' : '☰';
                toggle.setAttribute('aria-expanded', String(isOpen));
            });

            // 点击遮罩关闭菜单
            overlay.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
                toggle.innerHTML = '☰';
                toggle.setAttribute('aria-expanded', 'false');
                overlay.style.display = 'none';
            });
        }
    }
};

// 初始化移动菜单
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// 移动端相关样式（菜单与遮罩）已迁移到 `styles.css`，不再由 JS 动态注入。

// 表单验证（如果有联系表单）
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // 表单提交逻辑
    });
}

// 图片懒加载（如果使用真实图片）
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

console.log('YILU HK LTD Website - Interactive features loaded');

 // 1. 定义多语言数据（可扩展更多语言/文本）
        const languageData = {
            'ko-KR': {
                btn_home: '솔루션',
                btn_product: '제품 정보',
                btn_company: '회사 개요',
                btn_contact: '문의하기',
                title: '스마트 관리',
                title2: '지원 대응',
                description: '스마트폰 앱으로 각종 디바이스를 효율적으로 관리하고, 이상 발생 시 즉시 메시지로 알려드립니다.',
                description2: '지난 2개월 이내의 가동 이력을 확인하고, 현지 방문 없이 원격 제어 등 초기 대응이 가능합니다!',
                bannerpoint: '커스터마이징 개발도 접수하고 있습니다.',
                titlezizhi: '자사 특제',
                titleone: 'ESS 솔루션',
                batteryh1: '배터리 밸런스',
                batteryh2: '자동 조정 기능 탑재',
                batteryh3: '셀 밸런스가 깨지면 충전을 시작하고, 정상화되면 충전을 정지합니다.',
                carh1: '한겨울도 안심!',
                carh2: '혹한기 안전 장치 탑재',
                carh3: '혹독한 추위 속에서도 충방전량을 자동으로 조절해, 영하 10도에서도 무리 없이 안심하고 사용하실 수 있습니다!',
                essh1: 'ESS 안전 인증 취득 완료',
                essh2: '신뢰할 수 있는 배터리 시스템',
                boardh1: '안심·안전을 위한',
                boardh2: 'BMS부터 소프트웨어까지 자사 개발',
                titlekc: 'KC62619 인증 IOT BMS',
                Textkc1: '엄격한 검사 기준을 통과하고 각종 안전 인증을 취득했습니다. 캠핑카는 물론, 가정용 축전, 공장 설비, 태양광 시스템과의 연계 등 광범위한 에너지 저장 용도에 대응하며, 다양한 환경에서 높은 성능을 발휘합니다.',
                Textkc2: 'AI 기술 도입으로 배터리 밸런스의 능동 조정, 저온 환경에서의 방전 조정 등 그동안 이상으로 고도화되고 신속한 자동 처리 기능을 실현했습니다.',
                titletwo: '인산철 리튬 배터리',
                Bannerpoint2: '커스터마이징 개발도 접수하고 있습니다.',
                textchukou: '출하 대수 실적(한국)',
                Powertext1: '휴대용 전원',
                Powertext2: 'KC62619 안전 인증',
                Power2text1: '배터리 팩',
                Power3text1: '대형 배터리',
                Power4text1: '충전기',
                Powermiaoshu: '제품의 안전성과 내구성을 확보하기 위해, 당사의 인산철 리튬 배터리 제품에는 세계 최고 수준의 품질을 자랑하는 EVE사의 셀을 엄선해 채용하고 있습니다.',
                Powertitle1: 'EVE사 제작 C33 원통형 셀',
                Powershuoming1: 'C33 원통형 셀의 최대 방전률은「3C」, 즉 배터리 용량의 3배입니다!',
                Powertitle2: '초고속 충전 대응 셀 구조',
                Powershuoming2: 'C33 원통형 셀은 최대 1C의 연속 충전에 대응합니다. 40A 급속 충전기를 사용하면 단 3시간 만에 완충을 실현합니다.',
                cangjingtext: '아웃도어 용도부터 업무 현장, 비상용 백업까지 광범위한 환경에서 안정적인 전력 공급을 실현합니다.',
                Changjing1: '차박',
                Changjing2: '드론',
                Changjing3: '낚시',
                Changjing4: '비상용 전력',
                Changjing5: '바스킹',
                Changjing6: '야외 촬영',
                titlethree: 'FF 히터',
                Textoem: 'OEM 생산 의뢰도 접수하고 있습니다.',
                Heatertext1: '일체형 FF 히터 2KW',
                Heatertext2: '경유/등유',
                Heater2text1: '일체형 FF 히터 5KW',
                Heater3text1: '차량용 FF 히터 2KW',
                Heater4text1: '차량용 FF 히터 5KW',
                Titlekc2: 'KC 안전 인증 취득 완료',
                Pointtext1: '오랜 기간 구축한 공급망 네트워크를 기반으로, 항상 최적의 고품질 부품을 엄선해 제품 품질 향상과 우수한 가성비를 실현하고 있습니다.',
                Pointtext2: '자사가 독자적으로 설계·개발한 부품을 탑재함으로써 내구성, 신뢰성 등 제품 품질의 대폭적인 강화를 실현했습니다.',
                titlefour: '기타 제품',
                Othertext1: '주행 충전기',
                Othertext2: '최대 전류',
                Othertext3: '양방향 충전 대응',
                Other2text1: '인버터',
                Other2text2: '순수 정현파',
                Other3text1: '차량용 에어컨',
                Other4text1: '무동력 팬',
                Other4text2: '알루미늄 케이스',
                Other5text1: '솔라 패널',
                Textaboutus1: '당사는 2017년 설립 이후 인산철 리튬 배터리 및 FF 히터 제조, 그리고 IoT-ESS 솔루션 개발에 주력해 왔습니다.',
                Textaboutus2: '앞으로는 일본 시장을 시작으로 글로벌한 사업 전개를 진행하는 동시에, 고객님들로부터 받은 소중한 의견을 제품 제작에 활용해 더욱 품질 향상과 기술 혁신에 힘쓰겠습니다.',
                Titlecom: '회사 연혁',
                Comtext1: '회사 설립',
                Comtext2: 'mdhong 브랜드의 FF 히터 제품 출시',
                Comtext3: '캠핑 용품 수입 판매 사업 시작',
                Comtext4: '인산철 리튬(LiFePO₄) 배터리 제품 출시',
                Comtext5: '주행 충전기 제품 출시',
                Comtext6: 'IoT 시스템 자사 개발 시작',
                Comtext7: '제품 디자인, PCB 설계, 프로그램 개발 추진',
                Comtext8: '차량용 에어컨 제품 출시',
                Comtext9: '무동력 팬 제품 출시',
                Comtext10: 'BMS(배터리 관리 시스템) 제품 출시',
                Comtext11: 'IoT-ESS 솔루션 정식 출시',
                Comtext12: 'IoT 앱「QLink」출시',
                Year1: '2017년',
                Year2: '2018년',
                Year3: '2019년',
                Year4: '2020년',
                Year5: '2023년',
                Year6: '2024년',
                Year7: '2025년',
                Textdaili1: '대리점 모집',
                Textdaili2: '당사는 파트너 기업님들의 성공을 최우선으로 생각하며, 충실한 지원 체제로 사업 확장을 전면적으로 지원하겠습니다.',
                Textdaili3: '당사 제품은 OEM 공급에도 대응하고 있어, 고품질 제품을 귀사 브랜드로 전개하실 수 있습니다.',
                Textiot1: 'IoT-ESS 솔루션',
                Textiot2: '캠핑카 제조사님들을 위해 최첨단 오프그리드 전원 시스템과 스마트 제어 기술을 결합한 직관적이고 사용하기 쉬운 통합 솔루션을 제안하고 있습니다.',
                Textiot3: '고객님의 모델에 더욱 고도화되고 부가가치 높은 전력 시스템을 탑재할 수 있도록 도입을 검토해 주시기 바랍니다.',
                Titlecontact: '문의하기',
                Textcontact: '당사 제품 및 각종 솔루션에 대한 문의는 아래로부터 편하게 연락 주시기 바랍니다.',
                contactmail: '연락처',
                contactaddress: '주소',
                bannerImg: 'img/top-visual.png',
                langText: '한국어'
            },
            'en-US': {
                btn_home: 'Solutions',
                btn_product: 'Product Information',
                btn_company: 'Company Overview',
                btn_contact: 'Contact Us',
                title: 'Smart Management',
                title2: 'Support Response',
                description: 'Efficiently manage various devices via a smartphone app, and send instant notifications in the event of an abnormality.',
                description2: 'Check operation records from the past two months and perform initial responses such as remote control without on-site visits!',
                bannerpoint: 'Customized development is also available.',
                titlezizhi: 'In-House Custom-Made',
                titleone: 'ESS Solutions',
                batteryh1: 'Battery Balancing',
                batteryh2: 'Equipped with Automatic Adjustment Function',
                batteryh3: 'Charging starts when cell balance is disrupted and stops when balance is restored.',
                carh1: 'Reliable Even in Midwinter!',
                carh2: 'Equipped with Safety Devices for Severe Cold',
                carh3: 'Automatically adjusts charging and discharging capacity even in extreme cold, enabling safe and effortless use at -10°C!',
                essh1: 'ESS Safety Certified',
                essh2: 'Reliable Battery System',
                boardh1: 'For Safety and Security',
                boardh2: 'In-House Development from BMS to Software',
                titlekc: 'KC62619 Certified IoT BMS',
                Textkc1: 'It has passed strict inspection standards and obtained various safety certifications. Suitable for a wide range of energy storage applications including campervans, residential energy storage, factory equipment, and solar system integration, delivering high performance in diverse environments.',
                Textkc2: 'The introduction of AI technology has realized more advanced and rapid automatic processing functions, such as active adjustment of battery balancing and discharge adjustment in low-temperature environments.',
                titletwo: 'Lithium Iron Phosphate Battery',
                Bannerpoint2: 'Customized development is also available.',
                textchukou: 'Shipment Volume Records (Korea)',
                Powertext1: 'Portable Power Station',
                Powertext2: 'KC62619 Safety Certified',
                Power2text1: 'Battery Pack',
                Power3text1: 'Large-Capacity Battery',
                Power4text1: 'Charger',
                Powermiaoshu: 'To ensure product safety and durability, our lithium iron phosphate batteries use carefully selected cells from EVE, a company renowned for world-class quality.',
                Powertitle1: 'EVE C33 Cylindrical Cell',
                Powershuoming1: 'The maximum discharge rate of the C33 cylindrical cell is "3C", equivalent to three times the battery capacity!',
                Powertitle2: 'Cell Structure Supporting Ultra-Fast Charging',
                Powershuoming2: 'The C33 cylindrical cell supports continuous charging at a maximum rate of 1C. A full charge is achieved in just 3 hours with a 40A fast charger.',
                cangjingtext: 'Delivers stable power supply in a wide range of scenarios, from outdoor use and job sites to emergency backup power.',
                Changjing1: 'Car Camping',
                Changjing2: 'Drone',
                Changjing3: 'Fishing',
                Changjing4: 'Emergency Power',
                Changjing5: 'Basking',
                Changjing6: 'Outdoor Photography',
                titlethree: 'FF Heater',
                Textoem: 'OEM production orders are also accepted.',
                Heatertext1: 'Integrated FF Heater 2KW',
                Heatertext2: 'Diesel/Kerosene',
                Heater2text1: 'Integrated FF Heater 5KW',
                Heater3text1: 'Vehicle-Mounted FF Heater 2KW',
                Heater4text1: 'Vehicle-Mounted FF Heater 5KW',
                Titlekc2: 'KC Safety Certified',
                Pointtext1: 'Based on a supplier network built over many years, we consistently select optimal high-quality parts to improve product quality and achieve excellent cost performance.',
                Pointtext2: 'By adopting independently designed and developed in-house parts, we have significantly enhanced product quality in terms of durability and reliability.',
                titlefour: 'Other Products',
                Othertext1: 'Travel Charger',
                Othertext2: 'Maximum Current',
                Othertext3: 'Bidirectional Charging Compatible',
                Other2text1: 'Inverter',
                Other2text2: 'Pure Sine Wave',
                Other3text1: 'Vehicle-Mounted Air Conditioner',
                Other4text1: 'Passive Fan',
                Other4text2: 'Aluminum case',
                Other5text1: 'Solar Panel',
                Textaboutus1: 'Since our establishment in 2017, we have focused on manufacturing lithium iron phosphate batteries and FF heaters, as well as developing IoT-ESS solutions.',
                Textaboutus2: 'Moving forward, we will expand our business globally starting with the Japanese market, while leveraging valuable customer feedback in product development to pursue further quality improvements and technological innovation.',
                Titlecom: 'Company History',
                Comtext1: 'Company Establishment',
                Comtext2: 'Launched FF heater products under the mdhong brand',
                Comtext3: 'Started import and sales of camping supplies',
                Comtext4: 'Launched Lithium Iron Phosphate (LiFePO₄) battery products',
                Comtext5: 'Launched travel charger products',
                Comtext6: 'Began in-house development of IoT systems',
                Comtext7: 'Promoted product design, PCB design and program development',
                Comtext8: 'Launched vehicle-mounted air conditioner products',
                Comtext9: 'Launched passive fan products',
                Comtext10: 'Launched BMS (Battery Management System) products',
                Comtext11: 'Officially released IoT-ESS solutions',
                Comtext12: 'Launched the IoT app "QLink"',
                Year1: '2017',
                Year2: '2018',
                Year3: '2019',
                Year4: '2020',
                Year5: '2023',
                Year6: '2024',
                Year7: '2025',
                Textdaili1: 'Agent Recruitment',
                Textdaili2: 'We prioritize the success of our partner companies and provide full support for business expansion with a comprehensive support system.',
                Textdaili3: 'Our products support OEM supply, allowing you to launch high-quality products under your own brand.',
                Textiot1: 'IoT-ESS Solutions',
                Textiot2: 'For campervan manufacturers, we offer an intuitive and easy-to-use integrated solution combining cutting-edge off-grid power systems with smart control technology.',
                Textiot3: 'We hope you will consider adopting our solutions to implement more advanced and high-value-added power systems in your models.',
                Titlecontact: 'Contact Us',
                Textcontact: 'Please feel free to contact us below for inquiries about our products and various solutions.',
                contactmail: 'Contact Information',
                contactaddress: 'Address',
                bannerImg: 'img/top-visual.png',
                langText: 'English'
            },
            'ja-JP': {
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
                Powertext2: 'KC62619安全認証',
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

        // 2. 获取页面元素
        const langDropdown = document.getElementById('langDropdown');
        const dropdownTrigger = document.getElementById('dropdownTrigger');
        const currentLangText = document.getElementById('currentLangText');
        const langOptions = document.querySelectorAll('#langOptions li');
        const langElements = document.querySelectorAll('[data-lang-key]');
        const langImgElements = document.querySelectorAll('[data-lang-img-key]');
        

        // 3. 核心切换函数
        function switchLanguage(lang) {
            // 验证语言是否存在
            if (!languageData[lang]) {
                console.warn(`语言 ${lang} 未配置`);
                return;
            }

            // 更新页面所有带data-lang-key的元素文本
            langElements.forEach(element => {
                const key = element.getAttribute('data-lang-key');
                if (languageData[lang][key]) {
                    element.textContent = languageData[lang][key];
                }
            });

            // 更新下拉选项的激活状态
            langOptions.forEach(option => {
                option.classList.toggle('active', option.getAttribute('data-lang') === lang);
            });

            // 更新下拉按钮显示的语言名称
            currentLangText.textContent = languageData[lang].langText;

            // 更新html标签的lang属性（符合SEO规范）
            document.documentElement.lang = lang;

            // 保存到本地存储，页面刷新后保留选择
            localStorage.setItem('selectedLanguage', lang);

            // 收起下拉菜单
            langDropdown.classList.remove('open');
        }

        // 4. 下拉菜单展开/收起逻辑
        dropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡到document
            langDropdown.classList.toggle('open');
        });

        // 点击页面其他区域收起下拉菜单
        document.addEventListener('click', () => {
            langDropdown.classList.remove('open');
        });

        // 阻止点击下拉选项时收起菜单（先执行切换逻辑）
        document.getElementById('langOptions').addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 5. 绑定下拉选项点击事件
        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedLang = option.getAttribute('data-lang');
                switchLanguage(selectedLang);
            });
        });

        // 6. 页面加载时，优先使用本地存储的语言，无则使用默认语言
        window.addEventListener('DOMContentLoaded', () => {
            const savedLang = localStorage.getItem('selectedLanguage') || 'zh-CN';
            switchLanguage(savedLang);
        });

