<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData

  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

  const autofill = (user: 'John Doe' | 'Jane White') => () => {
    usernameInput.value = `${user}`;
    passwordInput.value = user === 'John Doe' ? 'changeme' : 'guess';
  };

</script>

<h1>Login</h1>

<form action="?/login" method="POST">
  <label>Autofill</label>
  <div class="grid">
    <button class="secondary" on:click|preventDefault={autofill('John Doe')}>John</button>
    <button class="secondary" on:click|preventDefault={autofill('Jane White')}>Jane</button>
  </div>

  <div>
    <label for="username">Username</label>
    <input id="username" name="username" type="text" required bind:this={usernameInput}/>
  </div>

  <div>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required bind:this={passwordInput}/>
  </div>

  {#if form?.invalid}
    <p class="error">Username and password is required.</p>
  {/if}

  {#if form?.credentials}
    <p class="error">You have entered the wrong credentials.</p>
  {/if}

  <button type="submit">Log in</button>
</form>


<!--<script lang="ts">-->
<!--  import { enhance } from '$app/forms';-->
<!--  import { goto, invalidateAll } from '$app/navigation';-->
<!--  import { page } from '$app/stores';-->
<!--  import type { ActionData } from './$types';-->

<!--  export let form: ActionData;-->

<!--  let error = false;-->


<!--  $: returnTo = $page.url.searchParams.get('returnTo');-->

<!--  $: (async () => {-->
<!--    if (form?.success) {-->
<!--      await invalidateAll();-->
<!--      await goto(returnTo || '/');-->
<!--    } else if (form?.error) {-->
<!--      error = true;-->
<!--    }-->
<!--  })();-->



<!--  const clearError = () => {-->
<!--    error = false;-->
<!--  };-->
<!--</script>-->

<!--<svelte:head>-->
<!--  <title>Login • Bookstall</title>-->
<!--</svelte:head>-->

<!--<form method="POST" use:enhance>-->
<!--  <article>-->
<!--    <header>Login</header>-->
<!--    &lt;!&ndash; svelte-ignore a11y-label-has-associated-control &ndash;&gt;-->

<!--    <label>-->
<!--      Email-->
<!--      <input name="email" type="email" required bind:this={emailInput} />-->
<!--    </label>-->
<!--    <label>-->
<!--      Password-->
<!--      <input name="password" type="password" required bind:this={passwordInput} />-->
<!--    </label>-->
<!--    <footer>-->
<!--      {#if returnTo}-->
<!--        <a role="button" class="secondary" href={returnTo}>Cancel</a>-->
<!--      {/if}-->
<!--      <button type="submit">Login</button>-->
<!--    </footer>-->
<!--  </article>-->
<!--</form>-->

<!--<dialog open={!!error}>-->
<!--  <article>-->
<!--    <header>Authentication failed!</header>-->
<!--    <p>Please check your credentials and try again.</p>-->
<!--    <footer>-->
<!--      <button class="secondary" on:click={clearError}>Ok</button>-->
<!--    </footer>-->
<!--  </article>-->
<!--</dialog>-->

<!--<style>-->
<!--  form {-->
<!--    max-width: 500px;-->
<!--    margin: var(&#45;&#45;block-spacing-vertical) auto;-->
<!--  }-->
<!--</style>-->
