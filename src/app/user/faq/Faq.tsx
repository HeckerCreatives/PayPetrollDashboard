import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from '@/app/data/data'


export default function Faq() {
  return (
    <div className="content grid grid-cols-1 gap-4 md:grid-cols-2 py-12 text-white">
            <div className=" h-full w-full">
                 <div className=" flex flex-col gap-4 items-center">
                    <h2 className=" text-2xl font-bold" >FAQ</h2>
                    <p className=" text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni error optio repellendus vel facilis sequi, reprehenderit dolor mollitia nobis, labore provident delectus consectetur saepe facere quidem obcaecati deserunt officiis voluptatibus?
                    </p>

                    <img src="/hero2.png" className=" w-full" />
                    </div>
            </div>

            <section id="faq" className="w-full py-12 flex items-center justify-center bg-white rounded-md">
                <div className="container px-4 md:px-6 text-black">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-4xl text-center mb-10">
                    Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className=" whitespace-pre-wrap text-sm text-start text-zinc-500">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} className=" text-start " />

                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </div>
            </section>
        </div>
  )
}
