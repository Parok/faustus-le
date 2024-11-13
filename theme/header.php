<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.min.js"></script>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="site-header header-background">
    <div class="container">
        <!-- Logo Container -->
        <div class="logo-container">
            <img src="<?php echo get_template_directory_uri(); ?>/images/faustus-logo.jpeg" alt="Faustus Logo" class="logo">
            <canvas id="fogCanvas" class="fog-grid"></canvas>
        </div>

        <!-- Main Navigation -->
        <nav class="main-navigation">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'main-menu',
                'container' => false,
                'menu_class' => 'nav-menu',
                'link_before' => '<span class="nav-link">',
                'link_after' => '</span>',
            ));
            ?>
        </nav>
    </div>
</header>
</body>
</html>
