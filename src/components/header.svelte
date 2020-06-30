<script>
    import { onMount } from 'svelte';
    import { stores } from '@sapper/app';
    import { createPopper } from '@popperjs/core';

    import { enLocale, taLocale, _ } from "@/services/LocaleService.js";

    import LogoSvg from "@/components/svgs/logo.svelte";
    import HeartSvg from "@/components/svgs/heart.svelte";
    import InstagramSvg from "@/components/svgs/instagram.svelte";
    import FacebookSvg from "@/components/svgs/facebook.svelte";
    import DiscordSvg from "@/components/svgs/discord.svelte";
    import BarsSvg from "@/components/svgs/bars.svelte";
    
    
    export let segment = "";

    let otherLangUrl = ".";
    let otherLocale = taLocale;

    let heartEle;
    let heartListEle;
    let linksEle;
    let popperInstance;

    const links = [ "culture", "tourism", "events", "gallery", "blogs" ];
    const { page, preloading, session } = stores();

    $: {
        let match = /^\/(\w+)(.*?)$/.exec($page.path);
        if(match) {
            otherLocale = match[1] == enLocale.name ? taLocale : enLocale;
            otherLangUrl = "/" + otherLocale.name + match[2];
        }
    }

    function showTT() {
        heartListEle.style.display = "";
        popperInstance.update();
    }

    function hideTT() {
        heartListEle.style.display = "none";
        popperInstance.update();
    }

    function initalizePopper() {
        popperInstance = createPopper(heartEle, heartListEle, {
            placement: 'bottom',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });

        return destroyPopper;
    }

    function destroyPopper() {
        if(popperInstance) {
            popperInstance.destroy();
        }
    }

    function toggleBars() {
        linksEle.classList.toggle('show');
    }
    
    onMount(initalizePopper);

</script>

<svelte:window on:click={hideTT}/>

<nav>
    
    <a class="brand" href="{segment}">
        <LogoSvg/>
        <span>{$_(`titles.main.disp`)}</span>
    </a>
    
    <ul class="links"  bind:this={linksEle}>
        {#each links as link}
            <li>
                <a href="{segment}/{link}">{$_(`header.${link}`)}</a>
            </li>
        {/each}
        <li>
            <a href="{otherLangUrl}">{otherLocale.display}</a>
        </li>
        <li class="heart" bind:this={heartEle} on:click|stopPropagation={showTT}>
            <HeartSvg/>
            
            <ul class="heart-tt" bind:this={heartListEle} role="tooltip" style="display: none" on:mouseleave={hideTT}>
                <a href=".">
                    <InstagramSvg/>
                    <span>{$_(`header.instagram`)}</span>
                </a>
                <a href=".">
                    <FacebookSvg/>
                    <span>{$_(`header.facebook`)}</span>
                </a>
                <a href=".">
                    <DiscordSvg/>
                    <span>{$_(`header.discord`)}</span>
                </a>
                <div class="heart-tt-arrow" data-popper-arrow></div>
            </ul>
        </li>
    </ul>
    
    <div class="bars" on:click={toggleBars}><BarsSvg/></div>

</nav>

<style>

    /* navigation main */
    nav {
        min-height: 56px;
        padding: 8px 16px;
        display: flex;
        justify-content: space-around;

        width: 95%;
        margin: auto;
        max-width: 1600px;
    }

    /* brand */
    .brand {
        flex: 4;
        display: flex;
        align-items: center;
        font-size: 20px;
        max-width: 160px;
        margin-right: auto;
        min-height: 40px;
    }

    .brand > :global(svg) {
        height: 25px;
        margin: 0px 5px;
    }

    /* links */
    .links {
        display: flex;
        align-items: center;
        padding: 0px;
        margin: 0px;
        list-style-type: none;
    }

    .links > li {
        padding: 0px 10px;
        font-size: 16px;
    }

    .links > li > a:hover {
        color: black;
        border-bottom: 2px solid black;
    }

    /* heart */
    .heart > :global(svg) {
        width: 16px;
        cursor: pointer;
        opacity: 0.7;
    }
    .heart:hover > :global(svg:hover) {
        opacity: 1;
    }
    .heart-tt {
        display: flex;
        align-items: center;
        padding: 0px;
        margin: 0px;
        list-style-type: none;
        position: absolute;
        flex-direction: column;
        align-items: baseline;
        background: white;
        box-shadow: 4px 2px 12px #888888;
        z-index: 100;
    }

    .heart-tt-arrow, .heart-tt-arrow::before {
        position: absolute;
        width: 8px;
        height: 8px;
        z-index: -1;
    }

    .heart-tt-arrow::before {
        content: '';
        transform: rotate(45deg);
        background: white;
    }

    :global(.heart-tt[data-popper-placement^='top'] > .heart-tt-arrow) {
        bottom: -4px;
    }

    :global(.heart-tt[data-popper-placement^='bottom'] > .heart-tt-arrow) {
        top: -4px;
    }

    :global(.heart-tt[data-popper-placement^='left'] > .heart-tt-arrow) {
        right: -4px;
    }

    :global(.heart-tt[data-popper-placement^='right'] > .heart-tt-arrow) {
        left: -4px;
    }

    .heart-tt > a {
        display: flex;
        margin: 6px 15px;
    }
    .heart-tt > a > :global(svg) {
        height: 16px;
        margin-top: 2px;
        margin-right: 4px;
    }

    .bars {
        height: 20px;
        width: 20px;
        border: none;
        position: absolute;
        top: 18px;
        right: 22px;
        display: none;
        cursor: pointer;
    }

    .bars:hover {
        opacity: 0.9;
    }

    @media(max-width: 800px) {
        .bars {
            display: inline-block;
        }
        
        nav {
            flex-direction: column;
            width: 100%;
        }

        .links {
            display: none;
            flex-direction: column;
            align-items: flex-start;
            margin: 15px;
        }

        :global(.links.show) {
            display: flex !important;
        }

        .links > li {
            margin: 10px;
            width: 95%;
            border-bottom: 1px solid #b5b5b5;
            padding-bottom: 8px;
        }
    }
</style>
