import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { IoMdMenu, IoMdClose, IoIosLogIn } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
                <img src={Logo} alt="Sarthak's Blog Logo" className="w-8 h-8" />
                <span className="font-bold text-xl">Sarthak's Blog</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 lg:gap-16">
                <Link to="/">Home</Link>
                <Link to="/posts?sort=trending">Trending</Link>
                <Link to="/saved">Saved</Link>
                <Link to="/about">About</Link>
                <SignedOut>
                    <Link to="/login">
                        <button className="px-4 py-2 bg-black text-white rounded-lg flex gap-2 items-center">
                            Login <IoIosLogIn className="text-white w-6 h-6" />
                        </button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            <div className="md:hidden cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
                {open ? <IoMdClose className="w-8 h-8" /> : <IoMdMenu className="w-8 h-8" />}
            </div>
            <div
                className={`${
                    open ? '-left-0' : '-left-[100%]'
                } bg-[#AFDBF5] absolute top-16 w-full h-screen flex flex-col gap-8 font-medium text-lg items-center justify-center transition-all ease-in-out duration-300 z-10`}
            >
                <Link to="/" onClick={() => setOpen((prev) => !prev)}>
                    Home
                </Link>
                <Link to="/new" onClick={() => setOpen((prev) => !prev)}>
                    Write
                </Link>
                <Link to="/posts?sort=trending" onClick={() => setOpen((prev) => !prev)}>
                    Trending
                </Link>
                <Link to="/saved" onClick={() => setOpen((prev) => !prev)}>
                    Saved Posts
                </Link>
                <Link to="/" onClick={() => setOpen((prev) => !prev)}>
                    About
                </Link>
                <SignedOut>
                    <Link to="/login" onClick={() => setOpen((prev) => !prev)}>
                        <button className="px-4 py-2 bg-black text-white rounded-lg flex gap-2 items-center">
                            Login <IoIosLogIn className="text-white w-6 h-6" />
                        </button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default Navbar;
