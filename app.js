// Основной JavaScript файл свадебного сайта

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    createParticles();
    populateContent();
    initNavigation();
    initCountdown();
    initForm();
    initMobileMenu();
    initScrollAnimations();
    initMap();
    initScrollToTop();
    initImageOptimization();
    hideLoader();
}

// Создание частиц
function createParticles() {
    const container = document.getElementById('headerParticles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 8 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        container.appendChild(particle);
    }
}

// Заполнение контента из конфига
function populateContent() {
    const config = WEDDING_CONFIG;
    
    // Заголовок
    setText('headerSubtitle', config.header.subtitle);
    document.querySelector('.name-animation').textContent = config.couple.fullNames();
    setText('headerAdditionalText', config.header.additionalText);
    setText('rsvpBtnText', config.header.rsvpBtnText);
    
    // Изображения с оптимизацией
    setOptimizedImage('headerImg1', config.images.header1);
    setOptimizedImage('headerImg2', config.images.header2);
    setOptimizedImage('headerImg3', config.images.header3);
    setOptimizedImage('headerImg4', config.images.header4);
    setOptimizedImage('headerImg5', config.images.header5);
    setOptimizedImage('rsvpImg', config.images.rsvp);
    
    // Детали
    setText('detailDateTitle', config.details.date.title);
    setText('detailDate1', config.details.date.day);
    setText('detailDate2', config.details.date.dayOfWeek);
    setText('detailTimeTitle', config.details.time.title);
    setText('detailTime1', config.details.time.start);
    setText('detailTime2', config.details.time.end);
    setText('detailLocationTitle', config.details.location.title);
    setText('detailLocation1', config.details.location.ceremony);
    setText('detailLocation2', config.details.location.party);
    
    // Таймлайн
    const timelineItems = document.getElementById('timelineItems');
    config.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item reveal';
        timelineItem.setAttribute('data-delay', index * 200);
        timelineItem.innerHTML = `
            <div class="timeline-time">${item.icon} ${item.time}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        timelineItems.appendChild(timelineItem);
    });
    
    // Дресс-код
    setText('dressCodeSubtitle', config.dressCode.subtitle);
    setText('dressCodeTitle', config.dressCode.title);
    
    // RSVP
    setText('rsvpSubtitle', config.rsvp.subtitle);
    setText('rsvpTitle', config.rsvp.title);
    setText('rsvpDeadline', config.rsvp.deadline);
    setText('acceptText', config.rsvp.acceptText);
    setText('declineText', config.rsvp.declineText);
    setText('firstNameLabel', config.rsvp.firstNameLabel);
    setText('lastNameLabel', config.rsvp.lastNameLabel);
    setText('phoneLabel', config.rsvp.phoneLabel);
    setText('addGuestText', config.rsvp.addGuestText);
    setText('musicQuestion', config.rsvp.musicQuestion);
    setText('additionalInfoLabel', config.rsvp.additionalInfoLabel);
    setText('submitText', config.rsvp.submitText);
    setText('successTitle', config.rsvp.successTitle);
    setText('successMessage', config.rsvp.successMessage);
    setText('rsvpNote', config.rsvp.noteText);
    
    // Музыкальные опции
    const musicOptions = document.getElementById('musicOptions');
    config.rsvp.musicOptions.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'radio-label';
        label.innerHTML = `
        <input type="radio" name="music" value="${option}" ${index === 0 ? 'checked' : ''}>
        <span class="radio-custom"></span>
        <span>${option}</span>
    `;
        musicOptions.appendChild(label);
    });
    
    // Навигация
    const navLinks = document.getElementById('navLinks');
    const footerLinks = document.getElementById('footerLinks');
    config.navigation.forEach(item => {
        const link = document.createElement('a');
        link.href = `#${item.id}`;
        link.textContent = item.text;
        navLinks.appendChild(link.cloneNode(true));
        footerLinks.appendChild(link.cloneNode(true));
    });
    
    // Подвал
    setText('footerText', config.footer.text);
    
    // Маршруты
    updateRouteLinks();
}

