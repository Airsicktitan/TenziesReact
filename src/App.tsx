import './App.css'
import {useState} from "react";
import ReactConfetti from "react-confetti";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import {map} from "react-confetti/dist/types/utils";

function App() {
    const randomNum:(min: number, max: number) => number = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const initNums: number[] = Array.from({length: 10}, (): number => randomNum(0, 9));
    const[num, setNum] = useState(initNums);
    const[frozen, setFrozen] = useState(Array(10).fill(false));
    const[count, setCount] = useState(0);
    const[isWin, setIsWin] = useState(false);
    const[playerNumber, setPlayerNumber] = useState<number>(0);
    const[isSelected, setIsSelected] = useState<boolean>(true);

    const handleOnClick: ()=> void = (): void => {
        if(isWin) return;

        const newNumbs: number[] = num.map((n: number, index: number): number => (frozen[index] ? n : randomNum(0, 9)));
        setNum(newNumbs);
        setCount(count + 1);

        if(newNumbs.every((x) => x === playerNumber)) setIsWin(true);
    }

    const toggleFreeze:(index: number) => void = (index: number): void => {
        if(isWin) return;

        setFrozen(frozen.map((freeze: number, i: number): any => (i === index ? !freeze : freeze)));
    }
    const handleSquareClick = (index: number): void => {
        if(isSelected) {
            setPlayerNumber(num[index])
            toggleFreeze(index)

            setIsSelected(false);
            console.log(playerNumber);
        }
        else {
            toggleFreeze(index);
        }
    }
  return (
    <>
        {isWin && <ReactConfetti />}
        <h1>Tenzies Game!</h1>
        <p>Select a number and get all ten squares to match!</p>
        <div className="board-row">
            {num.map((n, index) => (
                <Square
                    key={index}
                    value = {n}
                    frozen = {frozen[index]}
                    onClick={(): void => handleSquareClick(index)}
                    isWin= {isWin}
                    isSelected= {isSelected}
                    playerNumber= {playerNumber} />
                ))}
        </div>
        <div className="board-row-Gen">
            {!isWin && (<button className="button-gen" onClick={handleOnClick} disabled={playerNumber === null}>Click to generate new
                number!</button>)}
            {isWin && (<button className="button-gen-reset" onClick={(): void => window.location.reload()}>Reset</button>)}
            <p className="p-gen">Rolls: {count}</p>
        </div>
    </>
  )
}

function Square( { value, frozen, onClick, isWin, isSelected, playerNumber }: {value: number, frozen: boolean, onClick: any, isWin: boolean, isSelected: boolean, playerNumber: number} ) {
    return <button className={`button ${frozen ? 'frozen' : ''} ${isWin && value === playerNumber ? 'win' : ''} ${isSelected ? 'selecting' : ''}`} onClick={onClick} disabled={isWin}>{ value }</button>
}

export default App
