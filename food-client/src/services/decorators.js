export function batch(func, ms = 0, delay = false) {
    let reducedArgs = [];
    let timeout;
    let promise;
    let delayed = false;

    return (...args) => {
        reducedArgs = [...reducedArgs, ...args];

        if (timeout && delay) {
            delayed = true;
        }

        if (!timeout) {
            promise = new Promise((resolve) => {
                timeout = setTimeout(function onTimeout() {
                    if (delayed) {
                        delayed = false;
                        setTimeout(onTimeout, ms);
                    } else {
                        resolve(func(...reducedArgs));
                        reducedArgs = [];
                        timeout = null;
                    }
                }, ms);
            });
        }

        return promise;
    };
}
