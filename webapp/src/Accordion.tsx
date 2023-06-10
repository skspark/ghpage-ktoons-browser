import React from 'react';
import {useState} from "react";

interface AccordionItemParams {
    data: {[key: string]: any}
}

const AccordionItem: React.FunctionComponent<AccordionItemParams> = ({data}: AccordionItemParams) => {
    const [opened, setOpened] = useState<boolean>(false);
    const handleClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <div
            {...{
                className: `accordion-item, ${opened && 'accordion-item--opened'}`,
                onClick: () => {
                    setOpened(!opened)
                }
            }}
        >
            <div {...{className: 'accordion-item__line'}}>
                <h3 {...{className: 'accordion-item__title'}}>
                    {data.keywords.join(", ")}
                </h3>
                <span {...{className: 'accordion-item__icon'}}/>
            </div>
            <div {...{className: 'accordion-item__inner'}}>
                <div {...{className: 'accordion-item__content'}}>
                    <img src={data.img} style={{ 'width': '100%' }} onClick={() => handleClick(data.url)}/>
                    <h3 style={{ marginBottom: "10px" }}>{data.title}</h3>
                    <p {...{className: 'accordion-item__paragraph'}}>
                        {data.summary}
                    </p>
                </div>
            </div>
        </div>
    )
}


interface AccordionParams {
    datas: { [key: string]: any }[]
}

const Accordion: React.FunctionComponent<AccordionParams> = ({datas}: AccordionParams) => {
    return (
        <div {...{className: 'wrapper'}}>
            <ul {...{className: 'accordion-list'}}>
                {datas.map((data, key) => {
                    return (
                        <li {...{className: 'accordion-list__item', key}}>
                            <AccordionItem data={data} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Accordion;