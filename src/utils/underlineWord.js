export function underlineWord(text, word) {
    const regex = new RegExp(`(${word}(?:ing|ed|ly|s)?)`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
        regex.test(part) ? (
            <span key={index} className="underlined">
                {part}
            </span>
        ) : (
            part
        )
    );
}
