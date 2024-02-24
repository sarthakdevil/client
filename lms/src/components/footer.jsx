import {BsFacebook,BsLinkedin,BsTwitter,BsInstagram} from 'react-icons/bs'

function Footer() {
    return (
        <footer className='relative left-0 bottom-0 h-[10vh] flex flex-column sm:flex-row items-center justify-between text-white bg-gray-800 py-5 sm:px-50'>
            <section className='text-lg'>
        copyright all rights reserved  &copy;{new Date().getFullYear()}
            </section>
            <section className='flex items-center justify-center gap-5 text-2xl text-white'>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsFacebook/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsTwitter/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsLinkedin/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                <BsInstagram/>
            </a>

            </section>
        </footer>
    );
}

export default Footer;