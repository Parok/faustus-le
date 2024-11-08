<?php get_header(); ?>
<main class="content-area container">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article <?php post_class('box'); ?>>
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="post-meta">
                <span>Posted on <?php echo get_the_date(); ?> by <?php the_author(); ?></span>
            </div>
            <div class="post-content">
                <?php the_excerpt(); ?>
            </div>
            <a class="read-more" href="<?php the_permalink(); ?>">Read More</a>
        </article>
    <?php endwhile; else : ?>
        <p>No posts found.</p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
