import React from 'react';
import './sortingVisualizer.css';
import {quick_sort} from '../SortAlgorithms/sortingAlgorithms';

// Speed of animation in MS
const ANIMATION_SPEED = 10;
const FILL_SPEED = 5;
// Number of bars in the array
const NUMBER_OF_BARS = 310;
const PRIMARY_COLOR = 'blue';
const SECONDARY_COLOR = 'red';
const TERTIARY_COLOR = 'green';
const MIN_VALUE = 5;
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

    testArray(){
        const array = [];
        array.push(30,20,40,10,50,70,60,200,30,50,60,70,90);
        this.setState({array});
        for(let i = 0; i < this.state.array.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor =  PRIMARY_COLOR;
        }
    }

    resetArray(){
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

    /* Working quckSort algorithm, but how to make it show the animation */
    /* Do I have it return the two pivots? (Maybe can be done with the   */
    /* Helper function?)                                                 */
    /* Could have it return an array of every comparison it made and     */
    /* then use that to know which animaiton to do with the colors etc.  */
    async quickSort(){
        const sortedArray = quick_sort(this.state.array.slice());
        const pivotComps = sortedArray[0];
        const swapComps = sortedArray[1];
        const arrayBars = document.getElementsByClassName('array-bar');

        for(let i = 0; i < swapComps.length; i++){
            const styleBar1 = arrayBars[swapComps[i][0]].style;
            const styleBar2 = arrayBars[swapComps[i][1]].style;

            styleBar1.height = `${this.state.array[swapComps[i][1]]}px`;
            styleBar1.backgroundColor = SECONDARY_COLOR;
            styleBar2.height = `${this.state.array[swapComps[i][0]]}px`;
            styleBar2.backgroundColor = SECONDARY_COLOR;

            [this.state.array[swapComps[i][0]], this.state.array[swapComps[i][1]]] = [this.state.array[swapComps[i][1]], this.state.array[swapComps[i][0]]];

            await delay(ANIMATION_SPEED);

            styleBar1.backgroundColor = PRIMARY_COLOR;
            styleBar2.backgroundColor = PRIMARY_COLOR;
        }

        for(let i = 0; i < this.state.array.length; i++){
            const styleBar = arrayBars[i].style;
            styleBar.backgroundColor = TERTIARY_COLOR;
            await delay(FILL_SPEED);
        }

        await delay(300);

        for(let i = 0; i < this.state.array.length; i++){
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor = PRIMARY_COLOR;
        }

        // STILL NEED TO ADD COLOR TO PIVOT VALUE FUNCTIONALITY
    }

    mergeSort(){
        // Need to do
    }

    heapSort(){
        //Need to do
    }

    async slowDown(){
        const a1 = [1,2,3,4,5];
        for(let i = 0; i < a1.length; i++){
            console.log(a1[i]);
            await delay(1000);
        }
    }

    // Testings Sorting Algorithms 
    // Need to add back the test button 
    testSortingAlgos(){
        for(let i = 0; i < 100; i++){
            const array = [];
            const length = getRandomInt(1, 1000);
            for(let j = 0; j < length; j++){
                array.push(getRandomInt(-1000,1000));
            }
            const jsSortedArray = array.slice().sort((a,b) => a - b);
            const quickSortedArray = quick_sort(array.slice());
            console.log(sortedTest(jsSortedArray, quickSortedArray));
        }
    }

    testSetTimeout(){
        let a1 = Array(1,2,3,4,5)
        for(let i = 0; i < a1.length; i++){
            setTimeout(function(){
                console.log(a1[i]);
            }, ANIMATION_SPEED * 10);
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
            </div>
        );
    }

}

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