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
    weddingDate: "2026-09-09T16:00:00+03:00",
    
    // Локации для карты
    locations: {
        ceremony: {
            name: "Церемония",
            address: "ул. Ленина, 117, Москва",
            lat: 55.7558,
            lng: 37.6173
        },
        party: {
            name: "Банкет",
            address: "ул. Пушкина, 218, Москва",
            lat: 55.7658,
            lng: 37.6273
        }
    },
    
    // Остальные настройки...
    details: {
        date: {
            title: "Дата",
            day: "22 октября",
            dayOfWeek: "Среда"
        },
        time: {
            title: "Время",
            start: "Начало в 16:00",
            end: "Завершение в 23:30"
        },
        location: {
            title: "Локация",
            ceremony: "Церемония — ул. Ленина, 117",
            party: "Банкет — ул. Пушкина, 218"
        }
    },
    
    timeline: [
        {
            time: "16:00",
            title: "Церемония",
            icon: "💒",
            description: "Торжественная церемония бракосочетания"
        },
        {
            time: "17:00",
            title: "Коктейльный час",
            icon: "🥂",
            description: "Легкие закуски и напитки"
        },
        {
            time: "19:00",
            title: "Ужин и тосты",
            icon: "🍽️",
            description: "Праздничный ужин и поздравления"
        },
        {
            time: "20:30",
            title: "Танцы",
            icon: "💃",
            description: "Танцы и веселье до утра"
        }
    ],
    
    dressCode: {
        subtitle: "Дресс-код нашей свадьбы",
        title: "Пожалуйста, приходите в нарядах зеленых или кремовых оттенков и наслаждайтесь праздником вместе с нами!",
        colors: ["кремовый", "зеленый"]
    },
    
    rsvp: {
        subtitle: "Вы придете?",
        title: "Подтверждение присутствия",
        deadline: "Пожалуйста, ответьте до 1 октября",
        question: "Вы приглашены на нашу свадьбу",
        acceptText: "С радостью приду",
        declineText: "К сожалению, не смогу",
        firstNameLabel: "Имя",
        lastNameLabel: "Фамилия",
        emailLabel: "Email",
        phoneLabel: "Телефон",
        addGuestText: "+ Добавить гостя",
        guestNameLabel: "Имя гостя",
        musicQuestion: "Какая музыка заставит вас танцевать?",
        musicOptions: [
            "Латиноамериканская музыка",
            "Поп-музыка",
            "Рок-н-ролл",
            "Ретро-хиты"
        ],
        additionalInfoLabel: "Что-то еще, что нам нужно знать?",
        submitText: "Отправить",
        successTitle: "Спасибо!",
        successMessage: "Ваш ответ успешно отправлен. Ждем вас на нашем празднике!"
    },
    
    navigation: [
        { id: "rsvp", text: "Подтверждение" },
        { id: "timeline", text: "Таймлайн" },
        { id: "dresscode", text: "Дресс-код" },
        { id: "details", text: "Детали" }
    ],
    
    header: {
        subtitle: "Приглашаем вас отпраздновать важный день",
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
        header1: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
        header2: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
        header3: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
        header4: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
        header5: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600",
        rsvp: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600"
    },
    
    telegram: {
        // botToken: "8731889618:AAGMYTjgfLBWkiEcb_1Z0bbe4X0LE6_UM48",
        // chatId: "945337029"
        apiUrl: '/api/send-rsvp'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEDDING_CONFIG;
}