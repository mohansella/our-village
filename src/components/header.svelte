<script>
    import { _ } from "@/services/LocaleService.js";
    import Facebook from "@/components/svgs/facebook.svelte";
    import Instagram from "@/components/svgs/instagram.svelte";
    import Discord from "@/components/svgs/discord.svelte";
    import Heart from "@/components/svgs/heart.svelte";

    const links = [ "culture", "tourism", "events", "gallery", "blogs" ];
    export let segment = "";
</script>

<nav class="navbar navbar-expand-md navbar-light bg-light">

    <a class="navbar-brand" href=".">
        <img src="favicon.svg" alt="logo" height="32px" style="padding-bottom: 4px;">
        <span>Poolampatti</span>
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav ml-auto">
            
            {#each links as link}
                <li class="nav-item">
                    <a class="nav-link" href="{segment}/{link}">{$_(`header.${link}`)}</a>
                </li>
            {/each}

            <li>
              <div class="nav-heart btn">
                <Heart></Heart>
              </div>
            </li>
            
        </ul>
    </div>
</nav>