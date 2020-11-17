import color from "color-convert";

export const colors = {
    state: {
        100: color.hex.rgb('EBF8FF'),
        200: color.hex.rgb('BEE3F8'),
        300: color.hex.rgb('90CDF4'),
        400: color.hex.rgb('63B3ED'),
        500: color.hex.rgb('4299E1'),
        600: color.hex.rgb('3182CE'),
        700: color.hex.rgb('2B6CB0'),
        800: color.hex.rgb('2C5282'),
        900: color.hex.rgb('FF4365')
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        updateColor(state, {id, rgb}) {
            return {
                ...state,
                [id]: rgb
            }
        },
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async incrementAsync(payload, rootState) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // dispatch.count.increment(payload)
        },
    }),
}
