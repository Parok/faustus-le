<?php get_header(); ?>

<main class="content-area container">
    <?php
    if (have_posts()) : while (have_posts()) : the_post();
        the_content();
    endwhile; else :
        echo '<p>No content available.</p>';
    endif;
    ?>
</main>
<footer class="site-footer">
    <?php get_footer(); ?>
</footer>
