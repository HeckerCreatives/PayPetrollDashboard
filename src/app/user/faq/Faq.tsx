import React from 'react'

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

            <div className=" flex flex-col gap-2 w-full h-auto ">
                 
                <div className="tab">
                <input type="checkbox" name="accordion-1" id="cb1" />
                <label htmlFor="cb1" className="tab__label">
                    What is Paypetroll?</label>
                <div className="tab__content text-zinc-800 ">
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ipsam dolor eligendi quaerat modi architecto voluptatum pariatur, doloremque ducimus ad officia neque facere fugiat laboriosam alias praesentium, sit maiores voluptatem.
                    </p>
                </div>
                </div>

                <div className="tab">
                <input type="checkbox" name="accordion-1" id="cb2" />
                <label htmlFor="cb2" className="tab__label">
                How can I play Paypetroll?</label>
                <div className="tab__content text-zinc-800">
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis deserunt optio aspernatur quod quis illo eum fugiat reiciendis magnam commodi perspiciatis ducimus quasi non autem vero, quo, nulla iure veniam!
                    </p>
                </div>
                </div>

                <div className="tab">
                    <input type="checkbox" name="accordion-1" id="cb3" />
                    <label htmlFor="cb3" className="tab__label">
                        How can I earn money in Paypetroll?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet molestias architecto quibusdam laudantium commodi labore minima, ut dolorem aliquam cumque ratione fugiat quis deleniti! Tempore dignissimos provident voluptate dolorem eos.

                        </p>
                    </div>
                </div>

                <div className="tab">
                    <input type="checkbox" name="accordion-1" id="cb4" />
                    <label htmlFor="cb4" className="tab__label">
                        How do I withdraw my earnings?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni mollitia necessitatibus iure cumque dolorum ipsum sed in adipisci illum? Ipsum doloribus voluptatibus quos asperiores, iste consectetur corrupti hic dolores placeat?

                        </p>
                    </div>
                </div>

                <div className="tab">
                    <input type="checkbox" name="accordion-1" id="cb5" />
                    <label htmlFor="cb5" className="tab__label">
                        How do I create an account?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odio consequatur harum nostrum unde, sed eos, numquam nesciunt nobis, ipsum facilis quasi quod quibusdam quo aperiam modi fuga dignissimos dicta!

                        </p>
                    </div>
                </div>

                <div className="tab">
                    <input type="checkbox" name="accordion-1" id="cb6" />
                    <label htmlFor="cb6" className="tab__label">
                    What types of pets can i buy?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis porro, officiis architecto nulla sint ut neque rem, est id perspiciatis praesentium dicta aut veritatis dolorum distinctio vitae atque minus. Velit!

                        </p>
                    </div>
                </div>

                <div className="tab">
                    <input type="checkbox" name="accordion-1" id="cb7" />
                    <label htmlFor="cb7" className="tab__label">
                        Can I have multiple accounts?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim quia aliquid voluptas quisquam, ducimus quos ratione libero ex deserunt, at repudiandae est nesciunt minus quae. Aliquid cum aut dolore reiciendis.

                        </p>
                    </div>
                </div>

                <div className="tab">
                    <input type="checkbox" name="accordion-1" id="cb8" />
                    <label htmlFor="cb8" className="tab__label">
                        How can I report a bug or technical problem?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto aperiam, aliquam laborum fugit itaque placeat possimus nostrum animi sint quos architecto quae adipisci vel quis inventore reprehenderit in fugiat. In.

                        </p>
                    </div>
                </div>

                <div className="tab">
                    <input type="checkbox" name="accordion-1" id="cb9" />
                    <label htmlFor="cb9" className="tab__label">
                    Can I customize my pets?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora illo dignissimos explicabo optio corrupti aliquid quidem ut alias atque animi ipsa harum enim, sint deserunt vero excepturi fugit! Nemo, velit?


                        </p>
                    </div>
                </div>

                <div className="tab">
                    <input type="checkbox" className="accordion-1" id="cb10" />
                    <label htmlFor="cb10" className="tab__label">
                    How can I invite friends to play Paypetroll?</label>
                    <div className="tab__content text-zinc-800">
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, distinctio veritatis reiciendis illum ex cumque. Eligendi fugit culpa excepturi magni quo nobis veniam beatae delectus dolor, vero sed earum eos!
                        </p>
                    </div>
                    </div>


            </div>
        </div>
  )
}
