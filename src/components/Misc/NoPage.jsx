import { Col, Row, Typography } from 'antd'

const NoPage = () => {
    return (
        <main>
            <div className="container flex justify-center items-center mt-12">
                <Row>
                    <Col>
                        <Typography.Title level={1}>404 Page Not Found!</Typography.Title>
                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default NoPage