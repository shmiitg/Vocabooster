export const filterWords = (words, query) => {
    return words.filter((entry) => {
        return (
            entry.word.toLowerCase().includes(query.toLowerCase()) ||
            entry.meanings.some(
                (meaning) =>
                    meaning.definition?.toLowerCase().includes(query.toLowerCase()) ||
                    meaning.synonyms.some((synonym) =>
                        synonym.toLowerCase().includes(query.toLowerCase())
                    ) ||
                    meaning.antonyms.some((antonym) =>
                        antonym.toLowerCase().includes(query.toLowerCase())
                    ) ||
                    meaning.example?.toLowerCase().includes(query.toLowerCase())
            )
        );
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

export const filterSpellings = (spellings, query) => {
    return spellings.filter((entry) => entry.spelling.toLowerCase().includes(query.toLowerCase()));
};
