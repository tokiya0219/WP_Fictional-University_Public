<div class="post-item">
    <h2 class='headline headline--medium headline--post-title'><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <div class="generic-content">
        <p><?php echo wp_trim_words(get_field('main_body_content'), 50); ?></p>
        <P><a class='btn btn--blue' href="<?php the_permalink(); ?>">View program &raquo;</a></P>
    </div>
  </div>