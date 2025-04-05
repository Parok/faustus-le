<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header class="site-header header-background">


        <div class="logo-container">
           <img src="<?php echo get_template_directory_uri(); ?>/images/faustus-logo.jpeg" alt="Faustus Logo" class="logo">

           <canvas id="logoFogCanvas" class="fogCanvas logoFogCanvas"></canvas>


        </div>


        <!-- Main Navigation -->
        <nav class="main-navigation">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'main-menu',
                'container' => false,
                'menu_class' => 'nav-menu',
                'link_before' => '<span class="nav-link nav-font">',
                'link_after' => '</span>',
            ));
            ?> 
        </nav>

        <!-- Marlowe Quotes with Fog Background -->
        <div class="quote-section">
            <div class="quote-container">
                <!-- Oval Fog Canvas Background -->
                <canvas id="quoteFogCanvas" class="fogCanvas quoteFogCanvas oval-fog"></canvas>
                
                <!-- Animated Marlowe Quotes -->
                <div class="marlowe-quote" id="quote1">"Was this the face that launched a thousand ships, And burnt the topless towers of Ilium?"</div>
                <div class="marlowe-quote" id="quote2">"Why, this is hell, nor am I out of it."</div>
                <div class="marlowe-quote" id="quote3">"O, I'll leap up to my God! Who pulls me down?"</div>
                <div class="marlowe-quote" id="quote4">"Hell hath no limits, nor is circumscribed in one self place."</div>
                <div class="marlowe-quote" id="quote5">"The reward of sin is death: that’s hard."</div>
                <div class="marlowe-quote" id="quote6">"Sweet Helen, make me immortal with a kiss."</div>
                <div class="marlowe-quote" id="quote7">"O soul, be chang’d into little water-drops, And fall into the ocean, ne'er be found!"</div>
                <div class="marlowe-quote" id="quote8">"My heart's so harden'd, I cannot repent!"</div>
            </div>
        </div>


</header>

</body>
</html>
