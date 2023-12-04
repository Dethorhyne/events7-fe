<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Events7</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/events">Events</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav li {
  border-left: 1px solid var(--color-border);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav li:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    font-size: 1rem;
  }
}
</style>
