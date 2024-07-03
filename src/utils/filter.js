export const filterWords = (words, query) => {
    return words.filter((entry) => {
        return entry.word.toLowerCase().includes(query.toLowerCase());
    });
};

export const filterOws = (ows, alphabet, query) => {
    return ows.filter(
        (entry) =>
            entry.ows.some((w) => w.word.toLowerCase().startsWith(alphabet.toLowerCase())) &&
            entry.ows.some((w) => w.word.toLowerCase().includes(query.toLowerCase()))
    );
};

export const filterIdioms = (idioms, query) => {
    return idioms.filter((entry) => entry.idiom.toLowerCase().includes(query.toLowerCase()));
};
