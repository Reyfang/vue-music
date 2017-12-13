export default class Singer {
	constructor(item) {
		this.id = item.id
		this.name = item.name
		this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.id}.jpg?v=`+ IMG_VER
	}
}

export const IMG_VER = Math.random() * (~~ new Date())