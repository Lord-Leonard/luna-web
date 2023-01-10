<script lang="ts">
  import { page } from '$app/stores'
</script>

<svelte:head>
  <title>SvelteKit Auth</title>
</svelte:head>

<nav>
  {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}

  {#if $page.data.user}
    <a href="/admin">Admin</a>

    <form action="/logout" method="POST">
      <button type="submit">Log out</button>
    </form>
  {/if}
</nav>

<main>
  <slot />
</main>


<!--<script lang="ts">-->
<!--  import Footer from '$lib/components/Footer.svelte';-->
<!--  import Header from '$lib/components/Header.svelte';-->
<!--  import '@picocss/pico';-->
<!--  import type { LayoutData } from './$types';-->

<!--  export let data: LayoutData;-->
<!--</script>-->

<!--<svelte:head>-->
<!--  <meta name="viewport" content="width=device-width, initial-scale=1" />-->
<!--  <link rel="preconnect" href="https://fonts.googleapis.com" />-->
<!--  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />-->
<!--  <link-->
<!--    href="https://fonts.googleapis.com/css2?family=Cormorant:wght@500&display=swap&text=BOOKSTALFNTYVE"-->
<!--    rel="stylesheet"-->
<!--  />-->
<!--</svelte:head>-->

<!--<Header isAuthenticated={data.isAuthenticated} />-->
<!--<main class="container">-->
<!--  <slot />-->
<!--</main>-->
<!--<Footer />-->

<!--<style global lang="scss">-->
<!--  main {-->
<!--    flex: 1 0 auto;-->
<!--  }-->

<!--    body > div {-->
<!--      display: flex;-->
<!--      flex-direction: column;-->
<!--      min-height: 100vh;-->
<!--    }-->

<!--    dialog,-->
<!--    form {-->
<!--      > article {-->
<!--        width: 100%;-->
<!--        border: 1px solid var(&#45;&#45;muted-border-color);-->
<!--        > header {-->
<!--          margin-bottom: 0.5em;-->
<!--          padding-top: 0.75em;-->
<!--          padding-bottom: 0.75em;-->
<!--          font-size: 1.25rem;-->
<!--          font-weight: 500;-->
<!--          border-bottom: 1px solid var(&#45;&#45;muted-border-color);-->
<!--          .close {-->
<!--            margin-top: 0.5em;-->
<!--          }-->
<!--        }-->
<!--        > footer {-->
<!--          display: flex;-->
<!--          gap: 1em;-->
<!--          justify-content: center;-->
<!--          margin-top: 1em;-->
<!--          padding-top: 1em;-->
<!--          padding-bottom: 1em;-->
<!--          border-top: 1px solid var(&#45;&#45;muted-border-color);-->
<!--          > button {-->
<!--            display: inline-block;-->
<!--            margin-bottom: 0;-->
<!--            max-width: 160px;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  -->
<!--</style>-->
