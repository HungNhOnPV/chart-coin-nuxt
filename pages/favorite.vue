<template>
  <section class="wrapper">
    <md-button
      @click="handleAddFavorite()"
      class="md-raised md-primary mb-3"
      style="width: 200px"
      >Add Favorite</md-button
    >
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Contract Address</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in listFavorite"
          :key="index"
          @click="
            $router.push({
              name: 'chart',
              query: { contractAddress: item },
            })
          "
          style="cursor: pointer"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: "local",
  data() {
    return {
      listFavorite: [],
    };
  },
  computed: {
    ...mapGetters("chart", ["local"]),
  },
  methods: {
    ...mapActions("chart", ["getFavoriteCoin"]),
    handleAddFavorite: function () {
      this.$router.push({ name: "index" });
    },
  },
  created() {
    this.getFavoriteCoin({ local: this.local })
      .then((res) => {
        this.listFavorite = res.data.data.coin;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: #343a3f;
  min-height: 100vh;
  padding: 50px 50px;
}
</style>