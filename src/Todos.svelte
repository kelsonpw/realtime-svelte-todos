<script>
  import TodoItem from './TodoItem.svelte';
  import { db } from './firebase';
  import { collectionData } from 'rxfire/firestore';
  import { startWith } from 'rxjs/operators';

  export let uid;

  export let text = 'some task';

  const query = db
    .collection('todos')
    .where('uid', '==', uid)
    .orderBy('created');

  const todos = collectionData(query, 'id').pipe(startWith([]));

  function add() {
    db.collection('todos').add({
      uid,
      text,
      complete: false,
      created: Date.now(),
    });
  }

  function update(evt) {
    const { id, newStatus } = evt.detail;
    db.collection('todos')
      .doc(id)
      .update({ complete: newStatus });
  }

  function remove(evt) {
    const { id } = evt.detail;
    db.collection('todos')
      .doc(id)
      .delete();
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
