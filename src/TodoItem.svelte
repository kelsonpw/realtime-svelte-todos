<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch('remove', { id });
  }

  function toggle() {
    let newStatus = !complete;
    dispatch('toggle', {
      id,
      newStatus,
    });
  }

  export let id;
  export let text;
  export let complete;
</script>

<style>
  .is-complete {
    text-decoration: line-through;
    color: green;
  }
</style>

<li>
    <span class={complete && 'is-complete'}>
        {text}
    </span>
    <button on:click={toggle}>
        {complete ? '🤘' : '👎' }
    </button>

    <button on:click={remove}>🗑</button>
</li>
