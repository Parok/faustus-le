<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="site-header header-background">
    <div class="container">
    <div class="logo-container">
        <img src="<?php echo get_template_directory_uri(); ?>/images/faustus-logo.jpeg" alt="Faustus Logo" class="logo">
        <div class="fog-overlay"></div>
    </div>
    
    <nav class="main-navigation">
        <?php
        wp_nav_menu(array(
            'theme_location' => 'main-menu',
            'container' => false,
            'menu_class' => 'nav-menu'
        ));
        ?>
    </nav>
    </div>
</header>
</body>
</html>
