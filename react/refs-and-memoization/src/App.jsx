import VideoPlayer from "./components/VideoPlayer";
import Page from "./components/Page";
import CatFriends from "./components/CatFriends";
import PageSearch from "./components/PageSearch/PageSearch";
import "./App.css";

function App() {
  return (
    <>
      <VideoPlayer />
      <Page />
      <CatFriends />
      <PageSearch />
    </>
  );
}

export default App;
