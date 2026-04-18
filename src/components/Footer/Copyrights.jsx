import { Col, Row, Typography } from "antd"

const Copyrights = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-[#1D263B] py-1">
            <Row>
                <Col span={24}>
                    <Typography.Paragraph className="text-center text-white! mb-0!">&copy; {year}.All Rights Reserved.</Typography.Paragraph>
                </Col>
            </Row>
        </footer>
    )
}

export default Copyrights