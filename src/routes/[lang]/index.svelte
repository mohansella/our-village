<script>
    import Carousel from '@beyonk/svelte-carousel'
    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'
    import { _ } from "@/services/LocaleService.js";

    const images = [
        { src: 'IMG_20200117_154938.jpg', alt: 'Poolampatti landscape 1', heading: 'carousal.nature'},
        { src: 'IMG_20181223_072757-01.jpg', alt: 'Poolampatti landscape 2', heading: 'carousal.heaven'},
        { src: 'IMG_20190907_140811.jpg', alt: 'Poolampatti landscape 3', heading: 'carousal.beauty'}
    ];
</script>

<Carousel perPage={1} autoplay={15000} loop={true}>
  <span class="control" slot="left-control">
    <ChevronLeftIcon />
  </span>
  {#each images as image}
    <div class="container">
      <img class="slide-content" src={`images/landscape/${image.src}`} alt={image.alt}>
      <div class="centered-div">
        <header>
          <p>{$_("carousal.gods_own_village")}</p>
          <h2>{$_(image.heading)}</h2>
        </header>
      </div>
    </div>
  {/each}
  <span class="control" slot="right-control">
    <ChevronRightIcon />
  </span>
</Carousel>
 
<style>
    .slide-content {
        width: 100%;
        height: 800px;
        object-fit: cover;
    }
    .control :global(svg) {
        width: 100%;
        height: 100%;
        color: #fff;
        border: 2px solid #fff;
        border-radius: 32px;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        background: black;
    }
    .container > img {
        opacity: 0.90;
    }
    .centered-div {
        position: absolute;
        margin: 10px;
        padding:5px;
        width: 100%;
        text-align: center;
    }
    .centered-div > header > p {
        color: rgba(255, 255, 255, 0.65);
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 300;
        margin: 0;
        padding-bottom: 1.75rem;
        letter-spacing: .25rem;
    }
    .centered-div > header > p::after {
        content: '';
        position: absolute;
        margin: auto;
        right: 0;
        bottom: 130px;
        left: 0;
        width: 170px;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.65);
    }
    .centered-div > header > h2 {
      font-size: 7rem;
      margin-bottom: 0;
      color: #FFF;
      font-weight: 300;
    }

    @media(max-width: 1200px) {
        .slide-content {
            height: 700px;
        }
    }
    @media(max-width: 800px) {
        .slide-content {
            height: 470px;
        }
        .centered-div > header > h2 {
          font-size: 4rem;
        }
        .centered-div > header > p::after {
          bottom: 85px;
        }
    }
</style>