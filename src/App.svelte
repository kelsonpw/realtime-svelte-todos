<script>
  import Profile from './Profile.svelte';
  import Todos from './Todos.svelte';
  import firebase, { auth } from './firebase';

  let user;

  const setUser = u => {
    if (u) {
      user = u;
    }
  };

  const unsub = auth().onAuthStateChanged(setUser);

  function login() {
    auth().signInWithPopup(new auth.GoogleAuthProvider());
  }
</script>

<section>
{#if user}
    <Profile {...user} />
    <button on:click={ () => auth().signOut() }>Logout</button>
    <hr>
    <Todos uid={user.uid}/>
{:else}
	<button on:click={login}>
		Signin with Google
	</button>
{/if}
</section>
