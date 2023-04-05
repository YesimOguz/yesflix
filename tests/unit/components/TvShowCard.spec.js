/* global describe, it, expect */
import TvShowCard from "../../../src/components/TvShowCard.vue";

import { shallowMount } from '@vue/test-utils'

describe('TvShowCard', () => {
  it('emits clickedImage event when image is clicked', async() => {
    const tvShow = {
      id: 1,
      name: 'Stranger Things',
      image: {
        medium: 'https://example.com/stranger-things-medium.jpg'
      },
      rating: {
        average: 8.5
      }
    }
    const wrapper = shallowMount(TvShowCard, {
      propsData: {
        tvShow,
        dataIndex:5,
        classForCarousel:{}


      }
    })

    wrapper.find('.img').trigger('click')

    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('clickedImage')).toBeTruthy()
    expect(wrapper.emitted('clickedImage')[0][0]).toEqual(tvShow)
  })
})
