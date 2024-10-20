'use client';

import { Collapse } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const items = [
    {
        key: '1',
        label: 'ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟',
        children: <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>,
    },
    {
        key: '2',
        label: 'Panel 2',
        children: <p>Content for panel 2</p>,
    },
    {
        key: '3',
        label: 'Panel 3',
        children: <p>Content for panel 3</p>,
    },
];

const Answers = () => {
    const defaultActiveKey = ['1']; // Define the default active key

    return (
        <Collapse
            defaultActiveKey={defaultActiveKey}
            expandIconPosition="end"
            // Instead of using items, define the panels inline to have full control over expandIcon per panel
            expandIcon={({ isActive }) =>
                isActive
                    ? <MinusCircleOutlined style={{ fontSize: '24px', color: "#9F854E" }} />
                    : <PlusCircleOutlined style={{ fontSize: '24px', color: "#9F854E" }} />
            }
        >
            {items.map((item) => (
                <Collapse.Panel className='font-cairo bkColor'
                    header={<h5 className='font-bold'>{item.label}</h5>}
                    key={item.key}>
                    <p className='mainColor font-bold text-lg'>الجواب :</p>
                    {item.children}
                </Collapse.Panel>
            ))}
        </Collapse>
    );
};

export default Answers;
