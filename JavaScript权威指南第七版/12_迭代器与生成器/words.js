/**
 * 对字符串中的单词进行迭代
 */
function words(s) {
    let r = /\s+|$/g;
    r.lastIndex = s.match(/[^ ]/).index;
    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let start = r.lastIndex;
            if (start < s.length) {
                let match = r.exec(s);
                if (match) {
                    return {
                        value: s.substring(start, match.index);
                    }
                }
            }
            return { done: true };
        }
    };
}