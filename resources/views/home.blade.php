@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    Cześć  {{ Auth::user()->name }}!
                    <br><br>
                   <h1><a href="/chat">Przejdź do czatu</a></h1>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
