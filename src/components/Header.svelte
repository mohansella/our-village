<script>
    import { _ } from "../services/LocaleService.js";

    const links = [ "culture", "tourism", "events", "gallery", "blogs" ];
    export let pathPrefix = "";
</script>

{#each links as link}
    <a href="{pathPrefix}{link}">{$_(`header.${link}`)}</a>
{/each}