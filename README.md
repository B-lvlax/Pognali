# Стартовый шаблон Pognali

---

[Здесь](https://b-lvlax.github.io/Pognali/) можно просмотреть реализацию базовых компонентов.

## Список инструментов, которые используются при сборке Gulp'ом:
__NPM-модули, устанавливаемые глобально:__
- [Node.js with NPM](https://nodejs.org/en/)
- [Gulp-CLI](https://github.com/gulpjs/gulp-cli)
- [imageOptim](https://imageoptim.com/) (опционально и только под Mac)
- [imageOptim-CLI](https://github.com/JamieMason/ImageOptim-CLI) (опционально и только под Mac)

__NPM-модули, устанавливаемые локально__
- [browser-sync](https://www.browsersync.io/)
- [del](https://www.npmjs.com/package/del)
- [gulp](https://github.com/gulpjs/gulp)
- [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
- [gulp-concat](https://github.com/gulp-community/gulp-concat)
- [gulp-connect-php](https://github.com/micahblu/gulp-connect-php)
- [gulp-csscomb](https://github.com/koistya/gulp-csscomb)
- [gulp-jade](https://github.com/gulp-community/gulp-pug)
- [gulp-jsbeautifier](https://github.com/tarunc/gulp-jsbeautifier)
- [gulp-minifier](https://github.com/webyom/gulp-minifier)
- [gulp-html-minify](https://github.com/whxaxes/gulp-html-minify)
- [gulp-notify](https://github.com/mikaelbr/gulp-notify)
- [gulp-rename](https://github.com/hparra/gulp-rename)
- [gulp-stylus](https://github.com/stevelacy/gulp-stylus)
- [gulp-svg-sprites](https://github.com/shakyshane/gulp-svg-sprites)
- [notification-logger](https://github.com/hkirat/notification-logger/)

---

## Работа с шаблоном Pognali

Прежде чем начать использовать данный шаблон, необходимо выполнить следующую последовательность действий:

1. Иметь устоновленные Node.js и NPM
2. Скачать или клонировать с GitHub к себе на компьютер файлы.
3. Перейти в необходимую папку и установить пакеты: `npm i`.
4. Выполнить команду: `gulp`.

#### Есть два варианты Gulp-тасков:
1. Стартовая комманда `gulp` - запуск сервера с отслеживанием изменений в файлах, создание спрайтов, компиляция Jade/Stylus, а также перемещение библиотек в одну общую папку.
2. Финальная комманда `gulp public` - минимизация HTML/CSS/JS и оптимизация картинок в отдельную папку.

#### Структура проекта

#### Особенности некоторых файлов
- .csscomb.json
- .jsbeautifyrc
- .htaccess
- robots.txt
