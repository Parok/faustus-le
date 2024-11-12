<?php
function dr_faustus_enqueue_styles() {
    wp_enqueue_style('dr-faustus-style', get_stylesheet_uri());

    wp_enqueue_style('faustus-header', get_template_directory_uri() . '/css/header.css');
    wp_enqueue_style('faustus-nav', get_template_directory_uri() . '/css/nav.css');
    wp_enqueue_style('faustus-footer', get_template_directory_uri() . '/css/footer.css');
    wp_enqueue_style('faustus-content', get_template_directory_uri() . '/css/content.css');
    wp_enqueue_style('faustus-responsive', get_template_directory_uri() . '/css/responsive.css');
    wp_enqueue_style('faustus-logo', get_template_directory_uri() . '/css/logo.css');
}
add_action('wp_enqueue_scripts', 'dr_faustus_enqueue_styles');


// Register navigation menu
function dr_faustus_register_menus() {
    register_nav_menu('main-menu', __('Main Menu'));
    register_nav_menu('footer-menu', __('Footer Menu'));}
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
