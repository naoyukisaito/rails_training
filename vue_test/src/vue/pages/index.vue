<template lang="html">
	<div class="content">
		<box v-for="item in colors"></box>
	</div>
</template>



<script>
	import box from '../components/Box.vue'

	export default {
		name: 'Home',
		components: {
			box
		},
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

<style scoped>

</style>
