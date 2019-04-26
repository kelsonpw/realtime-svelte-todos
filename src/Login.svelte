<script>
  import Profile from './Profile.svelte';

  import firebase, { auth } from './firebase';
  import { authState } from 'rxfire/auth';

  let user;
  const unsubscribe = authState(auth()).subscribe(u => (user = u));

  function login() {
    auth().signInWithPopup(new auth.GoogleAuthProvider());
  }
</script>


<section>
{#if user}
    <Profile {...user} />
    <button on:click={ () => auth().signOut() }>Logout</button>
    <hr>
{:else}
	<button on:click={login}>
		Signin with Google
	</button>
{/if}
</section>
