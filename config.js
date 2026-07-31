const WEDDING_CONFIG = {
    // Основная информация
    couple: {
        name1: "Артур",
        name2: "Татьяна",
        fullNames: function() {
            return `${this.name1} и ${this.name2}`
        }
    },
    
    // Дата и время свадьбы
    weddingDate: "2026-09-09T15:00:00+03:00",
    
    // Локации для карты
    locations: {
        ceremony: {
            name: "Банкет",
            address: "Юбилейный проспект, 23В, Реутов",
            lat: 55.749719,
            lng: 37.861788
        },
        party: {
            name: "Банкет",
            address: "Юбилейный проспект, 23В, Реутов",
            lat: 55.749719,
            lng: 37.861788
        }
    },
    
    // Остальные настройки...
    details: {
        date: {
            title: "Дата",
            day: "09 сентября 2026",
            dayOfWeek: "Среда"
        },
        time: {
            title: "Время",
            start: "Начало в 15:00",
            end: "Завершение в 22:30"
        },
        location: {
            title: "Локация",
            party: "Свадебный ужин — г. Реутов, ул. Юбилейный проспект, 23В, ресторан «Дюна»"
        }
    },
    
    timeline: [
        {
            time: "15:00",
            title: "Сбор гостей",
            icon: "🥂",
            description: "Приветственный фуршет и сбор гостей"
        },
        {
            time: "16:00",
            title: "Ужин и тосты",
            icon: "🍽️",
            description: "Начало свадебного ужина"
        },
        {
            time: "20:30",
            title: "Свадебный торт",
            icon: "🎂",
            description: "Время сладких традиций"
        },
        {
            time: "22:30",
            title: "Завершение вечера",
            icon: "💃",
            description: "Объятия на прощание"
        }
    ],
    
    dressCode: {
        subtitle: "Дресс-код нашей свадьбы",
        title: "Мы будем рады, если вы поддержите цветовую гамму нашей свадьбы в своих нарядах!\n\nПрекрасных дам мы просим обратить внимание на нюдовые оттенки розового, желтого и голубого!\n\nДля мужчин отличным выбором станут костюмы или детали образа в серой, классической черной или темно-зеленой гамме.\n\nСовсем не обязательно одеваться строго в эти цвета, но нам будет очень приятно видеть эти нотки в ваших образах!",
        colors: ["розовый", "желтый", "голубой"]
    },
    
    rsvp: {
        subtitle: "Вы придете?",
        title: "Подтверждение присутствия",
        deadline: "Пожалуйста, ответьте до 15 августа",
        question: "Вы приглашены на нашу свадьбу",
        acceptText: "С радостью приду",
        declineText: "К сожалению, не смогу",
        firstNameLabel: "Имя",
        lastNameLabel: "Фамилия",
        phoneLabel: "Телефон",
        addGuestText: "+ Добавить гостя (можно добавить несколько человек)",
        guestNameLabel: "Имя гостя",
        musicQuestion: "Какой напиток вы предпочтёте на нашем празднике? (можно выбрать несколько вариантов)",
        musicOptions: [
            "Водка",
            "Ром",
            "Вино сух",
            "Вино п/сл",
            "Шампанское",
            "Не пью алкоголь"
        ],
        additionalInfoLabel: "Что-то еще, что нам нужно знать?",
        submitText: "Отправить",
        successTitle: "Спасибо!",
        successMessage: "Ваш ответ успешно отправлен. Ждем вас на нашем празднике!",
        noteText: "❣️ Пожалуйста, обратите внимание, что наше свадебное торжество пройдет в формате закрытого ужина для взрослых. Просим вас заранее позаботиться о том, с кем останутся ваши дети на время праздника. Это позволит вам полноценно отдохнуть и насладиться праздником вместе с нами! Благодарим за понимание 🫶🏻",
    },
    
    navigation: [
        { id: "rsvp", text: "Подтверждение" },
        { id: "timeline", text: "Таймлайн" },
        { id: "dresscode", text: "Дресс-код" },
        { id: "details", text: "Детали" }
    ],
    
    header: {
        subtitle: "Мы рады пригласить вас на торжество, посвященное нашему бракосочетанию",
        additionalText: "И так начинается приключение",
        rsvpBtnText: "Подтвердить участие"
    },
    
    countdown: {
        labels: {
            days: "Дней",
            hours: "Часов",
            minutes: "Минут",
            seconds: "Секунд"
        }
    },
    
    footer: {
        text: "С нетерпением ждем встречи с вами! 💚"
    },
    
    colors: {
        primary: "#A7B3A3",
        secondary: "#F5F0E8",
        accent: "#8B9D83",
        accentDark: "#6B7B63",
        text: "#4A4A4A",
        cream: "#F5F0E8",
        green: "#A7B3A3"
    },
    
    images: {
        header1: "https://sun9-86.vkuserphoto.ru/s/v1/ig2/ReGLUYevnJr3hufuL_vD9pnA7cS6bEOmNyvecGdFhDEjlaNUOINgqpp7oWkTswjLNxwZIn7DrNdUv6HPNG2WhWX4.jpg?quality=95&as=32x38,48x58,72x86,108x130,160x192,240x288,360x432,480x576,540x648,640x768,720x865,1066x1280&from=bu&u=IgseGegEa3IJtLaYDWfnoUs66j1HHzondekmdxRwqpk&cs=1066x0",
        header2: "https://sun9-1.vkuserphoto.ru/s/v1/ig2/va2bn8yOJGDuFPUe0kwNQpJ0_UPHN4F69SB5mPB_X1Uz9xYqBgDNeznw6kOUJVPM28gA13mWQ-fzd7UEdmjpoCrL.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=aCorGtYDfGQuK8XLH5fCovQnF9A26Nn9hKHo8SlOH98&cs=960x0",
        header3: "https://sun9-39.vkuserphoto.ru/s/v1/ig2/FrZl6sl2Jh_IwoJRPcrFj86J6xbWa8-tG98vGwm2vCOeaircJcd6lFV3Atwp2VhdxDA-FxmeDfSDju2oZUtgd5Wv.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=n6q2BrFBXMMBWR6samBRcTGILqMaQAsrS218B0WtI8o&cs=960x0",
        header4: "https://sun9-58.vkuserphoto.ru/s/v1/ig2/zZ6Ws34w94oscLD8OcZtuwlw1ZivchdLsptPygeO0VYmovQn9tM1ZRntnGgzfHfsEVYzMDH-m9t545BeiHQv9zHl.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=SBooXtjw5EGbnMNsCVCKRCF_sfUSFgoSRI-I6uVGLlE&cs=960x0",
        header5: "https://sun9-71.vkuserphoto.ru/s/v1/ig2/Mw5oppqYRARxVbYi0oX1PSBxs_FCxTcR70vRZXyBkimaOoYOHWKwX8g4cVl11znTZdI4zPNAQo1MqlwerdFMu9sJ.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&cs=960x0",
        rsvp: "https://sun9-6.vkuserphoto.ru/s/v1/ig2/4DmBlZndAle_W2RpRJVvSGw0k-Icm2luBafqPO6EfyNbYFSYHIaGE-pTEFveKX8f3-hhCF6MGdrwgg6kt6upk28-.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&cs=960x0"
    },
    
    telegram: {
        apiUrl: '/api/send-rsvp'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEDDING_CONFIG;
}
