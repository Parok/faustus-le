<?php
/*
Plugin Name: Faustus Front
Description: A plugin to embed a React app in WordPress.
Version: 1.0
Author: Your Name
*/

// Enqueue React app files
function faustus_front_enqueue_react_app() {
    // Adjust paths as needed
    $plugin_dir_url = plugin_dir_url(__FILE__);

    // Enqueue CSS file(s)
    wp_enqueue_style(
        'faustus-front-style',
        $plugin_dir_url . 'public/static/css/main.css',
        [],
        '1.0'
    );

    // Enqueue JS file(s) with dependencies and footer loading
    wp_enqueue_script(
        'faustus-front-script',
        $plugin_dir_url . 'public/static/js/main.js',
        ['wp-element'],  // 'wp-element' dependency allows the use of React in WordPress
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'faustus_front_enqueue_react_app');

// Display the React app via shortcode
function faustus_front_render_app() {
    return '<div id="faustus-front-root"></div>';
}
add_shortcode('faustus_front_app', 'faustus_front_render_app');
