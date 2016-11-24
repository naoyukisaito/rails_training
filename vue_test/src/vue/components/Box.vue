<template>
    <div class="box {{item.color}}" v-for="item in colors">
        <a href="">{{ item.color }}</a>
    </div>
</template>

<script>
    export default {

        name: 'Box',
        data: function() {
            return {
                colors: [
                    {color: 'red'},
                    {color: 'blue'},
                    {color: 'green'},
                    {color: 'orange'}
                ]
            }
        }
    }
</script>

<style lang="sass">
    .box {
        display: inline-block;
        width: 50%;
        height: 100px;
        text-align: center;
        line-height: 100px;

        a {
            display: block;
        }
    }
    .red {
        background-color: salmon;
    }
    .blue {
    background-color: lightblue;
    }
    .green {
    background-color: lightgreen;
    }
    .orange {
    background-color: orange;
    }
</style>