// Оптимизация изображений
function initImageOptimization() {
    // Добавляем поддержку WebP если браузер поддерживает
    const supportsWebP = document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0;
    
    if (supportsWebP) {
        document.documentElement.classList.add('webp');
    }
}

function setOptimizedImage(id, src) {
    const img = document.getElementById(id);
    if (!img || !src) return;
    
    // Создаем оптимизированное изображение
    const optimizedImg = new Image();
    optimizedImg.onload = function() {
        img.src = src;
    };
    optimizedImg.onerror = function() {
        // Fallback к оригинальному URL
        img.src = src;
    };
    
    // Добавляем параметры оптимизации для Unsplash
    if (src.includes('unsplash.com')) {
        const optimizedSrc = src.includes('?') 
            ? src + '&w=800&q=80&auto=format'
            : src + '?w=800&q=80&auto=format';
        optimizedImg.src = optimizedSrc;
    } else {
        optimizedImg.src = src;
    }
}

// Навигация
function initNavigation() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение навбара при прокрутке
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Показываем/скрываем кнопку скролла наверх
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

// Кнопка скролла наверх
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Обратный отсчет
function initCountdown() {
    console.log('Инициализация таймера...');
    
    const weddingDate = new Date(WEDDING_CONFIG.weddingDate);
    console.log('Дата свадьбы:', weddingDate);
    
    // Проверяем, что дата корректная
    if (isNaN(weddingDate.getTime())) {
        console.error('Ошибка: неверная дата свадьбы в конфиге!');
        return;
    }
    
    // Устанавливаем лейблы
    setText('daysLabel', WEDDING_CONFIG.countdown.labels.days);
    setText('hoursLabel', WEDDING_CONFIG.countdown.labels.hours);
    setText('minutesLabel', WEDDING_CONFIG.countdown.labels.minutes);
    
    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;
        
        console.log('Разница в мс:', diff);
        
        // Если свадьба уже прошла
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            return;
        }
        
        // Вычисляем значения
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Обновляем отображение
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        
        console.log(`Таймер: ${days}д ${hours}ч ${minutes}м ${seconds}с`);
    }
    
    // Запускаем сразу
    updateCountdown();
    
    // Обновляем каждую секунду
    setInterval(updateCountdown, 1000);
}

// Инициализация карты
function initMap() {
    const mapFrame = document.getElementById('map');
    const mapTabs = document.querySelectorAll('.map-tab');
    
    // Координаты из конфига
    const locations = WEDDING_CONFIG.locations;
    let currentLocation = 'ceremony';
    
    mapTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            mapTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentLocation = this.dataset.location;
            loadMap(currentLocation);
        });
    });
    
    function loadMap(location) {
        const loc = locations[location];
        if (!loc) return;
        
        // Используем Яндекс.Карты
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(() => {
                mapFrame.innerHTML = '';
                const map = new ymaps.Map(mapFrame, {
                    center: [loc.lat, loc.lng],
                    zoom: 15
                });
                
                const placemark = new ymaps.Placemark([loc.lat, loc.lng], {
                    hintContent: loc.name,
                    balloonContent: loc.address
                });
                
                map.geoObjects.add(placemark);
            });
        } else {
            // Fallback: Google Maps iframe
            mapFrame.innerHTML = `
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${loc.lng}!3d${loc.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${loc.lat}°N${loc.lng}°E!5e0!3m2!1sru!2sru!4v1234567890"
                    width="100%" 
                    height="400" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>`;
        }
    }
    
    // Загружаем первую карту
    loadMap('ceremony');
}

