import './App.css'
import {useState} from "react";
import ReactConfetti from "react-confetti";

function App() {
    const randomNum:(min: number, max: number) => number = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const initNums: number[] = Array.from({length: 10}, (): number => randomNum(0, 9));
    const[num, setNum] = useState(initNums);
    const[frozen, setFrozen] = useState(Array(10).fill(false));
    const[count, setCount] = useState(0);
    const[isWin, setIsWin] = useState(false);

    const handleOnClick: ()=> void = (): void => {
        if(isWin) return;

        const newNumbs: number[] = num.map((n: number, index: number): number => (frozen[index] ? n : randomNum(0, 9)));
        setNum(newNumbs);
        setCount(count + 1);

        if(newNumbs.every((x) => x === 1)) setIsWin(true);
    }

    const toggleFreeze:(index: number) => void = (index: number): void => {
        if(isWin) return;


        setFrozen(frozen.map((freeze: number, i: number): any => (i === index ? !freeze : freeze)));
    }

  return (
    <>
        {isWin && <ReactConfetti />}
        <h1>Tenzies Game!</h1>
        <div className="board-row">
            <Square value = { num[0] } frozen = { frozen[0] } onClick={ (): void => toggleFreeze(0)  } isWin= {isWin} />
            <Square value = { num[1] } frozen = { frozen[1] } onClick={ (): void => toggleFreeze(1)  } isWin= {isWin}  />
            <Square value = { num[2] } frozen = { frozen[2] } onClick={ (): void => toggleFreeze(2)  } isWin= {isWin}  />
            <Square value = { num[3] } frozen = { frozen[3] } onClick={ (): void => toggleFreeze(3)  } isWin= {isWin}  />
            <Square value = { num[4] } frozen = { frozen[4] } onClick={ (): void => toggleFreeze(4)  } isWin= {isWin}  />
        </div>
        <div className="board-row">
            <Square value = { num[5] } frozen = { frozen[5] } onClick={ (): void => toggleFreeze(5)  } isWin= {isWin}  />
            <Square value = { num[6] } frozen = { frozen[6] } onClick={ (): void => toggleFreeze(6)  } isWin= {isWin}  />
            <Square value = { num[7] } frozen = { frozen[7] } onClick={ (): void => toggleFreeze(7)  } isWin= {isWin}  />
            <Square value = { num[8] } frozen = { frozen[8] } onClick={ (): void => toggleFreeze(8)  } isWin= {isWin}  />
            <Square value = { num[9] } frozen = { frozen[9] } onClick={ (): void => toggleFreeze(9)  } isWin= {isWin}  />
        </div>
        <div className="board-row-Gen">
            {!isWin && (<button className="button-gen" onClick={handleOnClick} disabled={isWin}>Click to generate new
                number!</button>)}
            {isWin && (<button className="button-gen-reset" onClick={(): void => window.location.reload()}>Reset</button>)}
            <p className="p-gen">Rolls: {count}</p>
        </div>
    </>
  )
}

function Square( { value, frozen, onClick, isWin }: {value: number, frozen: boolean, onClick: any, isWin: boolean} ) {
    return <button className={`button ${frozen ? 'frozen' : ''} ${isWin && value === 1 ? 'win' : ''}`} onClick={onClick} disabled={isWin}>{ value }</button>
}

export default App
