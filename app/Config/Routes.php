<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/register', 'Home::register');
$routes->get('/login', 'Home::login');
$routes->get('/test', 'Home::test');


/*
view : app/Views/
router : app/Config/Routes.php
controller : app/Controllers/Home.php
*/