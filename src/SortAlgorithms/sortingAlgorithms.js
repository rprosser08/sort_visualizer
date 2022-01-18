function partition(array, start, end, pivotComps, swapValues){
    const pivotValue = array[end];
    let pivotIdx = start;
    let i = start;

    for(i; i < end; i++){
        if(array[i] < pivotValue){
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            swapValues.push([i, pivotIdx]);
            pivotIdx++;
        }
    }
    swapValues.push([i, pivotIdx]);
    [array[pivotIdx], array[end]] = [array[end], array[pivotIdx]];
    return pivotIdx;
}


export function quick_sort(array){
    const swapValues = [];
    const pivotComps = [];
    let stack = [];

    stack.push(0);
    stack.push(array.length - 1);

    while(stack[stack.length - 1] >= 0){
        let end = stack.pop();
        let start = stack.pop();

        let pivot = partition(array, start, end, pivotComps, swapValues);

        if(pivot - 1 > start){
            stack.push(start);
            stack.push(pivot - 1);
        }
        if(pivot + 1 < end){
            stack.push(pivot + 1);
            stack.push(end);
        }
    }
    console.log(swapValues);
    return [pivotComps, swapValues];
}