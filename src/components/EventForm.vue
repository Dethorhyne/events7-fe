<script setup>
defineProps({
  action: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        {{ action }}
      </div>
      <div class="card-body">
        <div v-if="errors.length > 0" class="alert alert-warning" role="alert">
          <h4 class="alert-heading">Please correct the following errors to proceed:</h4>
          <p class="error-statement" v-for="(error) in this.errors">{{ error }}</p>
        </div>
        
        <div v-if="saved != ''" class="alert alert-success" role="alert">
          <p>{{ saved }}</p>
        </div>
        <ul>
        </ul>
        <div class="mb-12">
          <label for="">Name</label>
          <input ref="nameRef" name="Name" type="text" v-model="model.event.Name" class="form-control" />
        </div>
        <div class="mb-12">
          <label for="">Description</label>
          <textarea name="Description" v-model="model.event.Description" class="form-control"></textarea>
        </div>
        <div class="mb-3">
          <label for="">Type</label>
          <select class="form-select" v-model="model.event.Type">
            <option v-for="_type in types" :key="_type" :value="_type">{{ _type }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="">Priority</label>
          <select class="form-select" v-model="model.event.Priority">
            <option v-for="_priority in priorities" :key="_priority" :value="_priority">{{ _priority }}</option>
          </select>
        </div>
        <div class="mb-3">
          <button v-if="action == 'Add event'" @click="addEvent" class="btn btn-primary">Add event</button>
          <div v-if="action == 'Add event'" class="form-check form-switch">
            <input class="form-check-input" v-model="model.continue" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Continue creating events</label>
          </div>
          <button v-if="action == 'Edit event'" @click="updateEvent" class="btn btn-primary">Update event</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  name: "eventForm",
  data() {
    return {
      nameRef: null,
      priorities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      types: ['crosspromo', 'liveops', 'app', 'ads'],
      errors: [],
      saved: '',
      model: {
        continue: false,
        event: {
          EventId: 0,
          Name: '',
          Description: '',
          Type: '',
          Priority: '',

        }
      }
    }
  },
  mounted() {
    if (typeof this.$route.params.id !== 'undefined') {
      this.getEvent(this.$route.params.id);
    }
  },
  methods: {
    addEvent() {
      const view = this;
      axios.post('http://localhost:8100/events', view.model.event).then(res => {
        if (view.model.continue) {
          view.saved = `Event {${res.data}} created successfully.`;
          view.model.event.Name = '';
          view.model.event.Description = '';

          this.$refs.nameRef.focus();
          setTimeout(function(){
            view.saved = "";            
          },2000);
        }
        else {
          view.$router.push(`/events/${res.data}`);
        }
      }).catch(err => {
        view.errors = err.response ? typeof err.response.data.message === "string" ? [err.response.data.message] : err.response.data.message : [];
      })
    },
    getEvent(eventId) {
      const view = this;
      axios.get(`http://localhost:8100/events/${eventId}`).then(res => {
        view.model.event = res.data;
      }).catch(err => {
        view.errors = err.response ? typeof err.response.data.message === "string" ? [err.response.data.message] : err.response.data.message : [];
      });
    },
    updateEvent() {
      const view = this;
      axios.put(`http://localhost:8100/events/${view.model.event.EventId}`, view.model.event).then(res => {
        view.saved = "Event updated successfully.";
        
        setTimeout(function(){
            view.saved = "";            
          },2000);
      }).catch(err => {
        view.errors = err.response ? typeof err.response.data.message === "string" ? [err.response.data.message] : err.response.data.message : [];
      })
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

.error-statement {
  margin: 0;
  display: block;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
