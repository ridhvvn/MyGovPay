<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return view('sidebar')
                .view('parts/header')
                .view('body')
                .view('parts/footer');
    }
	
	public function test(): string
    {
        return view('sidebar')
                .view('parts/header')
                .view('test')
                .view('parts/footer');
    }
	
	public function register(): string
    {
        return view('parts/header_simple')
                .view('register')
                .view('parts/footer_simple');
    }
	
	public function login(): string
    {
        return view('parts/header_simple')
                .view('login')
                .view('parts/footer_simple');
    }

}

/*
view : app/view
router : app/Config/Routes.php
controller : app/Controllers/Home.php
*/