import { Col, Row, Typography } from 'antd';

const Hero = () => {

    return (
        <div className="container mt-5">
            <Row>
                <Col span={24}>
                    <Typography.Paragraph className="text-center text-5xl! mb-0!">Dashboard - Home</Typography.Paragraph>
                </Col>
            </Row>
        </div>
    );
};
export default Hero;