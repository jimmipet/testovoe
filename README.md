Для запуска приложения нужно кланировать репозиторий к себе и выполнить команду 

npm install

Далее нужно в двух разных терминалах выполнить команды 

npm run dev (запсук клиентской части)

npm run server ( запуск сервера)

Или же установить плагины для запсука в одном терминале такие как concurrently, не забыв при этом изменить скрипт дял запсука на соответствующий 
"
 "start": "concurrently \"npm run dev\" \"npm run server\""