import { useEffect, useState } from "react";
import { User } from "../interfaces/user";
import api from "../api";
import { Card, Col, Row } from "react-bootstrap";

export interface friends {
    userName: string | null;
}

export default function Friends(props: friends) {
    const [friends, setFriends] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (props.userName?.length !== 0) {
                console.log(props.userName?.length);
                const resFriend = await api.get(`/friends/usersFriend/${props.userName}`);
                if (resFriend.data.length !== 0)
                    setFriends(resFriend.data);
            }
            else {
                const resFriend = await api.get('/friends/all');
                if (resFriend.data.length !== 0)
                    setFriends(resFriend.data);
            }
        }
        fetchData();
    }, [])
    return (
        <Row>
            {friends.map((user) => (
                <Col lg={4} md={6} sm={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{user.Login}</Card.Title>
                            <Card.Text>{user.Status}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}