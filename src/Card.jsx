import car from './assets/nissan.jpg'
function Card(){
    return(
        <>

        <div className='text'>
         <h2>Cars</h2>
        </div>
        <div className='father-card'>
        <div className="card">
            <img className='img' src={car} alt="image"></img>
            <h2 className="h2">copi</h2>
            <p>A very hot coffe</p>
            <button>Learn More</button>
        </div>

        <div className="card">
            <img className='img' src={car} alt="image"></img>
            <h2>copi</h2>
            <p>A very hot coffe</p>
             <button>Learn More</button>
        </div>
        
        <div className="card">
            <img className='img' src={car} alt="image"></img>
            <h2>copi</h2>
            <p>A very hot coffe</p>
             <button>Learn More</button>
        </div>

        <div className="card">
            <img className='img' src={car} alt="image"></img>
            <h2>copi</h2>
            <p>A very hot coffe</p>
             <button>Learn More</button>
        </div>

        <div className="card">
            <img className='img' src={car} alt="image"></img>
            <h2>copi</h2>
            <p>A very hot coffe</p>
             <button>Learn More</button>
        </div>

        <div className="card">
            <img className='img' src={car} alt="image"></img>
            <h2>copi</h2>
            <p>A very hot coffe</p>
             <button>Learn More</button>
        </div>

        <div className="card">
            <img className='img' src={car} alt="image"></img>
            <h2>copi</h2>
            <p>A very hot coffe</p>
             <button>Learn More</button>
        </div>

        
        
        </div>
        
        </>
    );
}
export default Card