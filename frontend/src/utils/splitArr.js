export function splitArrayInThree(arr) {
    
    const result = [[], [], []];
    const size = Math.ceil(arr.length / 3);

    for (let i = 0; i < arr.length; i++) {
        const index = Math.floor(i / size);
        result[index].push(arr[i]);
    }

    return result;
}