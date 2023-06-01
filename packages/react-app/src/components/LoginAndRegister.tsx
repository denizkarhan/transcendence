import { Button, Container, Stack } from "react-bootstrap";


const App: React.FC = () => {
    return (
        <div className="App">
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="outline-info" size="lg" className="mb-2" style={{ width: '400px' }} href="/login">
                        Sign In
                    </Button>
                    <Button variant="outline-info" size="lg" className="mt-2" style={{ width: '400px' }} href="/register">
                        Sign Up
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}

export default App;