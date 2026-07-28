# Свадебный лендинг с интеграцией Telegram

## 🚀 Быстрый старт

### 1. Настройка Telegram бота

1. Откройте Telegram и найдите @BotFather
2. Отправьте команду `/newbot` и следуйте инструкциям
3. После создания бота вы получите токен (например: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Найдите своего бота в Telegram и отправьте ему любое сообщение
5. Перейдите по ссылке: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
6. Найдите в ответе ваш `chat_id`

### 2. Настройка конфигурации

Откройте файл `config.js` и замените:

```javascript
telegram: {
    botToken: "YOUR_BOT_TOKEN_HERE", // Замените на токен вашего бота
    chatId: "YOUR_CHAT_ID_HERE"       // Замените на ваш chat_id
}# my-wedding
# my-wedding
