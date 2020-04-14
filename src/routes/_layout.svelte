<script>
    import { locales } from '../services/LocaleService.js'
    const isDebug = true;
</script>

<slot></slot>

{#if isDebug}
    <style>
        .debug-lang-link {
            position: fixed;
            right: 0;
            bottom: 0;
            padding:10px;
        }

        .debug-lang-link > a {
            padding: 20px;
        }
    </style>

    <div class='debug-lang-link'>
        {#each locales as locale}
            <a href="./{locale.name}">{locale.display}</a>
        {/each}
    </div>
{/if}