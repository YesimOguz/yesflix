/* global describe, test, expect, beforeEach, jest */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NavBar from "../../../src/components/NavBar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("NavBar.vue", () => {
  let store;
  let actions;
  let state;
  let wrapper;

  beforeEach(() => {
    actions = {
      searchTvShows: jest.fn(),
      logout: jest.fn(),
    };
    state = {
      Auth: {
        user: {},
      },
      TvShow:{
        searchedTvShows:[]
      }
    };
    store = new Vuex.Store({
      actions,
      state,
    });

    wrapper = shallowMount(NavBar, {
      mocks: {
        $router: {
          push: jest.fn(),
        },
        $route: { params:{name:''}, name:'' },
      },
      stubs: ['router-link', 'router-view'],
      store,
      localVue
    });
  });

  test("Search works correctly after input change", async () => {
    const input = wrapper.find(".search");
    const show = "Game of Thrones";
    input.element.value = show;
    input.trigger("input");

    await new Promise((resolve) => setTimeout(resolve, 1001));

    expect(actions.searchTvShows).toHaveBeenCalled();
    expect(actions.searchTvShows).toHaveBeenCalledWith(expect.any(Object), show);
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'searchedTvShows',
      params: { name: show },
    });
  });

  test("Logout button is visible when user is logged in", () => {
    const logoutButton = wrapper.find(".logout");
    expect(logoutButton.exists()).toBe(true);
  });

  test("Logout button triggers logout action when clicked", () => {
    const logoutButton = wrapper.find(".logout");
    logoutButton.trigger("click");
    expect(actions.logout).toHaveBeenCalled();
  });
});
