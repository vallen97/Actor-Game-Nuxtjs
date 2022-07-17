<template>
  <div class="home">
    <!-- <NuxtWelcome /> -->
    <!-- Search for actor -->
    <div>
      <div class="container search">
        <h1>NOTE: Color Thieft doesnt work beacuse of CORS error</h1>
        <h3>TODO:</h3>
        <p>Make another every element</p>
        <p>Start the comparison between actors/actress</p>
        <!-- Hide the image until there is an actor to show -->
        <div v-if="searchActors1.length > 1">
          <!-- <img src="pic_trulli.jpg" alt="Trulli" width="500" height="333" /> -->
        </div>
        <h3>Note:</h3>
        <p>
          use
          https://developers.themoviedb.org/3/people/get-person-combined-credits
        </p>
        <p>To get all of the movies the actor has been in</p>
        <h3>Note:</h3>
        <p>https://developers.themoviedb.org/3/movies/get-movie-credits</p>

        <p>{{ searchInput }}</p>
        <input
          type="text"
          placeholder="Search For Actor"
          @keyup.enter="$fetch"
          v-model.lazy="searchInput"
        />
        <button @click="searchByActor(searchInput)">Search</button>
        <!-- <button @click="$fetch">Search</button> -->
        <!-- BUtton shoes when there is text in the input  -->
        <button v-show="searchInput !== ''" @click="clearSearch" class="button">
          Clear Search
        </button>
        <h3>TODO: start the compare</h3>
      </div>
    </div>
  </div>

  <p>Carousel Below</p>
  <br /><br />

  <swiper
    class="swiperClass"
    :modules="modules"
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    navigation
    ref="actorCarousel"
  >
    <swiper-slide v-for="SA in searchActors1" :key="SA.id">
      <center>
        ~
        <div class="card">
          <center>
            <img
              v-bind:src="'http://image.tmdb.org/t/p/w500/' + SA.profile_path"
            />
          </center>
          <p>Name: {{ SA.name }}</p>
          <p>known For:</p>
          <ul>
            <li v-for="known in SA.known_for" :key="known.id">
              {{ known.original_title }}
            </li>
          </ul>
          <input
            type="checkbox"
            ref="checkboxActor"
            v-bind:id="SA.id"
            name="actor1"
          />
          <label for="actor1"> Actor Name Here</label><br />
        </div>
      </center>
    </swiper-slide>
  </swiper>
  <button @click="compareActors" class="button">compare</button>
  <button @click="getMostKnown" class="button">Get Most Known</button>
  <h3>Compare List here</h3>
  <li></li>
</template>

<script lang="ts">
import {
  searchActor,
  getMovieCredits,
  getActorMostKnown,
} from ".nuxt/service/movieDBAPI";
import { MovieDBTypes } from ".nuxt/types/movieDBTypes";
import { MoviedbMovieCreditsTypes } from ".nuxt/types/movieDBMovieCreditsTypes";
import { MovieDBActorMostKnownTypes } from ".nuxt/types/movieDBActorMostKnownTypes";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import ColorThief from "colorthief";

