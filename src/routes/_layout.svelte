<script context="module">
    //this file does nothing but displays urls for each language at the bottom right in development mode
    import { locales } from '@/services/LocaleService.js'
    
    export async function preload({ params, query }) {
        const MODE_DEVELOPMENT = "development";
        const mode = process.env.NODE_ENV;
        const isDebugMode = mode === MODE_DEVELOPMENT;
        return { isDebug : isDebugMode };
    }
</script>

<script>
    export let isDebug = false; //set to true in development mode
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