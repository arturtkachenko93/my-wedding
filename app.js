// Основной JavaScript файл свадебного сайта

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
    
    setText('headerSubtitle', config.header.subtitle);
    // Исправлено: fullNames – строка, не функция
    document.querySelector('.name-animation').textContent = config.couple.fullNames();
    setText('headerAdditionalText', config.header.additionalText);
    setText('rsvpBtnText', config.header.rsvpBtnText);
    
    setOptimizedImage('headerImg1', config.images.header1);
    setOptimizedImage('headerImg2', config.images.header2);
    setOptimizedImage('headerImg3', config.images.header3);
    setOptimizedImage('headerImg4', config.images.header4);
    setOptimizedImage('headerImg5', config.images.header5);
    setOptimizedImage('rsvpImg', config.images.rsvp);
    
    setText('detailDateTitle', config.details.date.title);
    setText('detailDate1', config.details.date.day);
    setText('detailDate2', config.details.date.dayOfWeek);
    setText('detailTimeTitle', config.details.time.title);
    setText('detailTime1', config.details.time.start);
    setText('detailTime2', config.details.time.end);
    setText('detailLocationTitle', config.details.location.title);
    setText('detailLocation1', config.details.location.ceremony);
    setText('detailLocation2', config.details.location.party);
    
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
    
    setText('dressCodeSubtitle', config.dressCode.subtitle);
    setText('dressCodeTitle', config.dressCode.title);
    
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
    
    const musicOptions = document.getElementById('musicOptions');
    musicOptions.innerHTML = '';
    config.rsvp.musicOptions.forEach((option) => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `
            <input type="checkbox" name="drinks" value="${option}">
            <span class="checkbox-custom"></span>
            <span>${option}</span>
        `;
        musicOptions.appendChild(label);
    });
        
    const navLinks = document.getElementById('navLinks');
    const footerLinks = document.getElementById('footerLinks');
    config.navigation.forEach(item => {
        const link = document.createElement('a');
        link.href = `#${item.id}`;
        link.textContent = item.text;
        navLinks.appendChild(link.cloneNode(true));
        footerLinks.appendChild(link.cloneNode(true));
    });
    
    setText('footerText', config.footer.text);
    updateRouteLinks();
}

// Оптимизация изображений
function initImageOptimization() {
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
    const optimizedImg = new Image();
    optimizedImg.onload = function() { img.src = src; };
    optimizedImg.onerror = function() { img.src = src; };
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
        else scrollTopBtn.classList.remove('visible');
    });
}

function initScrollToTop() {
    document.getElementById('scrollTopBtn').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Таймер (исправлен: добавлены секунды и защита от отсутствия элементов)
function initCountdown() {
    const weddingDate = new Date(WEDDING_CONFIG.weddingDate);
    if (isNaN(weddingDate.getTime())) return;
    setText('daysLabel', WEDDING_CONFIG.countdown.labels.days);
    setText('hoursLabel', WEDDING_CONFIG.countdown.labels.hours);
    setText('minutesLabel', WEDDING_CONFIG.countdown.labels.minutes);
    setText('secondsLabel', WEDDING_CONFIG.countdown.labels.seconds);  // добавлено
    
    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        
        if (!daysEl || !hoursEl || !minutesEl ) return;   // защита
        
        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Карта
function initMap() {
    const mapFrame = document.getElementById('map');
    const mapTabs = document.querySelectorAll('.map-tab');
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
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(() => {
                mapFrame.innerHTML = '';
                const map = new ymaps.Map(mapFrame, { center: [loc.lat, loc.lng], zoom: 15 });
                map.geoObjects.add(new ymaps.Placemark([loc.lat, loc.lng], {
                    hintContent: loc.name, balloonContent: loc.address
                }));
            });
        } else {
            mapFrame.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${loc.lng}!3d${loc.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${loc.lat}°N${loc.lng}°E!5e0!3m2!1sru!2sru!4v1234567890" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
        }
    }
    loadMap('ceremony');
}

function updateRouteLinks() {
    const config = WEDDING_CONFIG;
    const ceremonyLoc = config.locations.ceremony;
    const partyLoc = config.locations.party;
    const routeBtn1 = document.getElementById('routeBtn1');
    const routeBtn2 = document.getElementById('routeBtn2');
    if (routeBtn1) routeBtn1.href = `https://yandex.ru/maps/?rtext=~${ceremonyLoc.lat},${ceremonyLoc.lng}&rtt=auto`;
    if (routeBtn2) routeBtn2.href = `https://yandex.ru/maps/?rtext=~${partyLoc.lat},${partyLoc.lng}&rtt=auto`;
}

// Вспомогательные функции для ошибок
function showRadioError(name, message) {
    const radio = document.querySelector(`input[name="${name}"]`);
    if (!radio) return;
    const container = radio.closest('.radio-group, .form-group');
    if (!container) return;
    showErrorInContainer(container, message);
}

function showCheckboxError(name, message) {
    const container = document.getElementById('musicOptions');
    if (!container) return;
    showErrorInContainer(container, message);
}

function showTextError(fieldName, message) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (!input) return;
    const container = input.closest('.form-group');
    if (!container) return;
    showErrorInContainer(container, message);
}

