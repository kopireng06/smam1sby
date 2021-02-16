import React from 'react';

const Footer = () => {
    return (  
        <>
            <div className="w-full bg-gray-900">
                <div className="lg:container mx-auto grid grid-cols-12 p-5">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="text-xl font-bold text-white">SMA 1 MUHAMMADIYAH SURABAYA</div>
                        <div className="text-white text-xs pr-28 py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Harum assumenda natus quam voluptates dolorum ex 
                            delectus minima ratione, quod atque quas quos 
                            perferendis numquam sed nulla dolore! Dolor, aliquam quod!</div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-5">
                        <div className="text-lg font-bold text-white my-2">KONTAK</div>
                        <div className="h-0.5 w-10 bg-yellow-400 mb-3"></div>
                        <div className="w-full flex">
                            <img src="../image/pin.svg" className="h-5 w-5 my-1" alt=""/>
                            <span className="text-xs text-white mt-1 mx-3">Jl. Kapasan No.73 - 75, Kapasan, Kec. Simokerto Kota SBY, Jawa Timur 60135</span>
                        </div>
                        <div className="w-full flex items-center">
                            <img src="../image/email.svg" className="h-5 w-5 my-1" alt=""/>
                            <span className="text-xs text-white mx-3">smam1sby@gmail.com</span>
                        </div>
                        <div className="w-full flex items-center">
                            <img src="../image/wa.svg" className="h-5 w-5 my-1" alt=""/>
                            <span className="text-xs text-white mx-3">082236486879</span>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-3">
                        <div className="text-lg font-bold text-white my-2">YOUTUBE</div>
                        <div className="h-0.5 w-10 bg-yellow-400 mb-3"></div>
                        <div className="container-yt">
                            <iframe src="https://www.youtube.com/embed/p6_2bSprl44" frameBorder="0" allowFullScreen className="video"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-black">
                <div className="lg:container mx-auto h-8 text-center text-white pt-2 text-xs font-semibold">Copyright © SMAMSA . All Right Reserved.</div>
            </div>
        </>
    );
}
 
export default Footer;