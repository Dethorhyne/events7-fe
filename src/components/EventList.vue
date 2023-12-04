<script setup>

</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Events
          <RouterLink to="/events/create" class="btn btn-primary float-end">Add event</RouterLink>
        </h4>

      </div>
      <div class="card-body">
        <div v-if="errors.length > 0" class="alert alert-warning" role="alert">
          <h4 class="alert-heading">Please correct the following errors to proceed:</h4>
          <p class="error-statement" v-for="(error) in this.errors">{{ error }}</p>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Event Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="this.events.length > 0">
            <tr v-for="(event, index) in this.events" :key="index">
              <td>{{ event.EventId }}</td>
              <td>{{ event.Name }}</td>
              <td>{{ event.Description }}</td>
              <td>{{ event.Type }}</td>
              <td>{{ event.Priority }}</td>
              <td>
                <RouterLink :to="'/events/' + event.EventId" class="btn btn-success">Edit</RouterLink>
                <button type="button" @click="deleteEvent(event.EventId)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" style="text-align:center;">No events available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'events',
  data() {
    return {
      errors: [],
      events: []
    }
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      const view = this;
      axios.get('http://localhost:8100/events').then(res => {
        view.events = res.data;
      }).catch(err => {
        view.errors = err.response ? typeof err.response.data.message === "string" ? [err.response.data.message] : err.response.data.message : [];
      })
    },
    deleteEvent(eventId) {
      const view = this;
      if (confirm("Are you sure you want to delete this event?")) {
        axios.delete(`http://localhost:8100/events/${eventId}`).then(res => {
          view.getEvents();
        }).catch(err => {
          view.errors = err.response ? typeof err.response.data.message === "string" ? [err.response.data.message] : err.response.data.message : [];
        })
      }
    }
  }
}

</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
