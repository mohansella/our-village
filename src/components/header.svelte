<script>
    import { enLocale, taLocale, _ } from "@/services/LocaleService.js";
    import LogoSvg from "@/components/svgs/logo.svelte";
    import { stores } from '@sapper/app';
    
    export let segment = "";
    let otherLangUrl = ".";
    let otherLocale = taLocale;

    const links = [ "culture", "tourism", "events", "gallery", "blogs" ];
    const { page, preloading, session } = stores();

    $: {
        let match = /^\/(\w+)(.*?)$/.exec($page.path);
        if(match) {
            otherLocale = match[1] == enLocale.name ? taLocale : enLocale;
            otherLangUrl = "/" + otherLocale.name + match[2];
        }
    }
    
</script>

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
    </ul>
    <a class="lang" href="{otherLangUrl}">{otherLocale.display}</a>
</nav>

<style>
    nav {
        height: 40px;
        padding: 8px 16px;
        display: flex;
    }

    .brand {
        flex: 4;
        display: flex;
        align-items: center;
        width: 200px;
        font-size: 20px;
    }

    .brand > :global(svg) {
        height: 25px;
        margin: 0px 5px;
    }

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
</style>
