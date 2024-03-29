import { useEffect, useState } from "react";
import { User } from "../../interfaces/user";
import api from "../../api";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPP } from "../Main";
import "./Profile.css";


export interface Props {
    userName: string | undefined;
}

export default function Followers(props: Props) {
    const [followers, setFollowers] = useState<User[] | null>(null);
    const [pp, setPP] = useState<string[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const resFollowers = await api.get(`/friends/followers/${props.userName}`);
            if (Array.isArray(resFollowers.data)) {
                setFollowers(resFollowers.data);
                const profilePhotos = await Promise.all(
                    resFollowers.data.map(async (user) => await getPP(user.Login))
                );
                setPP(profilePhotos);
            }
        };
        fetchData();
    }, []);
    return (
        <Container style={{marginTop: '4%'}}>
            <Row>
                {Array.isArray(followers) ? (followers.map((user, index) => (
                    <Col key={index} lg={4} md={6} sm={12} as={Link} to={`/profile/${user.Login}`} style={{ textDecoration: 'none' }}>
                        <Alert variant="secondary" className="my-alert">
                            <div className="media align-items-center">

                                <span
                                    style={{
                                        backgroundImage: `url(${pp.at(index)})`,
                                        width: '50px',
                                        height: '50px',
                                        display: 'inline-block',
                                        backgroundSize: 'cover',
                                        border: `2px solid ${(user?.Status === 'online') ? '#14A44D' : '#DC4C64'}`,
                                        borderRadius: '50%',
                                        borderWidth: '3px'
                                    }}
                                    className="avatar avatar-xl mr-3"></span>

                                <div className="media-body overflow-hidden">

                                    <h5 className="card-text mb-0">{user?.FirstName}</h5>
                                    <p className="card-text text-uppercase">{user?.LastName}</p>
                                    <p className="card-text">{user?.Login}</p>
                                </div>
                            </div>
                        </Alert>
                    </Col>))
                ) : null}
            </Row>
        </Container>
    );
}