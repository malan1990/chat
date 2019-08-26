<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chat room</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .list-group{
                overflow-y: scroll;
               max-height: 250px;
        }
    </style>
</head>
<body>
        <div class="container">
            <div class="row" id="app">
                <div class="col-md-6  offset-md-4 ">

                       <li class="active list-group-item"> Chat room <small class="badge badge-pill badge-danger">
                        @{{ users }} </small>
                        </li>
                            <ul class="list-group" v-chat-scroll>

                                    <message
                                        v-for="value, index in chat.message"
                                          :key="value.index"
                                          :color= chat.color[index]
                                          :user = chat.user[index]
                                          :time = chat.time[index]
                                    >
                                        @{{value}}
                                    </message>
                                <span class="badge badge-pill badge-light">@{{ typing }}</span>
                                </ul>
                            <br>
                            <input v-model="message" v-on:keyup.enter="send" type="text" class="form-control" placeholder="Napisz wiadomość...">
                                <br>
                            <a href="{{ route('home') }}">Powrót</a>
                </div>

            </div>
        </div>


    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
