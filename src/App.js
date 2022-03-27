import "./App.css";
import ButtonField from "./components/ButtonField";
import DataGridComponent from "./components/DataGridComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
      <div className="relative box-border flex flex-col m-0 h-screen w-screen bg-background">
        <Header />
        <ButtonField />
        <DataGridComponent />
        <Footer />
      </div>
  );
}
export default App;
