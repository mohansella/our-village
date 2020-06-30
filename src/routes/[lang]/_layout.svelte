<script context="module">

    export async function preload({ params, query }) {
        const { lang } = params;
        const res = await this.fetch(`/lang/${lang}.json`);
        
        if (res.status === 200) {
            const messages = await res.json();
            return { messages, segment: lang };
        }

        this.error(404, 'Not found');
    }

</script>

<script>
    import { beforeUpdate } from 'svelte'
    import Header from '@/components/header.svelte'
    import { _, locale, addMessages, setLocale } from '@/services/LocaleService.js'

    export let segment;
    export let messages;

    $: {
        addMessages(segment, messages);
        locale.set(segment);
    }

    beforeUpdate(() => {
        setLocale(segment);
    });
</script>

<svelte:head>
    <title>{$_('titles.main.desc')}</title>
</svelte:head>

<div class="header">
    <Header segment="{segment}"/>
</div>
<main>
    <slot></slot>
</main>

<style>
    .header {
        background-color: #f8f9fa;
    }

    main {
        width: 100%;
        margin: auto;
        max-width: 1600px;
    }

    @media(max-width: 800px) {
        main {
            width: 100%;
        }
    }
</style>