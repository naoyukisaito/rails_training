<template>
  <div class="news-view" :class="{ loading: !items.length }">
    page2
  </div>
</template>

<script>

export default {
  name: 'Page2',

  data () {
    return {
      page: 1,
      items: []
    }
  }
}
</script>

<style lang="stylus">
.news-view
  padding-left 5px
  padding-right 15px
  .nav
    padding 10px 10px 10px 40px
    margin-top 10px
    border-top 2px solid #f60
    a
      margin-right 10px
      &:hover
        text-decoration underline
</style>
