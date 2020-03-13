<template>
<form action="">
  <ErrorMessage v-if="error" :message="error"></ErrorMessage>
  <div class="modal fade show in" tabindex="-1" role="dialog" data-show="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
<div>
    <form v-on:submit.prevent="updateData">
      <div class="form-group" id="add">
        <label for="exampleInputEmail1">Title</label>
        <input
          type="text"
          v-model="taskProp.title"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone
          else.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <input
          type="text"
          v-model="taskProp.description"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
    <div class="modal-backdrop show fade in"></div>
   
  </form>
</template>
<script>
import axios from "axios";
import ErrorMessage from "./ErrorMessage"
export default {
  props:["taskProp"],
  components:{
    ErrorMessage
  },
  data() {
    return {
      error: null,
      addTitle: "",
      addDescription: ""
    };
  },
  mounted(){
    setTimeout(() => {
    console.log(this.taskProp)
      
    }, 500)
  },
  methods: {

    updateData() {
      axios({
         method:"PUT",
         url:"http://localhost:3000/kanban/"+this.taskProp.id,
         headers:{token:localStorage.token},
         data: this.taskProp
    })
        .then(response => {
          this.$emit("emitTaskUpdated")
        })
        .catch(err => {
          this.error = err.message
          // res.status(400).json({ msg: "email atau password salah" });
        });
    }
  }
};
</script>

<style scoped>
  .modal {
    display: block;
  }
</style>