<script>
  import TodoItem from './TodoItem.svelte';
  import { db } from './firebase';
  import { collectionData } from 'rxfire/firestore';
  import { startWith } from 'rxjs/operators';

  export let uid;

  export let text = '';
  const collection = db.collection('todos');

  const query = collection.where('uid', '==', uid).orderBy('created');

  const todos = collectionData(query, 'id').pipe(startWith([]));

  function add() {
    collection.add({
      uid,
      text,
      complete: false,
      created: Date.now(),
    });
    text = '';
  }

  function update(evt) {
    const { id, newStatus } = evt.detail;
    collection.doc(id).update({ complete: newStatus });
  }

  function remove(evt) {
    const { id } = evt.detail;
    collection.doc(id).delete();
  }
</script>

<style>
  input {
    display: block;
  }
</style>

<ul>
    {#each $todos as todo}

    <TodoItem {...todo} on:remove={remove} on:toggle={update} />
    {/each}
</ul>

<input bind:value={text}>

<button on:click={add}>Add Task</button>
