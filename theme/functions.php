<?php
function dr_faustus_enqueue_assets() {
    // Enqueue CSS files
    wp_enqueue_style('faustus-style', get_stylesheet_uri());
    wp_enqueue_style('faustus-header', get_template_directory_uri() . '/css/header.css');
    wp_enqueue_style('faustus-nav', get_template_directory_uri() . '/css/nav.css');
    wp_enqueue_style('faustus-nav-responsive', get_template_directory_uri() . '/css/nav-res.css');

    wp_enqueue_style('faustus-footer', get_template_directory_uri() . '/css/footer.css');
    wp_enqueue_style('faustus-content', get_template_directory_uri() . '/css/content.css');
    wp_enqueue_style('faustus-logo', get_template_directory_uri() . '/css/logo.css');
    wp_enqueue_style('faustus-marlowe', get_template_directory_uri() . '/css/marlowe.css');
    wp_enqueue_style('faustus-marlowe-res', get_template_directory_uri() . '/css/marlowe-res.css');

    // Enqueue Google Font: Almendra SC
    wp_enqueue_style('almendra-sc', 'https://fonts.googleapis.com/css2?family=Almendra+SC&display=swap', array(), null);

    // Enqueue JavaScript files
    wp_enqueue_script('simplex-noise', 'https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.min.js', array(), null, true);
    wp_enqueue_script('fog-effect', get_template_directory_uri() . '/js/fog-effect.js', array(), null, true);

    // Load GSAP only on the homepage
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js', array(), null, true);
    wp_enqueue_script('nav-js', get_template_directory_uri() . '/js/nav.js', array('gsap'), null, true);
 
}
add_action('wp_enqueue_scripts', 'dr_faustus_enqueue_assets');


// Register navigation menu
function dr_faustus_register_menus() {
    register_nav_menu('main-menu', __('Main Menu'));
    register_nav_menu('footer-menu', __('Footer Menu'));
}
add_action('init', 'dr_faustus_register_menus');

// Add theme support for features like post thumbnails, title tags, etc.
function dr_faustus_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'dr_faustus_theme_setup');

?>
