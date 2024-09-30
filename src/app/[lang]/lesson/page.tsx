import { getDictionary } from "../dictionaries";


type Props = {
    params: { lang: string };
  };
  
const page = async ({ params }: Props) => {

    const { lang } = params;

    const dict = await getDictionary(lang);
    return (
        <div>{dict.pages.lesson.title}</div>
    )
}

export default page