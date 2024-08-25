export const TitleSpliter = (text: string) => {
    if (text.length > 20) {
        return `${text.slice(0, 20)}...`
    }

    return text
}

export const TextSpliter = (text: string) => {
    if (text.length > 130) {
        return `${text.slice(0, 130)}...`
    }

    return text
}