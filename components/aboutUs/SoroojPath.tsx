'use client'

import { Collapse } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'

const items = [
  {
    key: '1',
    label:
      <h5 className="font-bold font-cairo">
        <FontAwesomeIcon className='ml-2' icon={faPenNib} />
        المسار الأول : سراج اليقين
      </h5>,
    children: (
      <div className="font-cairo">
        <p>
          حيث يعنى بمهمات العقيدة ومسلمات الدين، وقضايا الإيمان لتقرير الدين
          الخالص. وآلية العمل فيه تكو ن بعداد المواد العلمية والدعوية مسموعة،
          أو مقروءة، أو مرئية، موجهة لفئات المسلمين أجمعين حيث تُعنى بتأصيل ما
          ليسع المسلم جهله في العقيدة والثوابت والإيمان.
        </p>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <h5 className="font-bold font-cairo">
        <FontAwesomeIcon className='ml-2' icon={faPenNib} />
        المسار الثاني : سراج الراسخين
      </h5>
    ),
    children: (
      <div className=" font-cairo">
        <p>
          وهو يُعنى بتأصيل وتأهيل طلاب العلم والدعاة، والمرب ين والمؤثرين،
          تأصيلًا علميًّا ضمن منصة أكاديمة تعليمية وتفاعلية. وآلية العمل فيه:
          تكون بتأس يس وتطوير أكاديمية سُرُج العلمية، وفق خطة دراسية منتظمة.
        </p>
      </div>
    ),
  },
  {
    key: '3',
    label:
      <h5 className="font-bold font-cairo">
        <FontAwesomeIcon className='ml-2' icon={faPenNib} />
        المسار الثالث : سراج الأمان
      </h5>,
    children: (
      <div className=" font-cairo">
        <p>
          وهو سراج يُعنى ببراز محاسن الإسلام والأمان العقدي الذي يخاطب الف رد
          المسلم، والأسرة المسلمة وفئة الشباب، وبيان كمال الشريعة الإسلامية،
          وشمولية الإسلام ، تحصينا للمؤمن في ظل المتغيرات والشبهات المعاصرة
          وآلية العمل فيه: تكون بتوفير المنشورات الصوتية والمطبوعة والمرئية،
          التوعوية، وفتح مجالت التواصل الحديثة للإجابة عن الأسئلة والإشكالات.
        </p>
      </div>
    ),
  },
  {
    key: '4',
    label:
      <h5 className="font-bold font-cairo ">
        <FontAwesomeIcon className='ml-2' icon={faPenNib} />
        المسار الرابع : سراج الرصد
      </h5>,
    children: (
      <div className=" font-cairo">
        <p>
          رصد النشطة والمراكز التي تعنى بالمشكلات الفكرية موافقة أو مخالفة،
          وبيان آلية التعامل معها في ظل المستجدات المعاصرة وفق خطة معدة لذلك.
        </p>
      </div>
    ),
  },
]

const SoroojPath = () => {
  const defaultActiveKey = ['1'] // Define the default active key

  return (
    <Collapse
      items={items}
      defaultActiveKey={defaultActiveKey}
      expandIconPosition="end"
      expandIcon={({ isActive }) =>
        isActive ? (
          <MinusCircleOutlined style={{ fontSize: '24px', color: '#fff' }} />
        ) : (
          <PlusCircleOutlined style={{ fontSize: '24px', color: '#9F854E' }} />
        )
      }
    />
  )
}

export default SoroojPath
