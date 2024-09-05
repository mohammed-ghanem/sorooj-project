import { Flex, Progress } from 'antd';
const ProgressBar: React.FC = () => {
    return (
        <Flex gap="small" wrap>
            <Progress type="circle" percent={0} />
            <Progress type="circle" percent={75} gapDegree={30} />
        </Flex>
    )
}

export default ProgressBar

