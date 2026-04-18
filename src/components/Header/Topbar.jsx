import { Col, Row, Typography } from 'antd'

const Topbar = () => {
    return (
        <header className='bg-[#1D263B]'>
            <Row>
                <Col span={24}>
                    <Typography.Paragraph className='text-center text-white! mb-0!'>Welcome to our website! We're glad you're here.I hope you have a wonderful day.</Typography.Paragraph>
                </Col>
            </Row>
        </header>
    )
}

export default Topbar