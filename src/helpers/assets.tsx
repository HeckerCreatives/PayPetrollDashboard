export const nftImage = (data: string) => {
  console.log(data)
  const nftMap: Record<string, string> = {
    "iron puppy": "/nft/ironpuppy.jpg",
    "shiba hulk": "/nft/shibahulk.png",
    "captain hachi": "/nft/captainhachi.jpg",
    "thor inu": "/nft/thorinu.jpg",
    "shibathanos": "/nft/shibathanos.jpg",
    "spider puppy": "/nft/spider_puppy.png",
    "black hachi": "/nft/black_hachi.png",
    "shiba widow": "/nft/shiba_widow.png",
    "doctor puppy": "/nft/doctor_puppy.png",
    "captain inu": "/nft/captain_inu.png",
    "dog pool": "/nft/dogpool.jpg",
    "hachi fury": "/nft/hachifury.jpg",
    "shibarine": "/nft/shibarine.jpg",
    "magnedog": "/nft/magnedog.jpg",
    "shibaclops": "/nft/shibaclops.jpg",
    "ant dog": "/nft/antdog.png",
    "lochi": "/nft/lochi.png",
    "hachi eye": "/nft/hachieye.png",
    "droog": "/nft/droog.png",
    "dogmora": "/nft/dogmora.png",

    "winter doggie": "/nft/winterdoggie.png",
    "dog machine": "/nft/dogmachine.png",
    "waspinu": "/nft/waspinu.png",
    "scarlet dog": "/nft/scarletdog.png",
    "quick doggie": "/nft/quickdoggie.png",
  }

  const key = data.toLowerCase()

  return nftMap[key] || undefined
}
