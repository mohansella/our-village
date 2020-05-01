<script>
    import Carousel from '@beyonk/svelte-carousel'
    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'

    const images = [
        { src: 'IMG_20200117_154938.jpg', alt: 'Poolampatti landscape 1'},
        { src: 'IMG_20190907_140811.jpg', alt: 'Poolampatti landscape 2'},
    ];
</script>

<Carousel perPage={1} autoplay={15000} loop={true}>
  <span class="control" slot="left-control">
    <ChevronLeftIcon />
  </span>
  {#each images as image}
    <img class="slide-content" src={`images/landscape/${image.src}`} alt={image.alt}>
  {/each}
  <span class="control" slot="right-control">
    <ChevronRightIcon />
  </span>
</Carousel>
 
<style>
    .slide-content {
        width: 100%;
        height: 550px;
        object-fit: cover;
    }
    .control :global(svg) {
        width: 100%;
        height: 100%;
        color: #fff;
        border: 2px solid #fff;
        border-radius: 32px;
    }
    @media(max-width: 800px) {
        .slide-content {
            height: 400px;
        }
    }
</style>