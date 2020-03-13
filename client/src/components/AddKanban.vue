<template>
  <div>
    <form v-on:submit.prevent="addData">
      <div class="form-group" id="add">
        <label for="exampleInputEmail1">Title</label>
        <input
          type="text"
          v-model="addTitle"
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
          v-model="addDescription"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      addTitle: "",
      addDescription: ""
    };
  },
  methods: {
    addData() {
        axios({
            method:'POST',
            url:"https://hidden-scrubland-28835.herokuapp.com/kanban",
            data:{
                title: this.addTitle,
                description: this.addDescription
            },
            headers:{token:localStorage.getItem("token")}
        }).then(response=>{
          this.$emit("emitAddCardKanban")
          this.$emit("emitCloseForm")
      }).catch(err=>{
        console.log(err)
        //res.status(400).json({msg:"email atau password salah"})
      })
    }
  }
};
</script>