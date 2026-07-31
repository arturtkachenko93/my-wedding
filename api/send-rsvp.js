// api/send-rsvp.js
export default async function handler(req, res) {
    // CORS заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const data = req.body;
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        
        if (!BOT_TOKEN || !CHAT_ID) {
            throw new Error('Telegram credentials not configured');
        }
        
        const message = formatMessage(data);
        
        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            }
        );
        
        const result = await response.json();
        
        if (result.ok) {
            return res.status(200).json({ success: true });
        } else {
            throw new Error(result.description || 'Telegram API error');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
}

function formatMessage(data) {
    const attendanceEmoji = data.attendance === 'accept' ? '✅' : '❌';
    const attendanceText = data.attendance === 'accept' ? 'Придет 🎉' : 'Не сможет прийти 😔';
    
    let message = `💍 <b>Новый ответ на приглашение!</b>\n\n`;
    message += `${attendanceEmoji} <b>Статус:</b> ${attendanceText}\n`;
    message += `👤 <b>Имя:</b> ${data.firstName} ${data.lastName}\n`;
    message += `📧 <b>Email:</b> ${data.email}\n`;
    message += `📱 <b>Телефон:</b> ${data.phone}\n`;
    
    // Проверяем, что drinks существует и не пуст
    if (data.drinks && data.drinks.length > 0) {
        message += `🍹 <b>Предпочтения по напиткам:</b> ${data.drinks.join(', ')}\n`;
    }
    
    if (data.guests && data.guests.length > 0) {
        message += `\n👥 <b>Гости:</b>\n`;
        data.guests.forEach((guest, i) => {
            message += `  ${i + 1}. ${guest}\n`;
        });
    }
    
    if (data.additionalInfo) {
        message += `\n📝 <b>Дополнительно:</b>\n${data.additionalInfo}`;
    }
    
    message += `\n\n🕐 <i>${new Date().toLocaleString('ru-RU')}</i>`;
    
    return message;
}