import { useEffect, useState, useRef } from "react";


function MouseMove(){
const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ left: 1038, top: 200 });  
  const movedRef = useRef(false); 

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mx = event.clientX;
      const my = event.clientY;

      setX(mx);
      setY(my);

      const el = btnRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const inside =
        mx >= r.left && mx <= r.right &&
        my >= r.top && my <= r.bottom;

      if (inside && !movedRef.current) {
        movedRef.current = true;

        
        const padding = 50;
        const newLeft = Math.floor(Math.random() * (window.innerWidth - r.width - padding * 2)) + padding;
        const newTop = Math.floor(Math.random() * (window.innerHeight - r.height - padding * 2)) + padding;

        setPos({ left: newLeft, top: newTop });
      }

    
      if (!inside) movedRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <h1>Me da 200R$?</h1>
      <p>X: {x}, Y: {y}</p>

      <button className="pega"
      id="pega"
        ref={btnRef}
        style={{
          position: "fixed",
          left: pos.left,
          top: pos.top,
        }}
      >
        Não
      </button>
    </div>
  );
}

function MouseDiv({x, y}){
    if(x > 1200){
        return (
            <div style={{height: `${y}px`, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                -----IGNORED ? -----
            </div>
        )   
    }

    if(x > 500){
        return (
            <div style={{height: `${y}px`, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                -----WHY IGNORE ? -----
            </div>
        )
    }
    return (
      <div style={{height: `${y}px`, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
        ----- IGNORE -----
      </div>
    )
}

function MouseOver(){
    const [isOver, setIsOver] = useState(false)
    return (
        <button className="bnh" onMouseOver={() => setIsOver(true)} onMouseOut={() => setIsOver(false)} style={{height: '100px', width: '100px', backgroundColor: isOver ? 'black' : 'violet', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {isOver ? 'Sim' : 'Não'}
        </button>
        
    )
}


export { MouseMove, MouseOver, MouseDiv }