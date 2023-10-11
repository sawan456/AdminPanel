require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN_ID;

const bot = new TelegramBot(BOT_TOKEN, {polling:true});

bot.on("message", async(msg)=>{
    const userId = msg.chat.id;
    const userInput = msg.text;

    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${WEATHER_API_ID}`
        );
        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const city = data.name;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;
    
        bot.sendMessage(userId, message);
      } catch (error) {
        bot.sendMessage(userId, "City doesn't exist.");
      }

});