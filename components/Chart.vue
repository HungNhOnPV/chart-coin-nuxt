<template>
  <div style="position: relative">
    <!-- <div class="rangeSelector">
      <button
        @click="handleFilter('day')"
        :class="{ active: timeLine === '1d' }"
      >
        1d
      </button>
      <button @click="handleFilter('')">7d</button>
      <button @click="handleFilter('')">1m</button>
      <button @click="handleFilter('')">6m</button>
      <button @click="handleFilter('')">1y</button>
      <button @click="handleFilter('')">YTD</button>
      <button @click="handleFilter('')" :class="{ active: timeLine === '' }">
        All
      </button>
    </div> -->
    <highcharts
      :constructor-type="'stockChart'"
      :options="chartOptions"
    ></highcharts>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    const _this = this;
    return {
      timeLine: "",
      chartOptions: {
        chart: {
          height: 600,
          zoomType: "x",
        },
        rangeSelector: {
          buttons: [
            {
              type: "day",
              count: 1,
              text: "1d",
              events: {
                click: function () {
                  _this.timeLine = "day";
                  _this.getApiHolder();
                },
              },
            },
            {
              type: "day",
              count: 7,
              text: "7d",
              events: {
                click: function () {
                  _this.timeLine = "day";
                  _this.getApiHolder();
                },
              },
            },
            {
              type: "month",
              count: 1,
              text: "1m",
              events: {
                click: function () {
                  _this.timeLine = "day";
                  _this.getApiHolder();
                },
              },
            },
            {
              type: "month",
              count: 6,
              text: "6m",
              events: {
                click: function () {
                  _this.timeLine = "day";
                  _this.getApiHolder();
                },
              },
            },
            {
              type: "year",
              count: 1,
              text: "1y",
              events: {
                click: function () {
                  _this.timeLine = "day";
                  _this.getApiHolder();
                },
              },
            },
            {
              type: "ytd",
              text: "YTD",
              title: "YTD",
              events: {
                click: function () {
                  _this.timeLine = "day";
                  _this.getApiHolder();
                },
              },
            },
            {
              type: "all",
              text: "All",
              events: {
                click: function () {
                  _this.timeLine = "";
                  _this.getApiHolder();
                },
              },
            },
          ],
          inputEnabled: false,
          allButtonsEnabled: true,
          verticalAlign: "top",
          buttonPosition: {
            align: "right",
          },
          inputPosition: {
            align: "left",
          },
        },
        title: {
          text: "Holders",
        },
        subtitle: {
          text:
            document.ontouchstart === undefined
              ? "Click and drag in the plot area to zoom in"
              : "Pinch the chart to zoom in",
        },
        xAxis: {
          type: "datetime",
          minRange: 3600 * 1000, // one hour
        },
        yAxis: {
          title: {
            text: "Total Holders",
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              // linearGradient: {
              //   x1: 0,
              //   y1: 0,
              //   x2: 0,
              //   y2: 1,
              // },
              // stops: [
              //   [0, "rgba(40,120,240,1)"],
              //   [1, "rgba(40,120,240,0)"],
              // ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },
        series: [
          {
            type: "area",
            name: "Holders",
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions("chart", ["getHolder"]),
    // handleFilter: function (timeLine) {
    //   this.timeLine = timeLine;
    // },
    getApiHolder: function () {
      this.getHolder({
        contractAddress: "0xc748673057861a797275cd8a068abb95a902e8de",
        timeLine: this.timeLine,
      })
        .then((res) => {
          this.chartOptions.series[0].data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getApiHolder();
  },
};
</script>
<style scoped>
/* .rangeSelector {
  position: absolute;
  z-index: 999;
  top: 50px;
  left: 20px;
}

button {
  border: none;
  font-size: 14px;
}

button.active {
  font-weight: bold;
  background: #e6ebf5;
} */
</style>
