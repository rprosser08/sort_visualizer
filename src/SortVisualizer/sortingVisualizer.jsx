import React from 'react';
import './sortingVisualizer.css';
import {quick_sort, merge_sort, mergeHelper, heap_sort, heapList, bubble_sort, bubbleHelper, insertion_sort, insertionHelper} from '../SortAlgorithms/sortingAlgorithms';

// Speed of animation in MS
const ANIMATION_SPEED = 10;
const FILL_SPEED = 5;
// Number of bars in the array
const NUMBER_OF_BARS = 310;
const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';
const TERTIARY_COLOR = 'green';
// Minimum value represented by height of the bars
const MIN_VALUE = 5;
// Maximum value reprsented by the height of the bars
const MAX_VALUE = 700;

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
        //this.testArray();
    }

    // Smaller array to test the sorting algorithms on
    testArray(){
        const array = [];
        array.push(200,30,20,40,10,50,70,60,30,50,60,70,90);
        this.setState({array});
        for(let i = 0; i < this.state.array.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor =  PRIMARY_COLOR;
        }
    }

    resetArray(){
        mergeHelper.length = 0;
        heapList.length = 0;
        bubbleHelper.length = 0;
        insertionHelper.length = 0;
        const array = [];
        for(let i = 0; i < NUMBER_OF_BARS; i++){
            array.push(getRandomInt(MIN_VALUE, MAX_VALUE));
        }
        for(let i = 0; i < this.state.array.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor =  PRIMARY_COLOR;
        }
        this.setState({array});
    }

    async quickSort(){
        const sortedArray = quick_sort(this.state.array.slice());
        const swapComps = sortedArray[1];
        const arrayBars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < swapComps.length; i++){
            const styleBar1 = arrayBars[swapComps[i][0]].style;
            const styleBar2 = arrayBars[swapComps[i][1]].style;

            styleBar1.height = `${this.state.array[swapComps[i][1]]}px`;
            styleBar1.backgroundColor = SECONDARY_COLOR;
            styleBar2.height = `${this.state.array[swapComps[i][0]]}px`;
            styleBar2.backgroundColor = SECONDARY_COLOR;

            let start = swapComps[i][1] + 1;
            let end = swapComps[i][0];

            // Sets all the bars inbetween the two being swapped to also be the SECONDARY_COLOR
            for(start; start <= end; start++){
                const barsStyle = arrayBars[start].style;
                barsStyle.backgroundColor = SECONDARY_COLOR;
            }

            // Swap the values in the actual array
            [this.state.array[swapComps[i][0]], this.state.array[swapComps[i][1]]] = [this.state.array[swapComps[i][1]], this.state.array[swapComps[i][0]]];

            await delay(ANIMATION_SPEED);

            styleBar1.backgroundColor = PRIMARY_COLOR;
            styleBar2.backgroundColor = PRIMARY_COLOR;
        }

        this.finishedSorting();
    }

    async mergeSort(){
        // The middle index of the original array
        const halfLen = Math.floor(this.state.array.length / 2);
        // Copy of the original array unchanged
        const helperArray = this.state.array.slice();
        let kReset = -1;
        let oneCounter = 0;
        let twoCounter = 0;
        let k = -1;
        let half = 0;
        merge_sort(this.state.array.slice());
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < mergeHelper.length; i++){

            // To tell which half is currenlty be sorted
            if(half === 1){
                kReset = halfLen - 1;
                k = kReset;
                half++;
            }

            // Setting value of which bars to change in the array back to either 0 or the middle index
            for(let j = 0; j < mergeHelper[i].length; j++){
                if(mergeHelper[i].length <= 2){
                    k = kReset;
                    oneCounter = 0;
                    continue;
                }

                /* Sets the value where the bars get changed back to 0           */
                /* (used know when the whole first half is being sorted at once) */
                if(mergeHelper[i].length === halfLen && oneCounter === 0 && half === 0){
                    kReset = -1;
                    k = kReset;
                    oneCounter++;
                    half++;
                }

                /* Sets the value where the bars get changed to the middle index */
                /* (used to know when the whole second half is being sorted)     */
                if(mergeHelper[i].length >= halfLen && oneCounter === 0 && half > 0){
                    console.log(mergeHelper[i]);
                    console.log(halfLen)
                    kReset = halfLen - 1;
                    k = kReset;
                    oneCounter++;
                }

                /* Sets the value where the bars get changed back to 0 */
                /* (used to know when the whole array is being sorted) */
                if(mergeHelper[i].length === helperArray.length && twoCounter === 0){
                    k = -1;
                    twoCounter++;
                }

                k++
                const styleBar = arrayBars[k].style;
                styleBar.height = `${mergeHelper[i][j]}px`;
                styleBar.backgroundColor = SECONDARY_COLOR;

                await delay(ANIMATION_SPEED);

                styleBar.backgroundColor = PRIMARY_COLOR;
            }
        }

        this.finishedSorting();
    }

    async heapSort(){
        let sortedArray = this.state.array.slice();
        heap_sort(sortedArray);
        const arrayBars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < heapList.length; i++){
            const bar1Style = arrayBars[heapList[i][0][1]].style;
            const bar2Style = arrayBars[heapList[i][1][1]].style;

            // Shows which two bars are being compared and will be swapped
            const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

            bar1Style.backgroundColor = color;
            bar2Style.backgroundColor = color;

            bar1Style.height = `${heapList[i][0][0]}px`;
            bar2Style.height = `${heapList[i][1][0]}px`;

            await delay(ANIMATION_SPEED);
        }

        this.finishedSorting();
    }

    async bubbleSort(){
        let sortedArray = this.state.array.slice();
        bubble_sort(sortedArray);
        const arrayBars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < bubbleHelper.length; i++){
            const bar1Style = arrayBars[bubbleHelper[i][0][1]].style;
            const bar2Style = arrayBars[bubbleHelper[i][1][1]].style;

            const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

            bar1Style.backgroundColor = color;
            bar2Style.backgroundColor = color;

            bar1Style.height = `${bubbleHelper[i][0][0]}px`;
            bar2Style.height = `${bubbleHelper[i][1][0]}px`;

            await delay(ANIMATION_SPEED);
        }

        this.finishedSorting();
    }

    async insertionSort(){
        let sortedArray = this.state.array.slice();
        insertion_sort(sortedArray);
        const arrayBars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < insertionHelper.length; i++){
            const bar1Style = arrayBars[insertionHelper[i][0][1]].style;
            const bar2Style = arrayBars[insertionHelper[i][1][1]].style;
            const bar3Style = arrayBars[insertionHelper[i][2][0]].style;

            bar1Style.backgroundColor = SECONDARY_COLOR;
            bar2Style.backgroundColor = SECONDARY_COLOR;
            bar3Style.backgroundColor = TERTIARY_COLOR;

            bar1Style.height = `${insertionHelper[i][0][0]}px`;
            bar2Style.height = `${insertionHelper[i][1][0]}px`;

            await delay(ANIMATION_SPEED);

            bar1Style.backgroundColor = PRIMARY_COLOR;
            bar2Style.backgroundColor = PRIMARY_COLOR;
        }
        const lastBarStyle = arrayBars[this.state.array.length - 1].style;
        lastBarStyle.backgroundColor = PRIMARY_COLOR;

        this.finishedSorting();
    }

    async slowDown(){
        const a1 = [1,2,3,4,5];
        for(let i = 0; i < a1.length; i++){
            console.log(a1[i]);
            await delay(1000);
        }
    }

    async finishedSorting(){
        const size = this.state.array.length
        const arrayBars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < size; i++){
            const style = arrayBars[i].style;
            style.backgroundColor = TERTIARY_COLOR;
            await delay(FILL_SPEED);
        }

        await delay(300);

        for(let i = 0; i < size; i++){
            const style = arrayBars[i].style;
            style.backgroundColor = PRIMARY_COLOR;
        }
    }

    /* Testings Sorting Algorithms 
       Need to add back the test button */
    testSortingAlgos(){
        for(let i = 0; i < 100; i++){
            const array = [];
            const length = getRandomInt(1, 1000);
            for(let j = 0; j < length; j++){
                array.push(getRandomInt(-1000,1000));
            }
            const jsSortedArray = array.slice().sort((a,b) => a - b);
            // Change to which sorting algo you're testing
            //const bubbleSortedArray = bubble_sort(array.slice());
            //console.log(heapSortedArray);
            let testArray = array.slice();
            insertion_sort(testArray);
            //console.log(testArray);
            //console.log(jsSortedArray);
            console.log(sortedTest(jsSortedArray, testArray));
        }
    }

    render(){
        const {array} = this.state;
        return(
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor:PRIMARY_COLOR,
                            height: `${value}px`
                        }}></div>
                ))}
                <br></br>
                <button onClick={() => this.resetArray()}>Create New Array</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
            </div>
        );
    }

}

// To help slow down the sorting algorithms
const delay = async(ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

function getRandomInt(min, max){
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// To test sorting algorithms
function sortedTest(a1, a2){
    if(a1.length !== a2.length) return false;
    for(let i = 0; i < a1.length; i++){
        if(a1[i] !== a2[i]) return false;
    }
    return true;
}