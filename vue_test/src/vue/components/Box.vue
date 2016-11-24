<template>
    <div class="box">
        {{ color }}
    </div>
</template>

<script>
    export default {

        name: 'Box',
        data: {
            'color': [
                'red',
                'blue',
                'green',
                'orange'
            ]
        }
    }
</script>
