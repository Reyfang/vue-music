<template>
	<div class="loading">
		<img src="./loading.gif" height="227" width="177">
		<p class="desc">{{title}}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			title: {
				type: String,
				default: "求豆麻袋..."
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.loading
		width: 100%
		text-align: center
		.desc
			line-height: 20px
			font-size: $font-size-small
			color: $color-text-l
</style>