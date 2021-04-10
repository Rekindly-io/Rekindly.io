import ReactGlobe from "react-globe";
import AddRoomButton from "../Components/AddRoomButton";
import "./Room.css";
import markers from "../Components/globe/markers";
import markerRenderer from "../Components/globe/markerRenderer";

function handleClick(e) {
  alert("u clicked a dot");
  alert(e.target);
}

function HomePage() {
  const N = 300;
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: ["white"][Math.round(Math.random() * 3)],
  }));

  const options = {
    markerRenderer,
  };
  /*<Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          pointsData={gData}
          pointAltitude={0}
          onPointClick={handleClick}

        />*/
  return (
    <div>
      <AddRoomButton />

      <div>
        <ReactGlobe
          height="100vh"
          globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
          markers={markers}
          width="100vw"
          options={options}
        />
      </div>
    </div>
  );
}

export default HomePage;
