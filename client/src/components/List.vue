<template>
    <div class="hello">
        <div id="todo-list-example" class="container">
        <div class="row">
            <div class="col-md mx-auto">
            <h1 class="text-center">TODO LIST</h1>
            <form v-on:submit.prevent="tambahTugas">
                <label for="tambahnamatugas">Nama Tugas</label>
                <input v-model="nama_tugas" id="tambahnamatugas" class="form-control" placeholder="Tambah Tugas Baru">
                <button v-if="this.isEdit == false" type="submit" class="btn btn-success btn-block  mt-3">
                Submit
                </button>
                <button v-else type="button" v-on:click="updateTugas()" class="btn btn-primary btn-block  mt-3">
                Update
                </button>
            </form>

            <table class="table">
                <tr v-for="(todo) in todos" v-bind:key="todo.id" v-bind:title="todo.nama_tugas">
                <td class="text-left">{{todo.nama_tugas}}</td>
                <td class="text-right">
                    <button v-on:click="editTugas(todo.nama_tugas, todo.id)" class=" btn btn-info ">Edit</button>
                    <button v-on:click="hapusTugas(todo.id)" class=" btn btn-danger ">Hapus</button>
                </td>
                </tr>
            </table>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      todos: [],
      id: '',
      nama_tugas: '',
      isEdit: false
    }
  },
  mounted () {
    this.getTugas()
  },
  methods: {
    getTugas () {
      axios.get('/api/tugas').then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    tambahTugas () {
      axios.post('/api/tugas', { nama_tugas: this.nama_tugas }
      ).then((res) => {
        this.nama_tugas = ''
        this.getTugas()
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    editTugas (title, id) {
      this.id = id
      this.nama_tugas = title
      this.isEdit = true
    },
    updateTugas () {
      axios.put(`/api/tugas/${this.id}`,
        { nama_tugas: this.nama_tugas }
      ).then((res) => {
        this.nama_tugas = ''
        this.isEdit = false
        this.getTugas()
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    hapusTugas (id) {
      axios.delete(`/api/tugas/${id}`
      ).then((res) => {
        this.nama_tugas = ''
        this.getTugas()
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}

</script>
