<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <link rel="stylesheet" href="{{ mix('css/common.css') }}">
        <title>Dictionary</title>
    </head>
    <body>
        <div id="app" class="app"></div>
        <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>