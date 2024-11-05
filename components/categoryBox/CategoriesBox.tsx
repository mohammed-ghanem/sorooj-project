"use client"
import { MailOutlined } from '@ant-design/icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '1',
        label: <span className='text-red-900'>القسم الرئيسيى</span>,
        icon: <FontAwesomeIcon icon={faBook} />,
        children: [
            {
                key: 'g1',
                type: 'group',
                children: [
                    { key: '1', label: 'القسم الفرعى' },
                    { key: '2', label: 'القسم الفرعى' },
                    { key: '3', label: 'القسم الفرعى' },
                    {
                        key: '4', label: 'القسم الفرعى',
                        children: [
                            { key: '1', label: 'القسم الفرعى الفرعى' },
                        ]
                    },
                ],
            },
        ],
    },
    {
        key: '2',
        label: 'القسم الرئيسيى',
        icon: <FontAwesomeIcon icon={faBook} />,
        children: [
            {
                key: 'g1',
                type: 'group',
                children: [
                    { key: '1', label: 'القسم الفرعى' },
                    { key: '2', label: 'القسم الفرعى' },
                    { key: '3', label: 'القسم الفرعى' },
                    {
                        key: '4', label: 'القسم الفرعى',
                        children: [
                            { key: '1', label: 'القسم الفرعى الفرعى' },
                        ]
                    },
                ],
            },
        ],
    },
];




const CategoriesBox: React.FC = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1' , '2']}
            mode="inline"
            items={items}
        />
    );
};

export default CategoriesBox;