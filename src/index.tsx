import { StatusBar, View } from "react-native";
import ImageGrid from "./screens/ImageGrid";

const App = ():JSX.Element => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />
      <ImageGrid />
    </>
  )
};

export default App;
