<?php
// Enqueue the main stylesheet
function dr_faustus_enqueue_styles() {
    wp_enqueue_style('dr-faustus-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'dr_faustus_enqueue_styles');

// Register navigation menu
function dr_faustus_register_menus() {
    register_nav_menu('main-menu', __('Main Menu'));
}
add_action('init', 'dr_faustus_register_menus');

// Add theme support for features like post thumbnails, title tags, etc.
function dr_faustus_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'dr_faustus_theme_setup');
?>
