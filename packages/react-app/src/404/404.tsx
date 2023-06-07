import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.module.css";

const App: React.FC = () => {
  return (
    <Container>
        
    <div className="container">
      <h1>An error as occured.</h1>
      <h1>
        {" "}
        <span className="ascii">(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <Link to="home">Go Home</Link>
    </div>
    </Container>
  );
};

export default App;
