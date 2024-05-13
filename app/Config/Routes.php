<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/bulanan', 'Home::bulanan');
$routes->get('/tahunan', 'Home::tahunan');
$routes->get('/kutipan', 'Home::kutipan');


$routes->get('/register', 'Home::register');
$routes->get('/login', 'Home::login');
$routes->get('/test', 'Home::test');
$routes->get('/ci', 'Home::welcome');


/*
view : app/Views/
router : app/Config/Routes.php
controller : app/Controllers/Home.php
*/