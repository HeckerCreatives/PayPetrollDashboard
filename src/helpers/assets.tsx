export const nftImage = (data: string) => {
    if(data.toLowerCase() === 'iron puppy'){
        return '/nft/ironpuppy.jpg'
    }else if(data === 'Shiba Hulk'){
        return '/nft/shibahulk.png'
    }else if(data === 'Captain Hachi'){
        return '/nft/captainhachi.jpg'
    }else if(data === 'Thor Inu'){
        return '/nft/thorinu.jpg'
    }else if (data === 'Shibathanos') {
        return '/nft/shibathanos.jpg'
    }else if (data === 'Spider Puppy') {
        return '/nft/spider_puppy.png'
    }else if (data === 'Black Hachi') {
        return '/nft/black_hachi.png'
    }else if (data === 'Shiba Widow') {
        return '/nft/shiba_widow.png'
    }else if (data === 'Doctor Puppy') {
        return '/nft/doctor_puppy.png'
    }else if (data === 'Captain Inu') {
        return '/nft/captain_inu.png'
    }
}