<template>
  <section class="wrapper">
    <form autocomplete="true" class="center d-flex" style="width: 800px">
      <md-autocomplete
        v-model="value"
        :md-options="countries"
        @md-changed="getCountries"
        @md-opened="getCountries"
      >
        <label>Enter token name/address...</label>

        <template
          slot="md-autocomplete-item"
          slot-scope="{ item }"
          style="width: 800px"
          ><div @click="handleAddFavorite(item.address)">
            {{ item.name }} : {{ item.address }}
          </div></template
        >
      </md-autocomplete>
      <md-button
        @click="$router.push({ name: 'favorite' })"
        class="md-raised md-primary mt-3 ml-3"
        style="width: 200px"
        >Show Favorite</md-button
      >
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: "local",
  data: () => ({
    value: null,
    countries: [],
  }),
  computed: {
    ...mapGetters("chart", ["local"]),
  },
  methods: {
    ...mapActions("chart", ["getContractAddress", "createContractAddress"]),
    getCountries(searchTerm) {
      this.countries = new Promise((resolve, reject) => {
        window.setTimeout(() => {
          this.getContractAddress({
            contractAddress: searchTerm,
          })
            .then((res) => {
              const listContractAddress = [];
              res.data.forEach((item) => {
                return listContractAddress.push(item.address);
              });
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        }, 500);
      });
    },
    handleAddFavorite: function (address) {
      this.createContractAddress({
        contractAddress: address,
        local: this.local,
      })
        .then(() => {
          this.$router.push({
            name: "chart",
            query: { contractAddress: address },
          });
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  watch: {
    value: function () {
      if (this.value !== "") {
        this.disabled = false;
      } else this.disabled = true;
    },
  },
};
</script>

<style lang="css">
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #262626;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}
input[type="text"] {
  background-color: #f1f1f1;
  width: 100%;
}
.md-field::after {
  background: #fff !important;
}
input[type="submit"] {
  background-color: DodgerBlue;
  color: #fff;
}
.md-field.md-theme-default label {
  color: #fff;
}
.md-field.md-theme-default.md-has-value .md-input {
  color: #fff;
  -webkit-text-fill-color: #fff;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
.md-icon.md-theme-default.md-icon-image svg {
  fill: #fff;
}
.md-autocomplete {
}
</style>