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
    import Header from '../../components/Header.svelte'
    import { _, locale, addMessages, setLocale } from '../../services/LocaleService.js'

    export let segment;
    export let messages;

    let handleChanges = (segment, messages) => {
        addMessages(segment, messages);
        locale.set(segment);
        setLocale(segment);
    };

    $: handleChanges(segment, messages);
    $: title = $_('titles.main');
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<Header pathPrefix="{segment}/"/><br>
Segment : {segment}<br>
<slot></slot>