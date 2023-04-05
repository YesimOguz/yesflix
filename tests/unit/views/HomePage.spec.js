/* global describe, it, expect, beforeEach, jest */
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import HomePage from "../../../src/views/HomePage.vue";
import SearchLoader from "../../../src/components/SearchLoader.vue";
import TvShowsCarouselByGenre from "../../../src/components/TvShowsCarouselByGenre.vue";
import DetailsModal from "../../../src/components/DetailsModal.vue";
import Carousel3d from 'vue-carousel-3d';


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Carousel3d)

describe("HomePage.vue", () => {
  let store;
  let actions;
  let state;
  let wrapper;

  beforeEach(() => {
    state = {
        TvShow:{
            tvShows:[]
          }
    };

    actions = {
      getTvShows: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      actions,
    });
    wrapper = mount(HomePage, {
        localVue,
        store,
        stubs: {
          TvShowsCarouselByGenre: true,
          DetailsModal: true,
          SearchLoader: true,
        },
      });
  });

  it("dispatches the 'getTvShows' action when mounted", async() => {

    await wrapper.vm.$nextTick()
    expect(actions.getTvShows).toHaveBeenCalled();
  });

  it("displays the 'SearchLoader' component when isLoaded is false", async() => {
    const wrapper = mount(HomePage, {
      localVue,
      store,
      data() {
        return {
          isLoaded: false,
        };
      },
      stubs: {
        TvShowsCarouselByGenre: true,
        DetailsModal: true,
        SearchLoader: SearchLoader,
      },
    });
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(SearchLoader).exists()).toBe(true);
  });

  it("displays 'No Tv Shows found!' if there are no tvShows", async() => {
    const tvShows = []
    const wrapper = mount(HomePage, {
      localVue,
      store,
      computed: {
        tvShows: () => tvShows,
      },
      data() {
        return {
          isLoaded: true,
        };
      },
      stubs: {
        TvShowsCarouselByGenre: true,
        DetailsModal: true,
        SearchLoader: true,
      },
    });
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain("No Tv Shows found!");
  });

  it("displays 'TvShowsCarouselByGenre' and 'DetailsModal' components if tvShows are present", async() => {
    const tvShows = [
      {
        id: 1,
        name: "Breaking Bad",
        rating: { average: 9.5 },
        genres: ["Drama", "Crime"],
        image: { medium: "http://example.com/image.jpg" },
      },
      {
        id: 2,
        name: "Game of Thrones",
        rating: { average: 9.0 },
        genres: ["Drama", "Fantasy"],
        image: { medium: "http://example.com/image.jpg" },
      },
    ];

    const wrapper = mount(HomePage, {
      localVue,
      store,
      computed: {
        tvShows: () => tvShows,
      },
      data() {
        return {
          isLoaded: true,
        };
      },
      stubs: {
        TvShowsCarouselByGenre: TvShowsCarouselByGenre,
        DetailsModal: DetailsModal,
        SearchLoader: true,
      },
    });
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(TvShowsCarouselByGenre).exists()).toBe(true);
    expect(wrapper.findComponent(DetailsModal).exists()).toBe(true);
  });
});