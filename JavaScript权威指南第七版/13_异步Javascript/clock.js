function clock(interval, max=Infinity) {
    function until(time) {
        return new Promise(resolve => setTimeout(resolve, time - Date.now()));
    }

    return {
        startTime: Date.now(),
        count: 1,
        async next() {
            if (this.count > max) {
                return { done: true };
            }

            let targetTime = this.startTime + this.count * interval;
            await until(targetTime);
            return { value: this.count++ };
        },
        [Symbol.asyncIterator]() { return this; }
    };
}