import Globe from 'react-globe.gl'
import AddRoomButton from '../Components/AddRoomButton';
import './Room.css'; 
function handleClick() {
    alert("u clicked a dot")
}

function Rooms() {
    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() / 3,
        color: ['white'][Math.round(Math.random() * 3)]
    }))

    return (
        <div>
            <div>
                <Globe globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                pointsData={gData}
                pointAltitude={0}
                onPointClick={handleClick} />
            </div>
            <div id="createRoom">
                <AddRoomButton/> 
            </div>
        </div>
    )
}

export default Rooms
