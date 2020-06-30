<script>
    import { onMount } from 'svelte'
    import { goto } from '@sapper/app'
    import { locales, getLocale } from '@/services/LocaleService.js'

    onMount( () => {
        const locale = getLocale();
        goto(locale);
    })
</script>

<style>
    div {
        position: fixed;
        right: 0;
        top: 0;
        padding:10px;
    }

    div > a {
        padding: 20px;
    }
</style>

<div>
    {#each locales as locale}
        <a href="./{locale.name}">{locale.display}</a>
    {/each}
</div>