function showErrorInContainer(container, message) {
    let errorEl = container.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        container.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function setupPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    phoneInput.value = '+7';

    phoneInput.addEventListener('keydown', function(e) {
        const key = e.key;
        const cursorPos = this.selectionStart;
        const prefix = '+7';
        const digits = this.value.substring(prefix.length).replace(/\D/g, '');

        if ((key === 'Backspace' || key === 'Delete') && cursorPos <= prefix.length) {
            e.preventDefault();
            return;
        }

        if (key === 'Backspace') {
            e.preventDefault();
            const before = digits.substring(0, cursorPos - prefix.length - 1);
            const after = digits.substring(cursorPos - prefix.length);
            this.value = prefix + before + after;
            this.setSelectionRange(prefix.length + before.length, prefix.length + before.length);
            clearPhoneErrorIfValid();
            return;
        }

        if (key === 'Delete') {
            e.preventDefault();
            const before = digits.substring(0, cursorPos - prefix.length);
            const after = digits.substring(cursorPos - prefix.length + 1);
            this.value = prefix + before + after;
            this.setSelectionRange(prefix.length + before.length, prefix.length + before.length);
            clearPhoneErrorIfValid();
            return;
        }

        if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'].includes(key)) return;

        if (/^\d$/.test(key)) {
            e.preventDefault();
            const before = digits.substring(0, cursorPos - prefix.length);
            const after = digits.substring(cursorPos - prefix.length);
            let newDigits = before + key + after;
            newDigits = newDigits.substring(0, 10);
            this.value = prefix + newDigits;
            this.setSelectionRange(prefix.length + before.length + 1, prefix.length + before.length + 1);
            clearPhoneErrorIfValid();
        } else {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('input', function() {
        let value = this.value;
        let digits = value.replace(/[^\d]/g, '').substring(0, 10);
        const newValue = '+7' + digits;
        if (this.value !== newValue) {
            const cursorPos = this.selectionStart;
            this.value = newValue;
            const adjustedPos = Math.min(cursorPos, newValue.length);
            this.setSelectionRange(adjustedPos, adjustedPos);
        }
        clearPhoneErrorIfValid();
    });

    phoneInput.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedData = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pastedData.replace(/[^\d]/g, '').substring(0, 10);
        this.value = '+7' + digits;
        this.setSelectionRange(this.value.length, this.value.length);
        clearPhoneErrorIfValid();
    });

    function clearPhoneErrorIfValid() {
        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (phoneDigits.length === 11) {
            phoneInput.classList.remove('error');
            const container = phoneInput.closest('.form-group');
            if (container) {
                const err = container.querySelector('.error-message');
                if (err) err.remove();
            }
        }
    }
}
// Форма
function initForm() {
    const form = document.getElementById('rsvpForm');
    const rsvpFields = document.getElementById('rsvpFields');
    const addGuestBtn = document.getElementById('addGuestBtn');
    const guestFields = document.getElementById('guestFields');

    let guestCount = 0;
    setupPhoneMask();
    // Собираем все обязательные поля внутри rsvpFields для управления required
    const requiredInputs = rsvpFields.querySelectorAll('input[required], textarea[required]');
    
    // Обработчик переключения "приду/не приду"
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const isDecline = this.value === 'decline';
            
            // Скрываем/показываем весь блок дополнительных полей
            rsvpFields.style.display = isDecline ? 'none' : '';
            
            // Управляем атрибутом required: при отказе убираем, при принятии возвращаем
            requiredInputs.forEach(input => {
                if (isDecline) {
                    input.removeAttribute('required');
                } else {
                    input.setAttribute('required', '');
                }
            });
            
            // Очищаем значения скрытых полей (только не firstName и lastName)
            if (isDecline) {
                form.querySelectorAll('#rsvpFields input, #rsvpFields textarea').forEach(el => {
                    if (el.name === 'firstName' || el.name === 'lastName') return;
                    if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
                    else {
                        if (el.name === 'phone') el.value = '+7';
                        else el.value = '';
                    }
                });
                clearErrors();
            }
        });
    });
    
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
        clearErrors();
        
        const formData = new FormData(form);
        const attendance = formData.get('attendance');
        
        // Если отказ – отправляем только имя и фамилию, без валидации
        if (attendance === 'decline') {
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            const data = {
                attendance: 'decline',
                firstName: (formData.get('firstName') || '').trim(),
                lastName: (formData.get('lastName') || '').trim(),
                phone: '',
                drinks: [],
                additionalInfo: '',
                guests: []
            };
            
            try {
                const response = await sendToTelegram(data);
                if (response.ok) {
                    // Устанавливаем иконку и текст для отказа
                    const successIcon = document.getElementById('successIcon');
                    const successTitle = document.getElementById('successTitle');
                    const successMessage = document.getElementById('successMessage');
                    successIcon.src = 'https://alfabank.servicecdn.ru/icons/emoji/72/face_sad.png';
                    successIcon.alt = 'Грустный смайлик';
                    successTitle.textContent = 'Ваш ответ отправлен';
                    successMessage.textContent = 'Очень жаль, что у вас не получится разделить праздник с нами';

                    form.style.display = 'none';
                    document.getElementById('formSuccess').style.display = 'block';
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
            return;
        }
        
        // Для принявших – полная валидация
        const drinks = formData.getAll('drinks');
        let isValid = true;
        
        if (!attendance) {
            showRadioError('attendance', 'Пожалуйста, выберите вариант');
            isValid = false;
        }
        if (drinks.length === 0) {
            showCheckboxError('drinks', 'Пожалуйста, выберите хотя бы один напиток');
            isValid = false;
        }
        
        // Безопасное получение значений (защита от null)
        const firstName = (formData.get('firstName') || '').trim();
        const lastName = (formData.get('lastName') || '').trim();
        const phone = (formData.get('phone') || '').trim();
        
        // Проверка, что в телефоне ровно 11 цифр (7 + 10 цифр номера)
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length !== 11) {
            showTextError('phone', 'Введите номер телефона полностью (10 цифр после +7)');
            document.getElementById('phone').focus();
            document.getElementById('phone').scrollIntoView({ behavior: 'smooth', block: 'center' });
            isValid = false;
        }
        
        if (!firstName) { showTextError('firstName', 'Обязательное поле'); isValid = false; }
        if (!lastName) { showTextError('lastName', 'Обязательное поле'); isValid = false; }
        if (!phone) { showTextError('phone', 'Обязательное поле'); isValid = false; }
        
        if (!isValid) return;
        
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const data = {
            attendance,
            firstName,
            lastName,
            phone,
            drinks,
            additionalInfo: (formData.get('additionalInfo') || '').trim(),
            guests: []
        };
        
        for (let i = 1; i <= guestCount; i++) {
            const guestName = formData.get(`guest${i}`);
            if (guestName && guestName.trim()) {
                data.guests.push(guestName.trim());
            }
        }
        
        try {
            const response = await sendToTelegram(data);
            if (response.ok) {
                // Устанавливаем иконку и текст для принятия
                const successIcon = document.getElementById('successIcon');
                const successTitle = document.getElementById('successTitle');
                const successMessage = document.getElementById('successMessage');
                successIcon.src = 'https://alfabank.servicecdn.ru/icons/emoji/72/face_smiling-heart-eyes.png';
                successIcon.alt = 'Сердечки';
                successTitle.textContent = WEDDING_CONFIG.rsvp.successTitle;
                successMessage.textContent = WEDDING_CONFIG.rsvp.successMessage;

                form.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
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
    const response = await fetch(WEDDING_CONFIG.telegram.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка отправки');
    }
    return response;
}

// Мобильное меню, анимации, утилиты – без изменений
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    document.querySelectorAll('#navLinks a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => entry.target.classList.add('visible'), delay);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function setText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

function hideLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const mainContent = document.getElementById('main-content');
        loader.style.opacity = '0';
        mainContent.style.opacity = '1';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1500);
}