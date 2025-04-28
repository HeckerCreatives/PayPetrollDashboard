export const petRanks = (data: string) => {
    if (data === 'Novice'){
        return 'Novice'
    } else if (data === 'Expert'){
        return 'Expert'
    } else {
        return 'Elite'
    }
}