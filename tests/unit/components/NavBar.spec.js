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
        searchedTvShow:[]
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
          $route: {  },
        },
        stubs: ['router-link', 'router-view'],
        store, localVue
      });
  
  });

  test("Search works correctly after input change", async () => {
    const input = wrapper.find(".search");
    const show = "Game of Thrones";
    input.element.value = show;
    input.trigger("input");

    // Wait for the debounce time
    await new Promise((resolve) => setTimeout(resolve, 1001));

    expect(actions.searchTvShows).toHaveBeenCalled();
    expect(actions.searchTvShows).toHaveBeenCalledWith(expect.any(Object), show);
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
    name: 'searchedTvShows',
    params: { name: show },
  });
  });

//   test("Toggle search input focus", () => {
    
//     const searchIcon = wrapper.find("img");
//     const input = wrapper.find(".search");

//     searchIcon.trigger("click");
//     expect(wrapper.vm.isSearchOpen).toBe(true);
//     //expect(input.element).toBe(document.activeElement);

//     searchIcon.trigger("click");
//     expect(wrapper.vm.isSearchOpen).toBe(false);
//     expect(input.element).not.toBe(document.activeElement);
//   });

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