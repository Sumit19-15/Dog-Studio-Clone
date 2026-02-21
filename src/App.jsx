import "./App.css";
import Dog from "./components/Dog";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas>
        <Dog />
      </Canvas>
    </>
  );
}

export default App;

// everything must wrap in canvas because all the R3f is used under this
