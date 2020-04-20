# Іmmersive Videoconferencing System

Майбутнє відеоконференцзв'язку - інтеграція з технологіями віртуальної реальності, в першу чергу 3D-візуалізації. На зміну особистим діловим зустрічам прийдуть вже не відеосеанси, нехай і з ефектом присутності, а віртуальні телепортації.

Тривимірна відеоконференція, що забезпечує імерсивну присутність і природне уявлення всіх учасників в загальному віртуальному просторі для нарад, що підвищує якість спілкування, орієнтованого на людину. Ця система заснована на принципі загальної віртуальної настільного середовища, яка гарантує правильний зоровий контакт і відтворення жестів.

## Стек технологій

##### Серверна частина

- [Node.js](https://nodejs.org/en/ "Node.js")
- [WebSocket](https://www.npmjs.com/package/ws "WebSocket")

##### Клієнтська частина

- [HTML5](https://www.w3.org/TR/html52/ "HTML5")
- [SASS](https://sass-lang.com/ "SASS")
- [React](https://reactjs.org/ "React 16.8")
- [Webpack](https://webpack.js.org/ "Webpack")

## Технічні вимоги

- Операційна система: [Ubuntu](https://ubuntu.com/ "Ubuntu") (версія від [16.04 LTS](http://releases.ubuntu.com/16.04/ "16.04 LTS"))
- [Node.js v12](https://nodejs.org/dist/v12.16.2/ "Node.js v12.16.2 (Остання версія на момент написання документації)")
- Рекомендований браузер: [Google Chrome](https://www.google.com/intl/ru/chrome/ "Google Chrome")

## Особливості реалізації

##### Серверна частина

Сервер необхідний для обміну повідомленнями між клієнтами.

##### Клієнтська частина

Клієнтська частина написана за допомогою бібліотеки React з використанням хуків (Hooks).

Але головним в цій частині є [модуль для відеоконференцзв'язку](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js).

Він забезпечує [підключення до серверу](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js#L7) та [створення з'єднання](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js#L85) для передачі відео та аудіо. А також він [створює локальний та віддалений відео- та аудіо-потоки](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js#L9-L10), які можна вивести на єкран користувача.

Цей модуль використовує обгортки ([менеджери](https://github.com/LobovVitaliy/immersive-videoconferencing-system/tree/master/client/src/skype/utils)) над звичайними класами мови JavaScript, які доступні в браузері:

- **rtc-peer-connection-manager.js** - менеджер для з'єднання WebRTC між локальним комп'ютером та віддаленим одноранговим сервером.

- **stream-manager.js** - менеджер для створення, відпраки та зупинки потоку.

- **web-socket-manager.js** - менеджер для взаємодії з сервером.

Особливістю даного модулю є те, що він може використовуватися як окрема частина. Це досягається тим, що цей модуль [приймає обробник](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js#L173), який викликається при зміні стану системи. Таким чином система повідомляє клієнту про наступні [події](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js#L166):

1. **CALLING** - вхідний виклик
2. **SET_REMOTE_STREAM** - установка віддаленого потоку
3. **SET_LOCAL_STREAM** - установка локального потоку
4. **STOPPED** - завершення виклику

Основною частиною модулю є WebRTC взаємодія:

1. При виклику [створюється](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js#L20) екземпляр [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) для першого користувача.
   ```javascript
   async call(cameraId) {
     this.initRTCPeerConnection();
     ...
   }
   ```

2. Коли другий користувач відповідає для нього [створюєтсья](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/master/client/src/skype/index.js#L26) свій власний екземпляр [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection).
   ```javascript
   async reply(cameraId) {
     this.initRTCPeerConnection();
     ...
   }
   ```

3. Після створення RTCPeerConnection для першого користувача [відбувається ініціалізації виклику](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/5a00d93e94855012857631a94507e701be637fc0/client/src/skype/index.js#L22) та відправлення запиту другому користвачу.
   ```javascript
   async call(cameraId) {
     ...
     await this.connect('offer-request', cameraId);
   }
   ```

4. Після отримання цього запиту, другий користувач [реагує на виклик](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/5a00d93e94855012857631a94507e701be637fc0/client/src/skype/index.js#L28) та [відправляє у відповідь](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/5a00d93e94855012857631a94507e701be637fc0/client/src/skype/index.js#L29) свій запит першому користувачу.
   ```javascript
   async reply(cameraId) {
     ...
     await this.accept(this.state.request.data);
     await this.connect('offer-response', cameraId);
   }
   ```

Таким чином вони знайомляться один з одним та обмінюються медіа потоками, які оброблюються в спеціальному [обробнику](https://github.com/LobovVitaliy/immersive-videoconferencing-system/blob/5a00d93e94855012857631a94507e701be637fc0/client/src/skype/index.js#L87).
```javascript
initRTCPeerConnection() {
  ...
  this.pc.addEventListener('track', (event) => {
    this.remoteStreamManager.setStream(event.streams[0]);

    this.notify({
      type: SKYPE_EVENTS.SET_REMOTE_STREAM,
      data: {
        stream: event.streams[0],
      },
    });
  });
}
```

Більш детально як налаштувати WebRTC взаємодію можна ознайомитись за цим [посиланням](https://developer.mozilla.org/ru/docs/Web/API/WebRTC_API/WebRTC_basics).

## Керівництво користувача

Для початку роботи з даною програмою необхідно відкрити консоль та виконати ряд дій:

1. Скопіювати проект, виконавши команду:
   ```sh
   git clone https://github.com/LobovVitaliy/immersive-videoconferencing-system.git
   ```

2. Далі прейти в папки:  **server** і **client** та виконати команду:
   ```sh
   npm install
   ```
   **Примітка:** дану команду необхідно виконувати тільки перед першим користуванням системою

3. Для запуску сервера необхідно виконати команду:
   ```sh
   npm start
   ```
   Ця команда запустить сервер, але для того, щоб до цього сервера міг приєднатися інший користувач необхідно виконати [команду](https://localhost.run/), яка робить сервер публічним:
   ```sh
   ssh -R 80:localhost:8081 ssh.localhost.run
   ```
   **Примітка:** якщо через деякий час сервер стає недоступним - необхідно повторно виконати дану команду.

   Дана команда генерує адресу сервера, яку необхідно буде скопіювати (без **http://**):

   ![server-address](https://user-images.githubusercontent.com/14150731/79741386-d6ce2580-8309-11ea-8593-eb735e31223a.png)

4. Для запуску клієнта необхідно виконати команду:
   ```sh
   npm start
   ```

Далі для коритування системою необхідно ввести в браузері адресу: `localhost:8080`, а потім:

1. Ввести скопійовану адресу сервера:

   ![image](https://user-images.githubusercontent.com/14150731/79745628-57dceb00-8311-11ea-9bf3-be2eda021348.png)

2. Вибрати камеру:

   ![image](https://user-images.githubusercontent.com/14150731/79746578-e30ab080-8312-11ea-854e-ca59e076205b.png)

   **Примітка:** змінювати камеру також можливо під час конференції.

3. Далі необхідно вибрати режим зв'язку **2D** або **3D**:

   ![image](https://user-images.githubusercontent.com/14150731/79746397-9b842480-8312-11ea-90ab-b5f4abb2fc49.png)

   ![image](https://user-images.githubusercontent.com/14150731/79746443-afc82180-8312-11ea-9595-46e2c7a0a69c.png)

   **Примітка:** за замовчування вибран режим **2D**.

   **Примітка:** змінювати режим також можливо під час конференції.

4. Після чого користувач може здійснити виклик, прийняти або відмінити виклик іншого користувача та змінити камеру.

Для використання розширених можливостей системи користувач може змінити налаштування [хромакею](https://en.wikipedia.org/wiki/Chroma_key):

![image](https://user-images.githubusercontent.com/14150731/79747836-0df60400-8315-11ea-84fd-0785a275d9b3.png)

Користувачу надаєтсья можливість змінювати колір, який буде видалятись, та чутливість сприйняття цього кольору.

**Примітка:** хоча дані налаштування можливо робити із обох режимів, рекомендуєтсья налаштовувати їх в режимі **2D**.

А у режимі **3D** також додаєтсья можливість вибору розміру 3D-призми:

![image](https://user-images.githubusercontent.com/14150731/79748216-b906bd80-8315-11ea-9068-e1eaec967953.png)

Для того щоб побачити співрозмовника в об'ємнову вигляді необхідно:

1. Налаштувати хромакей.

2. Перейти в режим **3D**.

3. Розмістити екран у горизонтальному положенні.

4. Поставити на нього прозору 3D-призму таким чином, щоб звужена частина знаходилась на екрані (була основою), а розширена була напрямлена угору.

5. Після чого можна підібрати розмір 3D-призми, за допомогою повзунка праворуч, при ввімкнених налаштуваннях.

Виконавши всі попередні кроки Ви отримаєте об'ємне зображення в призмі:

![image](https://user-images.githubusercontent.com/14150731/79751404-34b73900-831b-11ea-9cd2-6d0973683cf6.png)

## Команда розробників

| <a href="https://github.com/LobovVitaliy"><img alt="LobovVitaliy" src="https://avatars3.githubusercontent.com/u/14150731?s=400&u=d61585f867f1dc103dbed985558af01eacbae467&v=4" width="100"></a> | <a href="https://github.com/AlexandraPV"><img alt="AlexandraPV" src="https://avatars3.githubusercontent.com/u/14141164?s=400&v=4" width="100"></a> | <a href="https://github.com/vitalik296"><img alt="vitalik296" src="https://avatars0.githubusercontent.com/u/14151824?s=400&v=4" width="100"></a> |
| :------------: | :------------: | :------------: |
| [Лобов Віталій](https://github.com/LobovVitaliy "LobovVitaliy") | [Пивоварчук Олександра ](https://github.com/AlexandraPV "AlexandraPV") | [Захарченко Віталій](https://github.com/vitalik296 "vitalik296") |
