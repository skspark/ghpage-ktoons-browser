import React, {useEffect, useState} from 'react';
import './App.css';
import './Accordion'
import Accordion from "./Accordion";
import NextButton from "./NextButton";

const DATA_META_PATH = process.env.PUBLIC_URL + '/datas/k-toons-meta.json'
const DATA_ROOT_PATH = process.env.PUBLIC_URL + '/datas/k-toons'
const DATA_FILES_LIMIT = 5

function App() {
    const [allDatas, setAllDatas] = useState<any[][]>([])
    const [currentDataIdx, setCurrentDataIdx] = useState<number>(0)

    const reloadAllDatas = () => {
        fetch(DATA_META_PATH)
            .then(resp => resp.json())
            .then(data => {
                const files = data['files']
                const randomFiles = shuffle(files).slice(0, Math.min(files.length, DATA_FILES_LIMIT))
                const fileFetchPromises = randomFiles
                    .map(item => fetch(DATA_ROOT_PATH + "/" + item).then(resp => resp.json()))

                // fetch file contents, concat, chunk
                Promise.all(fileFetchPromises)
                    .then(results => {
                        const concatenatedArray = results
                            .reduce((acc, arr) => acc.concat(arr), []);
                        setAllDatas(chunked(shuffle(concatenatedArray), 4));
                        setCurrentDataIdx(0)
                    })
            })
    }

    const handleRefreshButtonClick = () => {
        if (!allDatas) {
            return
        }
        setCurrentDataIdx(currentDataIdx + 1);
    }

    useEffect(() => {
        reloadAllDatas()
    }, [])

    return (
        <div className="App">
            {
                (allDatas && allDatas.length > currentDataIdx) ? (
                        <div className={"content"}>
                            <Accordion datas={allDatas[currentDataIdx]}/>
                        </div>
                    )
                    : (<div>loading..</div>)
            }
            <div className={"footer"}>
                {(allDatas.length > currentDataIdx) ? (
                    <NextButton onClick={handleRefreshButtonClick}/>
                ) : (<div/>)}
            </div>
        </div>
    );
}

function chunked<Type>(li: Type[], chunk: number): Type[][] {
    const subarrays: Type[][] = [];
    let tempArray: Type[] = [];
    for (const item of shuffle(li)) {
        tempArray.push(item);
        if (tempArray.length === chunk) {
            subarrays.push(tempArray);
            tempArray = [];
        }
    }
    if (tempArray.length > 0) {
        subarrays.push(tempArray);
    }
    return subarrays;
}

function shuffle<Type>(li: Type[]): Type[] {
    const randomIndices = generateRandomList(li.length);
    const newLi: Type[] = [];
    for (let i = 0; i < li.length; i++) {
        newLi.push(li[randomIndices[i]]);
    }
    return newLi;
}

function generateRandomList(n: number): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < n; i++) {
        numbers.push(i);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }
    return numbers;
}


export default App;
