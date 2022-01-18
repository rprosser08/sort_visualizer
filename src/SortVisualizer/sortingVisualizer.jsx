import React from 'react';
import './sortingVisualizer.css';
import {quick_sort} from '../SortAlgorithms/sortingAlgorithms';

// Speed of animation in MS
const ANIMATION_SPEED = 200;
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
    quickSort(){
        const sortedArray = quick_sort(this.state.array.slice());
        const pivotComps = sortedArray[0];
        const swapComps = sortedArray[1];
        const arrayBars = document.getElementsByClassName('array-bar');
        
        /*
        for(let i = 0; i < pivotComps.length; i++){
            const barStyle1 = arrayBars[pivotComps[i][0]].style;
            const barStyle2 = arrayBars[pivotComps[i][1]].style;

            setTimeout(() => {
                barStyle1.backgroundColor = SECONDARY_COLOR;
                barStyle2.backgroundColor = TERTIARY_COLOR;
            }, ANIMATION_SPEED);
        }
        */

        for(let i = 0; i < swapComps.length; i++){
            const styleBar1 = arrayBars[swapComps[i][0]].style;
            const styleBar2 = arrayBars[swapComps[i][1]].style;

            setTimeout(() => {
                styleBar1.height = `${this.state.array[swapComps[i][1]]}px`;
                styleBar2.height = `${this.state.array[swapComps[i][0]]}px`;

                [this.state.array[swapComps[i][0]], this.state.array[swapComps[i][1]]] = [this.state.array[swapComps[i][1]], this.state.array[swapComps[i][0]]];
            }, ANIMATION_SPEED * 10);
        }

        /*
        for(let i = 0; i < animations.length; i++){
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                const barStyle1 = arrayBars[animations[i][0]].style;
                const barStyle2 = arrayBars[animations[i][1]].style;

                barStyle1.height = `${aniArray[animations[i][1]]}px`;
                barStyle2.height = `${aniArray[animations[i][0]]}px`;

                [aniArray[animations[i][0]], aniArray[animations[i][1]]] = [aniArray[animations[i][1]], aniArray[animations[i][0]]];
            }, ANIMATION_SPEED);
        }
        */
        // STILL NEED TO ADD COLOR TO PIVOT VALUE FUNCTIONALITY
    }

    mergeSort(){
        // Need to do
    }

    heapSort(){
        //Need to do
    }

    slowDown(){
        setTimeout(() => {
            // DOES NOTHING
        }, ANIMATION_SPEED * 10);
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
                <button onClick={() => this.testArray()}>Create New Array</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
            </div>
        );
    }

}

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