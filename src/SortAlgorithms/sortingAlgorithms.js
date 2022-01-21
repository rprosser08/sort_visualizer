// List of all the split arrays used in the merge sort algorithm
// Used to make the switches on the screen
export const mergeHelper = [];

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
    return [pivotComps, swapValues];
}

function mergeArrays(left, right){
    let retVal = [];

    while(left.length && right.length){
        if(left[0] < right[0]){
            retVal.push(left.shift());
        }
        else{
            retVal.push(right.shift());
        }
    }
    while(left.length){
        retVal.push(left.shift());
    }
    while(right.length){
        retVal.push(right.shift());
    }

    mergeHelper.push(retVal.slice());


    return retVal;
}

export function merge_sort(array){
    const half = array.length / 2;

    if(array.length < 2){
        mergeHelper.push(array.slice());
        return array;
    }

    const left = array.splice(0, half);

    return mergeArrays(merge_sort(left), merge_sort(array));
}

function heapify(array, size, i){
    let largest = i;
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;

    if(leftChild < size && array[leftChild] > array[largest]){
        largest = leftChild;
    }

    if(rightChild < size && array[rightChild] > array[largest]){
        largest = rightChild;
    }

    if(largest !== i){
        let temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        heapify(array, size, largest);
    }
}

export function heap_sort(array){
    let size = array.length;
    let halfLen = Math.floor(size / 2 - 1);
    let forSize = size - 1;

    for(let i = halfLen; i >=0; i--){
        heapify(array, size, i);
    }

    for(let i = forSize; i >= 0; i--){
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        heapify(array, i, 0);
    }
}
