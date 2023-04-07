import './App.css'
import Stopwatch from "./Stopwatch.jsx";
import Scrambler from "./Scrambler.jsx";
import TimeBoard from "./TimeBoard.jsx";


export default function App() {  
  return (
    <main>
      <div class="scramblerContainer">
        <Scrambler/>
      </div>
        <Stopwatch/>
        <TimeBoard/>
    </main>
  )
}
