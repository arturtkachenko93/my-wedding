const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Маршрут для отправки RSVP в Telegram
app.post('/api/send-rsvp', async (req, res) => {
    try {
        const data = req.body;
        const message = formatTelegramMessage(data);
        
        const telegramUrl = `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`;
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: config.telegram.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const result = await response.json();
        
        if (result.ok) {
            res.json({ success: true });
        } else {
            throw new Error('Telegram API error');
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

function formatTelegramMessage(data) {
    const attendance = data.attendance === 'accept' ? '✅ Придет' : '❌ Не придет';
    const attendanceEmoji = data.attendance === 'accept' ? '🎉' : '😔';
    
    let message = `
${attendanceEmoji} <b>Новый ответ на приглашение!</b>

<b>Статус:</b> ${attendance}
<b>Имя:</b> ${data.firstName} ${data.lastName}
<b>Телефон:</b> ${data.phone}
<b>Предпочитаемая музыка:</b> ${data.music}
`;

    if (data.guests && data.guests.length > 0) {
        message += `\n<b>👥 Гости:</b>\n`;
        data.guests.forEach((guest, index) => {
            message += `  ${index + 1}. ${guest}\n`;
        });
    }
    
    if (data.additionalInfo) {
        message += `\n<b>📝 Дополнительная информация:</b>\n${data.additionalInfo}`;
    }
    
    message += `\n📅 <i>${new Date().toLocaleString('ru-RU')}</i>`;
    
    return message;
}

app.listen(PORT, () => {
    console.log(`Свадебный сайт запущен на http://localhost:${PORT}`);
});