<template>
  <div id="wrapper" class="wrapper">
    <main-header></main-header>
    <!-- <div id="header">
      <a id="yc" href="">
      </a>
      <h1><a href="#/">vue.js test</a></h1>
      <span class="source">
          {{msg}}
        <a :href="'#/page1/'">Page1</a> |
        <a :href="'#/page2/'">Page2</a>
      </span>
    </div> -->
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>

    <main-footer></main-footer>
  </div>
</template>

<style lang="sass">
/*@import "../variables.styl"*/
.wrapper {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
}


#header {
    background-color: #f60;
    height: 24px;
    position: relative;
}
    .view {
        margin-top: 10px;
    }

//   h1
//     font-weight bold
//     font-size 13px
//     display inline-block
//     vertical-align middle
//     margin 0
//   .source
//     color #fff
//     font-size 11px
//     position absolute
//     top 4px
//     right 4px
//     a
//       color #fff
//       &:hover
//         text-decoration underline
//
// #yc
//   border 1px solid #fff
//   margin 2px
//   display inline-block
//   vertical-align middle
//   img
//     vertical-align middle
//
// .view
//   position absolute
//   background-color $bg
//   width 100%
//   transition opacity .2s ease
//   box-sizing border-box
//   padding 8px 20px
//   &.v-enter, &.v-leave
//     opacity 0
//
// @media screen and (max-width: 700px)
//   html, body
//     margin 0
//   #wrapper
//     width 100%
</style>
<script>
import mainHeader from './globals/Header.vue'
import mainFooter from './globals/Footer.vue'

    module.exports = {

        components: {
            mainHeader,
            mainFooter
        },
        data: function() {
            return {
                msg: 'ok'
            }
        },
        ready: function() {
            this.test();
        },
        methods: {
            test: function() {
                console.log($('.source'))
            }
        }
    }
</script>
