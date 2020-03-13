<template>
  <button @click="deleteKanban(id)">Delete</button>
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
    deleteKanban(id) {
      axios.delete(`http://localhost:3000/kanban/${id}`, {
        
      }).then(response=>{
          
      }).catch(err=>{
        // res.status(400).json({msg:"email atau password salah"})
      })
    }
  }
};
</script>