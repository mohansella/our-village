<script>
    import Carousel from '@beyonk/svelte-carousel'
    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'

    const bannerContents = [
        { src: 'IMG_20200117_154938.jpg', alt: 'Poolampatti landscape 1', heading: 'Nature'},
        { src: 'IMG_20181223_072757-01.jpg', alt: 'Poolampatti landscape 2', heading: 'Heaven'},
        { src: 'IMG_20190907_140811.jpg', alt: 'Poolampatti landscape 3', heading: 'Beauty'}
    ];
</script>
<section class="banner full">
  {#each bannerContents as content}
    <article style="background-image: url(); background-position: center 0px;">
      <img src={`images/landscape/${content.src}`} alt={content.alt} />
      <div class="inner">
        <header>
          <p>Gods Own village</p>
          <h2>{content.heading}</h2>
        </header>
      </div>
    </article>
  {/each}
</section>
<section id="one" class="wrapper style2">
  <div class="inner">
		<div class="align-center">
      <h3>Poolampatti is a panchayat town in Salem district in the Indian state of Tamil Nadu.</h3>
    </div>
  </div>
</section>