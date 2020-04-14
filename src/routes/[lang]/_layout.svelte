<script context="module">

    export async function preload({ params, query }) {
        console.log(params, query);
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
    import { locale, addMessages } from '../../services/LocaleService.js'

    export let segment;
    export let messages;

    $: addMessages(segment, messages);
    $: locale.set(segment);
</script>

<Header pathPrefix="{segment}/"/>
Segment : {segment}<br>
<slot></slot>