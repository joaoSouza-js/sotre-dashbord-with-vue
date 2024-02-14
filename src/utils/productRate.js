export function productRate(rate = 0) {
    const productRatingInteger = Math.floor(Number(rate))
    const hasHalfStar = rate - productRatingInteger > 0
    const startRateList = Array.from(
        {
            length: productRatingInteger
        },
        (_, index) => index
    ) ?? []

    return {
        startRateList,
        hasHalfStar,
        rate,
    }
}