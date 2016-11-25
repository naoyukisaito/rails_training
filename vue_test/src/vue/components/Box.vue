<template>
    <div class="box">
        <a href="" class="{{item.color}}">{{ item.color }}</a>
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
                    {color: 'yellow'}
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
            transition: all .3s;

            &:hover {
                opacity: 0.8;
            }
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
    .yellow {
    background-color: gold;
    }
</style>
