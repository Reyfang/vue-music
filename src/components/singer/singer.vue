<template>
	<div class="singer">
		<list-view :data="singers"></list-view>
	</div>
</template>

<script type="text/javascript">
import Loading from 'base/loading/loading'
import {ERR_OK} from 'api/config'
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

	const HOT_NAME = '热门歌手'
	const HOT_SINGER_LEN = 10

	export default {
		data() {
			return {
				singers: []
			}
		},
		created() {
			this._getSingerList()
		},
		methods: {
			//获取歌手列表数据
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code === ERR_OK){
						this.singers = this._normalizeSinger(res.data.list)
						console.log(this.singers)
					}
				})
			},
			_normalizeSinger(list) {
				let map = {
					hot:{
						title: HOT_NAME,
						items: []
					}
				}
				list.forEach(( item, index) => {
					let singer = new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					})
					if(index < HOT_SINGER_LEN){
						map.hot.items.push(singer)
					}
					const key = item.Findex
					if(!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(singer)
				})

				// 排序
				let hot = []
				let ret = []
				for(let key in map){
					let val = map[key]
					if(val.title.match(/[0-9a-zA-Z]/)){
						ret.push(val)
					}else if(val.title === HOT_NAME){
						hot.push(val)
					}
				}

				ret.sort((a,b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})

				return hot.concat(ret)
			}
		},
		components: {
			Loading,
			ListView
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
		.singer-content
			height: 100%
			overflow: hidden
			.singer-list
				.item
					padding: 0 20px 20px 20px
					display: flex
					item-align: center
					box-sizing: border-box
		.text
			font-size: $font-size-mediun
			color: $color-theme
			text-align: center
</style>