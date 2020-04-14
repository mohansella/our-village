<script>
    import { onMount } from 'svelte'
    import { locales, getLocale } from '../services/LocaleService.js'

    onMount( () => {
        const locale = getLocale()
        window.location.pathname = `./${locale}`;
    })
</script>

{#each locales as locale }
    <a href="./{locale.name}" >{locale.display}</a><br>
{/each}