// import swiper module styles
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "nuxt/dist/head/runtime/components";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  name: "Actor Game",
  components: {
    // Carousel,
    // Slide,
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.$nextTick((): void => {});
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  head() {
    return {
      title: "Actor Game",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Get all the latest streaming movies in theaters & online",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "movies, stream, stremaing",
        },
      ],
    };
  },

  data() {
    return {
      data: {},
      dataActor: {} as MovieDBTypes,
      dataMovieCredits: {} as MoviedbMovieCreditsTypes,
      dataActorMostKnown: {} as MovieDBActorMostKnownTypes,
      actor: [],
      searchInput: "",
      searchActors1: [],
      searchActors2: [],
      actor1Image: "",
      actor2Image: "",
      palette: [],
      actor1MoviesID: [],
      actor2MoviesID: [],
      //  Will Ferrell
      tempActor1ID: 23659,
      // John C. Reilly
      tempActor2ID: 4764,
      // // Daniel Radcliffe
      // tempActor4ID: 10980,
      // // Charlie Sheen
      // tempActor1ID: 6952,
    };
  },
  async fetch() {
    if (this.searchInput === "") {
      console.log("Looking for default actor");

      await this.getActor();
      return;
    }
    if (this.searchInput !== "") {
      console.log("looking for actor");

      // await this.searchActor();
      const value = await searchActor(this.searchInput);
    }
  },
  fetchDelay: 1000,
  methods: {
    clearSearch() {
      this.searchInput = "";
      this.searchActors1 = [];
      this.actor = [];
      this.searchInput = "";
      this.searchActors1 = [];
      this.searchActors2 = [];
    },
    async compareActors() {
      // IF the actor/actress are in the same movie
      // TODO: Need to loop through the movies and getting credits to check if the people are in the same movie
      // Note: To do this
      // 1: Random both arrays
      //    Search and compare
      //    1: If there is a match show
      //    2: if there is not a match
      //      Goto the 2 inital arrays and repeat
      // 2: Or Sort both arrays and search and compare as above

      var similarMovies: Array<number> = [];
      var related: boolean = false;

      console.log("TODO: Compare these");

      // Sort the arrays
      this.actor1MoviesID = this.sortMovieIDs(this.actor1MoviesID);
      this.actor2MoviesID = this.sortMovieIDs(this.actor2MoviesID);
      // Need To optimize
      console.log(
        this.actor1MoviesID.length,
        " X ",
        this.actor2MoviesID.length,
        " = ",
        this.actor1MoviesID.length * this.actor2MoviesID.length
      );

      for (let i = 0; i < this.actor1MoviesID.length; i++) {
        for (let j: number = 0; j < this.actor2MoviesID.length; j++) {
          if (this.actor1MoviesID[i] == this.actor2MoviesID[j]) {
            similarMovies.push(this.actor1MoviesID[i]);
            break;
          }
          console.log("Numbers are not the same");
        }
      }
      console.log(similarMovies);

      // If the actors or actress do not play in the same movie
      // so we check if any actors/actress in a movie they were in
      // the same movie
      if (!related) {
        console.log(
          "Need to the first number in both actor movie ids, and get the cast and do the same thing"
        );
        this.secondCompare(this.actor1MoviesID, this.actor2MoviesID);
      }

      // Todo: make sure that there is something in the arrays
      /* 
      // if (this.$refs.checkboxActor == "undefined") {
      var actorsID: Array<number> = [];
      var checkboxes: any = this.$refs.checkboxActor;
      console.log("Checkboxes", checkboxes);
      for (let i = 0; i < checkboxes.length; i++) {
        console.log(i, "Is checked " + checkboxes[i].checked);
        if (checkboxes[i].checked) actorsID.push(checkboxes[i].id);
      }
      if (actorsID.length == 2) this.compareActorIDs(actorsID[0], actorsID[1]);
      console.log("Comparing actors by ID", actorsID.toString());
*/
      // const movieValue = await getActorMostKnown(70851)
      // if (actorsID.length < 2) {
      //   console.log(
      //     "There needs to be a lease two actors and you have selected ",
      //     actorsID.length
      //   );
      // }
      // } else {
      //   console.log("Please selected two actors");
      // }
    },
    // Note: This function is useded when there is not a comparison betten the first compare
    //       Where we use just compare the IDs
    //       This function is to the credits of the credits of the first movie
    //       and see if there are any actors shared
    async secondCompare(
      actor1IDArray: Array<number>,
      actor2IDArray: Array<number>
    ): Promise<Array<number>> {
      //TODO: Rename the variable to something else
      let returnArray: Array<number> = [];
      let tempReturn1;
      let tempReturn2;
      let temp1;
      let temp2;
      let temp1Name: Array<string> = [];
      let temp1ID: Array<number> = [];
      let temp2Name;
      let temp2ID;
      console.log("you dhould be working on SecondCompare");
      // TODO: Get the arrays that contain acting as a roll
      //       dictionary that contains tha actor id and movie id
      // get the first id and compare to the second array
      for (let i = 0; i < actor1IDArray.length; i++) {
        for (let j = 0; j < actor2IDArray.length; j++) {
          temp1 = await getMovieCredits(actor1IDArray[i]);
          temp2 = await getMovieCredits(actor2IDArray[i]);
          console.log("Temp");
          console.log(temp1["cast"]);

          // get the credits from a movie
          for (let x: number = 0; x < temp1["cast"].length; x++) {
            // check if id is already in array because ID is more unique
            if (!temp1ID.includes(temp1["cast"][x].id)) {
              temp1Name.push(temp1["cast"][x].name);
              temp1ID.push(temp1["cast"][x].id);
            }
          }
          console.log("Temp");
          console.log(temp1Name);

          // for (let y: number = 0; y < temp2[j].length; y++) {}

          console.log("Get credits and compare");

          console.log("getMovieCredits(actor1IDArray[", i, "])");

          console.log(await getMovieCredits(actor1IDArray[i]));
          break;
        }
        if ((i = 2)) break;
      }

      return returnArray;
    },
    async searchByActor(search: string): Promise<void> {
      // NOTE: Jumanji Movie ID = 353486
      // const movieValue = await getMovieCredits(353486);

      // NOTE: Jack Black actorID = 70851
      // const movieValue = await getActorMostKnown(70851);

      console.log("Something");

      const carousel = this.$refs.actorCarousel;
      this.clearSearch();
      const value = await searchActor(search);
      // this.searchActors1[0] = value;
      this.data = value;
      console.log("this.data.results.length", this.data.results);

      for (let i = 0; i < this.data.results.length; i++) {
        console.log(this.data.results[i]);
        this.searchActors1.push(this.data.results[i]);
      }
      // this.actor1Image = this.data.results
    },
    async compareActorIDs(id1: number, id2: number): Promise<void> {
      const actor1MostKnown = await getActorMostKnown(id1);
      const actor2MostKnown = await getActorMostKnown(id2);

      for (let i = 0; i < actor1MostKnown["cast"].length; i++) {
        if (actor1MostKnown["cast"][i]["media_type"] != "movie")
          this.actor1MoviesID.push(actor1MostKnown["cast"][i]["id"]);
      }

      for (let i = 0; i < actor2MostKnown["cast"].length; i++) {
        this.actor2MoviesID.push(actor2MostKnown["cast"][i]["id"]);
      }

      console.log(this.actor1MovieID, this.actor2MovieID);

      // for (let i = 0; this.actor1MoviesID.length; i++) {
      //   if (this.actor1MoviesID[i] == this.actor2MoviesID[i]) {
      //     console.log(
      //       "These IDs are the same",
      //       this.actor1MoviesID[i],
      //       this.actor2MoviesID[i]
      //     );
      //     console.log(
      //       "These actors share the same movie and get the ID and search for the movie"
      //     );
      //   } else {
      //     console.log(
      //       "These IDs are not the same and grab first movie of actor 1"
      //     );
      //     console.log(
      //       "And check the ids of movie 1 of actor 2 until the end then start"
      //     );
      //     console.log("Actor 1 movie 2 and do the same until the end");
      //   }
      // }

      console.log("compareActorIDs");
      console.log("actor1MoviesID below");

      console.log(this.actor1MoviesID);
      console.log("Actor 2 ID below");
      console.log(this.actor2MoviesID);
    },
    // async getMostKnown(id1: number, id2: number): Promise<void> {
    async getMostKnown(): Promise<void> {
      // Temp IDs Must delete
      let id1: number = 23659;
      let id2: number = 4764;

      // Get the most known movies that the actor/actress have been in
      this.actor1MoviesID = await this.returnMostKnown(id1);
      this.actor2MoviesID = await this.returnMostKnown(id2);
    },
    async returnMostKnown(actorID: number): Promise<any[]> {
      let movieIDs: Array<number> = [];

      const actor2MostKnown = await getActorMostKnown(actorID);

      // TODO: need to put into a funtion vecause there are two
      for (let i = 0; i < actor2MostKnown["cast"].length; i++) {
        if (actor2MostKnown["cast"][i]["media_type"] == "movie")
          movieIDs.push(actor2MostKnown["cast"][i]["id"]);
      }
      return movieIDs;
    },
    sortMovieIDs(movieidsArr: Array<number>): Array<number> {
      movieidsArr.sort(function (a: number, b: number) {
        return a - b;
      });
      return movieidsArr;
    },


  },
  watch: {
    searchInput() {
      console.log(this.searchInput);
    },
  },
};
</script>

<style lang="css">
.swiper-button-next,
.swiper-button-prev {
  color: black;
}
img {
  height: 125px;
  width: auto;
  outline-color: black;
}
.swiperClass {
  height: 75vh;
  background-color: aqua;
}

.card {
  width: 20vw;
  background-color: blue;
  height: auto;
}
.card img {
  margin-top: 2.5vh;
}
</style>
