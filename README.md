## Что это?
Тестовое задание, которое получил года полтора назад от одной из компаний. Генерится некая последовательность, которую нужно повторить. С каждым уровнем последовательность увеличивается.
[Демка лежит тут](https://maliyshock.github.io/simon-says/)  

## История
Тестовое тогда я не сделал, потомучто меня взяли в skyeng а дальше я пошел на фриланс, т.е. в нем не было. Но идея мне понравилась, решил сделать, когда появится время. 
Собственно время появилось. Подошел к процессу творчески. [Сделал дизайн](https://www.figma.com/file/ZtcN0rrvut6hM25bss04KxWw/Simon-Says)
и реализовал логику.

## Что есть интересного? Что использовал?
Помимо дизайна - React/Redux из очевидного. По сути это мой второй опыт с реактом, и первый с редаксом. Уже сейчас вижу массу моментов которые надо рефакторить и оптимизировать. Например с редьюсером творится черт знает что. Добавить сюда saga и typescript для красоты, оптимизировать работу со стейтом и т.д. 
Мне хотелось заюзать мердж, и вообще цель была пообучаться, поразбираться в процессе разработки, как тут и что устроено. Разумеется о бест практис и элегантном коде речи не идет, но он уже не такой грязный как был в [проекте с менеджером задач](https://maliyshock.github.io/goals/)

Прикрутил сюда роутинг, но так и не нашел ему применения, все было проще делать через пропсы. Почему? Потомучто хотелось иметь плавный переход между экранами, а не ренерить другой контейнер, а значит нужно было положить все в один (ну или я чего-то не знаю).

Вообще есть сомнения по поводу целесообразности редакса для этого проекта. Есть ощущение, что он здесь добавляет сложности и можно обойтись без него. Но таково было задание + хотелось поразбираться.

Есть загрузчик ассетов, а именно музыкальных файлов, по загрузки которых приложение становится доступным. Работает все довольно быстро так что он промелькивает в самом начале, но если файлы будут тяжелее, или скорость соединения медленнее, то на него можно будет полюбоваться. 

Есть хот кеи для кнопок, они появляются при наведении.


## Задумки на будущее (еще не реализованно)
В процессе я понял, что игра получается довольно простой и скучной, и я подумал это исправить. Появилась идея сделать из всего dubstep hero (это как guitar hero, только с дабстепом =)

Я подумал о том, что можно создать банк фраз, каждая фраза будет = 1 музыкальному такту, и саймон будет генерить уже не просто звуки, а последовательности из сущетсвующих музыкальных фраз, т.е. песню. 

У каждой ноты в песне будет звук и длительность. Количество звуков должно быть строго ограниченно песней, ведь мы не можем позволить себе грузить миллионы мегабайтов.
Т.к. в дабстепе часто используются [хроматизмы](https://ru.wikipedia.org/wiki/%D0%A5%D1%80%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%BC_(%D0%BC%D1%83%D0%B7%D1%8B%D0%BA%D0%B0)) подумал о том что будет здорово реализовать питч шифтинг. Т.е. дополнительная кнопка, которая будет поднимать  или опускать все звуки по высоте. 
Для этих целей прикрутил сюда плеер [tone.js](https://tonejs.github.io/)

Так же нужен будет музыкальный бит, пролетающие ноты на которые нужно будет вовремя под бит успевать нажимать. 

В соответствии со всем этим нужно будет обновить дизайн.

Так же я думаю добавить сюда другие режимы (в дизайне есть уже задумки с темной темой), лидерборды и возможность созранить свой результат например чз firebase как делал в [проекте с менеджером задач](https://maliyshock.github.io/goals/)


## Далее про то как это поставить
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