// Обновление ссылок маршрутов
function updateRouteLinks() {
    const config = WEDDING_CONFIG;
    const ceremonyLoc = config.locations.ceremony;
    const partyLoc = config.locations.party;
    
    // Яндекс.Навигатор
    const routeBtn1 = document.getElementById('routeBtn1');
    const routeBtn2 = document.getElementById('routeBtn2');
    
    if (routeBtn1) {
        routeBtn1.href = `https://yandex.ru/maps/?rtext=~${ceremonyLoc.lat},${ceremonyLoc.lng}&rtt=auto`;
    }
    
    if (routeBtn2) {
        routeBtn2.href = `https://yandex.ru/maps/?rtext=~${partyLoc.lat},${partyLoc.lng}&rtt=auto`;
    }
}

// Форма
function initForm() {
    const form = document.getElementById('rsvpForm');
    const addGuestBtn = document.getElementById('addGuestBtn');
    const guestFields = document.getElementById('guestFields');
    let guestCount = 0;
    
    // Добавление гостя
    addGuestBtn.addEventListener('click', function() {
        guestCount++;
        const guestDiv = document.createElement('div');
        guestDiv.className = 'form-group';
        guestDiv.style.animation = 'fadeInUp 0.5s ease forwards';
        guestDiv.innerHTML = `
            <label class="form-label" for="guest${guestCount}">
                ${WEDDING_CONFIG.rsvp.guestNameLabel} ${guestCount} *
            </label>
            <input type="text" id="guest${guestCount}" name="guest${guestCount}" required 
                   placeholder="Введите имя гостя">
            <button type="button" class="btn-remove-guest" onclick="this.parentElement.remove()">×</button>
        `;
        guestFields.appendChild(guestDiv);
    });
    
    // Отправка формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const formData = new FormData(form);
        const data = {
            attendance: formData.get('attendance'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            music: formData.get('music'),
            additionalInfo: formData.get('additionalInfo'),
            guests: []
        };
        
        // Сбор гостей
        for (let i = 1; i <= guestCount; i++) {
            const guestName = formData.get(`guest${i}`);
            if (guestName) {
                data.guests.push(guestName);
            }
        }
        
        // Отправка данных
        try {
            const response = await sendToTelegram(data);
            if (response.ok) {
                form.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                // Скролл к успешному сообщению
                document.getElementById('formSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте снова.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Отправка в Telegram
async function sendToTelegram(data) {
    try {
        // Отправляем через безопасный API маршрут Vercel
        const response = await fetch(WEDDING_CONFIG.telegram.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            return response;
        }
        
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка отправки');
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        throw error;
    }
}

// Форматирование сообщения
function formatTelegramMessage(data) {
    const attendanceEmoji = data.attendance === 'accept' ? '✅' : '❌';
    const attendanceText = data.attendance === 'accept' ? 'Придет 🎉' : 'Не сможет прийти 😔';
    
    let message = `
💍 <b>Новый ответ на приглашение!</b>

${attendanceEmoji} <b>Статус:</b> ${attendanceText}
👤 <b>Имя:</b> ${data.firstName} ${data.lastName}
📱 <b>Телефон:</b> ${data.phone}
🎵 <b>Музыка:</b> ${data.music}
`;

    if (data.guests.length > 0) {
        message += `\n👥 <b>Гости:</b>\n`;
        data.guests.forEach((guest, index) => {
            message += `  ${index + 1}. ${guest}\n`;
        });
    }
    
    if (data.additionalInfo) {
        message += `\n📝 <b>Дополнительно:</b>\n${data.additionalInfo}`;
    }
    
    message += `\n\n🕐 <i>${new Date().toLocaleString('ru-RU')}</i>`;
    
    return message;
}

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('#navLinks a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Закрытие по клику вне меню
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с классом reveal
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

// Вспомогательные функции
function setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

// Скрытие загрузчика
function hideLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const mainContent = document.getElementById('main-content');
        
        loader.style.opacity = '0';
        mainContent.style.opacity = '1';
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
}