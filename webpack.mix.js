const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
       ]);
mix.scripts([
'node_modules/ckeditor5-build-laravel-image/build/ckeditor.js',
], 'public/js/vendors.js');

//mix.browserSync(‘localhost:8000’);