/**
 * Return a new array with the elements of `iterable` randomly shuffled using
 * the Fisher-Yates algorithm.
 *
 * Prefer this over `array.sort(() => Math.random() - 0.5)`, which is both
 * biased (it does not produce a uniform permutation) and mutates in place.
 *
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {T[]} a new shuffled array (the input is not modified)
 */
export function shuffle(iterable) {
    const result = [...iterable];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
