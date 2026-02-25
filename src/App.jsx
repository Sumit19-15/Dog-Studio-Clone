import "./App.css";
import Dog from "./components/Dog";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <main>
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1,
            backgroundImage: "url(/background-xxs.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Dog />
        </Canvas>
        <section id="section-1"></section>
        <section id="section-2"></section>
        <section id="section-3"></section>
      </main>
    </>
  );
}

export default App;

// everything must wrap in canvas because all the R3f is used under this
