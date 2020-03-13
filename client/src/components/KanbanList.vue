<template>
  <!-- Backlog start -->
  <div class="d-flex" id="main">
    <div class="flex-row col-3">
      <div class="rounded category">
        <div class="content-box text-dark d-flex flex-column contain mt-3">
          <div class="title ml-3">
            <h5>Backlog</h5>
          </div>
          <div class="contain">
            <div class="task rounded container bg-light mb-3 ml-auto" v-for="task in kanban.backlog" :key="task.id">
                
             <div class="content">{{task.id}}</div>
             <div class="content">{{task.title}}</div>
             <div class="content">{{task.description}}</div>
             <div>
                <button @click.prevent="deleteKanban(task)" class="btn btn-primary">Delete</button>
                <button @click.prevent="updateKanban(task)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>                
                <button @click.prevent="nextKanban(task)">Next</button>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <!-- Backlog End -->

    <!-- Product start  -->
    <div class="flex-row col-3">
      <div class="rounded category">
        <div class="content-box text-dark d-flex flex-column contain mt-3">
          <div class="title ml-3">
            <h5>Product</h5>
          </div>
          <div class="contain">
            <div class="task rounded container bg-light mb-3 ml-auto" v-for="task in kanban.product" :key="task.id">
                
             <div class="content">{{task.id}}</div>
             <div class="content">{{task.title}}</div>
             <div class="content">{{task.description}}</div>
             <div>
                <button @click.prevent="deleteKanban(task)">Delete</button>
                <button @click.prevent="updateKanban(task)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>                
                <button @click.prevent="nextKanban(task)">Next</button>
                <button @click.prevent="backKanban(task)">Back</button>
            </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    <!-- Product end  -->

    <!-- Development start  -->
    <div class="flex-row col-3">
      <div class="rounded category">
        <div class="content-box text-dark d-flex flex-column contain mt-3">
          <div class="title ml-3">
            <h5>Development</h5>
          </div>
          <div class="contain">
            <div class="task rounded container bg-light mb-3 ml-auto" v-for="task in kanban.development" :key="task.id">
                
             <div class="content">{{task.id}}</div>
             <div class="content">{{task.title}}</div>
             <div class="content">{{task.description}}</div>
            <div>
                <button @click.prevent="deleteKanban(task)">Delete</button>
                <button @click.prevent="updateKanban(task)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>                
                <button @click.prevent="nextKanban(task)">Next</button>
                <button @click.prevent="backKanban(task)">Back</button>
            </div>
        </div>
            
          </div>
        </div>
      </div>
    </div>

    <!-- Development end  -->

    <!-- Done start  -->
    <div class="flex-row col-3">
      <div class="rounded category">
        <div class="content-box text-dark d-flex flex-column contain mt-3">
          <div class="title ml-3">
            <h5>Done</h5>
          </div>
          <div class="contain">
             <div class="task rounded container bg-light mb-3 ml-auto" v-for="task in kanban.done" :key="task.id">
                
             <div class="content">{{task.id}}</div>
             <div class="content">{{task.title}}</div>
             <div class="content">{{task.description}}</div>
             <div>
                <button @click.prevent="deleteKanban(task)">Delete</button>
                <button @click.prevent="updateKanban(task)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>                
                <button @click.prevent="backKanban(task)">Back</button>
            </div>
            </div>
            
          </div>
        </div>
      </div>
      <AddKanban v-if="showFormAdd" @emitAddCardKanban="addCardKanban" @emitCloseForm="closeAdd"></AddKanban>
    <button @click.prevent="showAdd()" class="btn btn-primary">Add</button>
      <UpdateKanban v-if="UpdateKanban" :taskProp="currentEditTask" @emitTaskUpdated="closeEditForm"></UpdateKanban>
         </div>
    </div>
  <!-- Done end  -->
 
</template>

<script>
import axios from "axios"
import UpdateKanban from "./UpdateKanban";
import AddKanban from "./AddKanban";
export default {
  components:{
UpdateKanban,
AddKanban    
  },
  data() {
      return{
          kanban: {},
          showFormAdd: false,
          UpdateKanban: false,
          currentEditTask: {}
      }
  },created(){
    this.getKanban()
  },
  
  watch: {
    kanban() {
      console.log('kanban changed')
    }
  },
  methods: {
      getKanban(){
          axios({
            method:"GET",
            url:"http://localhost:3000/kanban",
            headers:{token: localStorage.getItem("token")}

          })
          .then(response =>{
            console.log('kanban request success')
            const cards= response.data
            const kanban = {}
            cards.forEach(card =>{
              if(!kanban[card.status]){
                kanban[card.status]=[]
              } kanban[card.status].push(card)
            })
            this.kanban = kanban;
          }).catch(err =>{
            console.log(err)
              //res.status(400).json(err)
          })
      },
      deleteKanban(task){
        
          axios({
            method:"DELETE",
            url:"http://localhost:3000/kanban/"+task.id,
            headers:{token:localStorage.getItem("token")}
          }).then(data=>{
              this.getKanban()
          }).catch(err =>{

          })
      },


      updateKanban(task){
          this.UpdateKanban = true;
          this.currentEditTask = {...task}
      },
      closeEditForm(){
        this.UpdateKanban = false;
        this.getKanban()
      },

      showAdd() {
      this.showFormAdd = true;
    },
    closeAdd(){
      this.showFormAdd = false;
    },
    addCardKanban(){
      this.getKanban()
    },
      nextKanban(task){
        if(task.status ==='backlog'){
          task.status = 'product'
        } else if(task.status === "product"){
          task.status = "development"
        } else if(task.status === "development"){
          task.status = "done"
        }

          axios({
            url:"http://localhost:3000/kanban/" + task.id,
            method:"PUT",
            data:task,
              headers:{token: localStorage.getItem("token")}
          }
          ).then(response=>{
            this.getKanban()
          }).catch(err=>{
             // res.status(400).json({msg:"error nextnya coy"})
          })
      },
      backKanban(task){
        if(task.status==="done"){
          task.status = "development"
        } else if (task.status === "development"){
          task.status = "product"
        } else if (task.status === "product"){
          task.status = "backlog"
        }   
          axios({
            method:"PUT",
            url:"http://localhost:3000/kanban/"+task.id,
            data:task,
            headers:{token:localStorage.getItem("token")}
          }).then(response=>{
            this.getKanban()
          }).catch(err=>{

          })
      },
      
  }
};
</script>