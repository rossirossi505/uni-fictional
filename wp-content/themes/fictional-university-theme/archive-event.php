<?php get_header();  
pageBanner(array(
  'title' => 'All Events',
  'subtitle' => get_the_archive_description()
));


?>


<div class="container container--narrow page-section">
       <?php

          while (have_posts()) {
            the_post(); ?>
             
       
            <div class="event-summary">
              <a class="event-summary__date event-summary__date--beige t-center" href="<?php the_permalink(); ?>">
                <span class="event-summary__month"><?php 
                 $eventDate = new DateTime(get_field('event_date')); 
                
               echo $eventDate ->format('M'); ?></span>
                <span class="event-summary__day"><?php echo $eventDate ->format('d'); ?></span>  
              </a>
              <div class="event-summary__content">
                <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                <p><?php if (has_excerpt()) {
                    echo get_the_excerpt();
                  } else {
                    echo wp_trim_words(get_the_content(), 18);
                    } ?> <a href="<?php the_permalink(); ?>" class="nu gray">Read more</a></p>
              </div>
            </div>
          <?php }

        echo paginate_links();
        ?> 
        
     

<hr class="section-break">
<p> Looking for past events? <a href="<?php echo site_url('/past-events') ?>">Look here  </a> </p>
</div>

<?php  get_footer(); ?>