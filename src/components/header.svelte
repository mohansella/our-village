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
    
    
    export let segment = "";

    let otherLangUrl = ".";
    let otherLocale = taLocale;

    let heartEle;
    let heartListEle;
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
        heartListEle.style.display = "flex";
        popperInstance.update();
    }

    function hideTT() {
        heartListEle.style.display = "none";
        popperInstance.update();
    }
    
    onMount(()=> {
        popperInstance = createPopper(heartEle, heartListEle, {
            placement: 'bottom-start',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });

        return () => {
            popperInstance.destroy();
        }
    });

</script>

<svelte:window on:click={hideTT}/>

<nav>
    
    <a class="brand" href="{segment}">
        <LogoSvg/>
        <span>{$_(`titles.main.disp`)}</span>
    </a>
    
    <ul class="links">
        {#each links as link}
            <li>
                <a href="{segment}/{link}">{$_(`header.${link}`)}</a>
            </li>
        {/each}
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
    
    <a class="lang" href="{otherLangUrl}">{otherLocale.display}</a>

</nav>

<style>

    /* navigation main */
    nav {
        height: 40px;
        padding: 8px 16px;
        display: flex;
        justify-content: space-around;
        background-color: #f8f9fa;
    }

    /* brand */
    .brand {
        flex: 4;
        display: flex;
        align-items: center;
        font-size: 20px;
        max-width: 160px;
        margin-right: auto;
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

    .lang {
        font-size: 10px;
        position: absolute;
        top: 0px;
        right: 20px;
    }

    /* heart */
    .heart {
        opacity: 0.7;
    }
    .heart:hover {
        opacity: 1;
    }
    .heart > :global(svg) {
        width: 16px;
        cursor: pointer;
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
</style>
