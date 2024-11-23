'use client';

import { Collapse } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const items = [
    {
        key: '1',
        label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
        children: (
            <div className=' font-cairo'>
                <p className='mainColor font-bold text-base'>الجواب :</p>
                <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
            </div>
        ),
    },
    {
        key: '2',
        label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
        children: (
            <div className=' font-cairo'>
                <p className='mainColor font-bold text-base'>الجواب :</p>
                <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
            </div>
        ),
    },
    {
        key: '3',
        label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
        children: (
            <div className=' font-cairo'>
                <p className='mainColor font-bold text-base'>الجواب :</p>
                <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
            </div>
        ),
    },
    {
        key: '4',
        label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
        children: (
            <div className=' font-cairo'>
                <p className='mainColor font-bold text-base'>الجواب :</p>
                <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
            </div>
        ),
    },
    {
        key: '5',
        label: <h5 className='font-bold font-cairo'>ما أحكام خدمة الوالدين عند العجز عن خدمة أنفسهما ؟</h5>,
        children: (
            <div className=' font-cairo'>
                <p className='mainColor font-bold text-base'>الجواب :</p>
                <p>فخدمة الوالدين عند حاجتهما إليها، وعجزهما عن القيام عليها بالنفس، أو بالمال حق واجب على أولادهما جميعا -ذكورهم، وإناثهم- إما أن يقوموا بالخدمة بأنفسهم، أو يستأجروا من يقوم بخدمتهما إن حصلت الكفاية بذلك.</p>
            </div>
        ),
    },

];

const Answers = () => {
    const defaultActiveKey = ['1']; // Define the default active key

    return (
        <Collapse
            items={items}
            defaultActiveKey={defaultActiveKey}
            expandIconPosition="end"
            expandIcon={({ isActive }) =>
                isActive
                    ? <MinusCircleOutlined style={{ fontSize: '24px', color: "#9F854E" }} />
                    : <PlusCircleOutlined style={{ fontSize: '24px', color: "#9F854E" }} />
            }
        />
    );
};

export default Answers;