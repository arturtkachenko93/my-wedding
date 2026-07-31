export default async function handler(req, res) {
    // CORS
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
        const data = req.body || {};

        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Telegram credentials not configured');
            return res.status(500).json({ error: 'Server configuration error' });
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

        if (!result.ok) {
            console.error('Telegram API error:', result.description);
            return res.status(500).json({ error: result.description || 'Telegram API error' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Server error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function formatMessage(data) {
    // Если отказ – короткое сообщение
    if (data.attendance === 'decline') {
        let message = `💍 <b>Новый ответ на приглашение!</b>\n\n`;
        message += `❌ <b>Статус:</b> Не сможет прийти 😔\n`;
        if (data.firstName || data.lastName) {
            message += `👤 <b>Имя:</b> ${data.firstName || ''} ${data.lastName || ''}\n`;
        }
        message += `🕐 <i>${new Date().toLocaleString('ru-RU')}</i>`;
        return message;
    }

    // Полное сообщение для тех, кто придет (без email)
    let message = `💍 <b>Новый ответ на приглашение!</b>\n\n`;
    message += `✅ <b>Статус:</b> Придет 🎉\n`;
    message += `👤 <b>Имя:</b> ${data.firstName || ''} ${data.lastName || ''}\n`;
    message += `📱 <b>Телефон:</b> ${data.phone || ''}\n`;

    if (data.drinks && Array.isArray(data.drinks) && data.drinks.length > 0) {
        message += `🍹 <b>Предпочтения по напиткам:</b> ${data.drinks.join(', ')}\n`;
    }

    if (data.guests && Array.isArray(data.guests) && data.guests.length > 0) {
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