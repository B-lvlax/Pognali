# Стартовый шаблон Pognali

---

По этой [ссылке](https://b-lvlax.github.io/Pognali/) можно просмотреть реализацию базовых компонентов.

## Список инструментов, которые используются при сборке Gulp'ом:
__Npm-модули, устанавливаемые глобально:__
- [gulp](https://gulpjs.com/)
- [gulp-imageoptim](https://www.npmjs.com/package/gulp-imageoptim2)

__Npm-модули, устанавливаемые локально__
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
- [gulp-notify](https://github.com/mikaelbr/gulp-notify)
- [gulp-rename](https://github.com/hparra/gulp-rename)
- [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps)
- [gulp-stylus](https://github.com/stevelacy/gulp-stylus)
- [gulp-svg-sprites](https://github.com/shakyshane/gulp-svg-sprites)
- [gulp-sync](https://github.com/kaminaly/gulp-sync)
- [notification-logger](https://github.com/hkirat/notification-logger/)

---

## Работа с шаблоном Pognali

Прежде чем начать использовать данный шаблон, необходимо выполнить следующую последовательность действий:

1. Скачать или клонировать с GitHub к себе на компьютер.
2. Установить Npm-модули в нужную папку: `npm i`.
3. Выполнить команду: `gulp`.

#### Есть два варианты Gulp-тасков:
1. Стартовый `gulp` - запуск сервера с отслеживанием изменений в файлах, создание спрайтов, компиляция Jade/Stylus, а также базовое структуризация исходников.
2. Финальный `gulp build` - происходит минимизация HTML/CSS/JS и оптимизация картинок в отдельную папку.

#### Структура проекта

#### Особенности некоторых файлов
- .csscomb.json
- .jsbeautifyrc
- .htaccess
