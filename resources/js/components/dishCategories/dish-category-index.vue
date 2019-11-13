<template>
  <v-data-table
      :headers="headers"
      :items="categories"
      sort-by="id"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Kategorie dań</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Dodaj kategorię</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-form
                      ref="form">
                    <v-text-field v-model="editedItem.name" v-bind:rules="[required]"
                                  label="Nazwa kategorii"></v-text-field>
                  </v-form>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close" color="blue darken-1" text>Anuluj</v-btn>
              <v-btn @click="save" color="blue darken-1" text>Zapisz</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "dish-category-index",
    data() {
      return {
        _this: this,
        dialog: false,
        headers: [
          {
            text: 'ID',
            sortable: true,
            value: 'id'
          },
          {
            text: 'Nazwa',
            sortable: true,
            value: 'name'
          },
          {
            text: 'Akcje',
            value: 'action',
            sortable: false
          },
        ],
        categories: [],
        editedIndex: -1,
        editedItem: {
          id: '',
          name: ''
        },
        defaultItem: {
          id: '',
          name: ''
        },
        required: value => !!value || "To pole jest wymagane",
      };
    },
    beforeMount() {
      this.fetchCategories();
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.categories.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem(item) {
        axios.delete(route('api.dishCategory.delete', item.id))
          .then(response => {
            this.fetchCategories();
          }).catch(error => {
        });
      },
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300)
      },
      save() {
        if (this.$refs.form.validate() !== true) {
          return;
        }
        if (this.editedIndex > -1) {
          axios.post(route('api.dishCategory.update', this.editedItem.id), {
            id: this.editedItem.id,
            name: this.editedItem.name
          }).then(response => {
            this.fetchCategories();
            this.close();
          }).catch(error => {
          });
        } else {
          axios.post(route('api.dishCategory.store'), {name: this.editedItem.name})
            .then(response => {
              this.fetchCategories();
              this.close();
            }).catch(error => {
          });
        }
      },
      fetchCategories() {
        axios.get(route('api.dishCategory.index')).then(response => {
          this.categories = response.data;
        }).catch(error => {
        });
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Nowa kategoria' : 'Edycja kategorii'
      },
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
  }
</script>

<style scoped>

</style>