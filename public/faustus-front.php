<?php
/*
Plugin Name: Faustus Front
Description: A simple "Hello World" plugin for Faustus Club.
Version: 1.0
Author: Your Name
*/

// Hook to display a message on every page in the footer
function faustus_front_hello_world() {
    echo '<p style="text-align: center;">Hello World from Faustus Front!</p>';
}
add_action('wp_footer', 'faustus_front_hello_world');
