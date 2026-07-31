function formatMessage(data) {
    if (data.attendance === 'decline') {
        return `💍 <b>Новый ответ на приглашение!</b>\n\n❌ <b>Статус:</b> Не сможет прийти 😔\n\n🕐 <i>${new Date().toLocaleString('ru-RU')}</i>`;
    }
    
    let message = `💍 <b>Новый ответ на приглашение!</b>\n\n`;
    message += `✅ <b>Статус:</b> Придет 🎉\n`;
    message += `👤 <b>Имя:</b> ${data.firstName} ${data.lastName}\n`;
    message += `📧 <b>Email:</b> ${data.email}\n`;
    message += `📱 <b>Телефон:</b> ${data.phone}\n`;
    
    if (data.drinks && data.drinks.length > 0) {
        message += `🍹 <b>Предпочтения по напиткам:</b> ${data.drinks.join(', ')}\n`;
    }
    if (data.guests && data.guests.length > 0) {
        message += `\n👥 <b>Гости:</b>\n`;
        data.guests.forEach((guest, i) => message += `  ${i + 1}. ${guest}\n`);
    }
    if (data.additionalInfo) {
        message += `\n📝 <b>Дополнительно:</b>\n${data.additionalInfo}`;
    }
    message += `\n\n🕐 <i>${new Date().toLocaleString('ru-RU')}</i>`;
    return message;
}