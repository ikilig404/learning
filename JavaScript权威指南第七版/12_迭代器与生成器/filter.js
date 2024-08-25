function filter(iterable,  predicate) {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            for(;;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    }
}