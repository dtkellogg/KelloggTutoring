export const SUBHEADER = 'SUBHEADER'

export function subheader(text) {
    return {
        type: SUBHEADER,
        text
    }
}