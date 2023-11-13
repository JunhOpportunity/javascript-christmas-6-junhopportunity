import InputView from "./InputView";

class App {
  async run() {
    const date = await InputView.readDate();
    const menu = await InputView.readMenu();
  }
}

export default App;
