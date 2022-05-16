
<template>
  <div>
    <b-button>Button</b-button>
    <b-button variant="danger">Button</b-button>
    <b-button variant="success">Button</b-button>
    <b-button variant="outline-primary">Button</b-button>
<!--    -->
<!--    <ul v-for="post in posts" v-bind:key="post.id">-->
<!--      <li>{{ post.title }}</li>-->
<!--      <p>{{ post.body }}</p>-->
<!--    </ul>-->
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    async getData() {
      try {
        let response = await fetch("http://http://localhost:8090/cars/siemka");
        this.posts = await response.json();;
      } catch (error) {
        console.log(error);
      }
    },
    greet(event) {
      // `this` inside methods points to the current active instance
      alert(`Hello ${this.name}!`)
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName)
      }
    }
  },

  created() {
    this.getData();
  },
};
</script>