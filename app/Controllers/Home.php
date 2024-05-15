<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return view('components/sidebar')
                .view('parts/header')
                .view('home')
				.view('components/hari/kutipharini')
				.view('components/hari/kutipharinifpx')
				.view('components/hari/kutipharinivisa')
				.view('components/hari/kutipsmlm')
				.view('components/bulan/kutipblnni')
				.view('components/kutipseluruh')
				.view('components/kutipseluruhfpx')
				.view('components/kutipseluruhvisa')
				.view('components/hari/grafharian')
				.view('components/bulan/grafbulanan01')
				.view('components/bulan/grafbulanan02')
				.view('components/grafpbt')
				.view('components/graftrans')
				.view('components/grafuser')
                .view('parts/footer');
    }
	
	public function bulanan(): string
    {
        return view('components/sidebar')
                .view('parts/header')
                .view('bulanan')
				.view('components/hari/kutipharini')				
				.view('components/bulan/kutipblnni')
				.view('components/bulan/kutipblnlps')
				.view('components/kutipseluruh')
				.view('components/bulan/grafbulanan03')
				.view('components/bulan/grafbulanan04')
				.view('components/grafpbt')

                .view('parts/footer');
    }
	
	public function tahunan(): string
    {
        return view('components/sidebar')
                .view('parts/header')
                .view('tahunan')
				.view('components/hari/kutipharini')
				.view('components/tahun/kutipthnni')
				.view('components/tahun/kutipthnlps')
				.view('components/kutipseluruh')
				.view('components/tahun/graftahunan01')
				.view('components/tahun/graftahunan02')
                .view('parts/footer');
    }
	
	public function kutipan(): string
    {
        return view('components/sidebar')
                .view('parts/header')
				.view('components/hari/listkutipharini')				
                .view('parts/footer');
    }
	
	public function kutipan2(): string
    {
        return view('components/sidebar')
                .view('parts/header')
				.view('components/listkutipsemua')				
                .view('parts/footer');
    }
	
	////////////////////////////
	public function test(): string
    {
        return view('test');
	}
	////////////////////////////
	
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
	
	public function welcome(): string
    {
        return view('welcome_message');
    }

}

/*
view : app/view
router : app/Config/Routes.php
controller : app/Controllers/Home.php
*/