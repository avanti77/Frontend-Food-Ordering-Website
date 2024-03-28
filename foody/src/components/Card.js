import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  let data= useCart();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleAddToCart = async () => {
  let food = []
  for (const item of data) {
    if (item.id === foodItem._id) {
      food = item;

      break;
    }
  }
  if (food !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
       else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return 
  }

  await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name,price:finalPrice, qty: qty, size: size })
  // console.log(data)

  }
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
    let finalPrice = qty * parseInt(options[size]); 
  return (
    <div>
        <div>
            <div className="card mt-3" style={{"width": "20%", "maxHeight": "360px"}}>
                <img className="card-img-top" src={props.ImgSrc} alt="Card image cap" style={{ height: "150px", objectFit: "fill" }}/>
                <div class="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    {/* <p className="card-text">hey! Aman Gupta</p> */}
                <div className='container w-100'>
                    <select className='m-2  h-100 bg-success rounded' onChange={handleQty}>
                    {Array.from(Array(6), (e,i)=>{
                            return(
                              <option key={i+1} value= {i+1}> {i+1} </option>
                            )
                    })}
                    </select>

                    <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onChange={handleOptions}>
                      {priceOptions.map((i) => {
                        return <option key={i} value={i}>{i}</option>
                      })}
                    </select>
                    <div className='d-inline h-100 fs-5'>
                      ₹{finalPrice}/-
                    </div>

                </div>
                    
            </div>
            <hr></hr>
            <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>

            </div>
      </div>

    </div>
  );
}
