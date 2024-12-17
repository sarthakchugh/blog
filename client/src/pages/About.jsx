import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { AiOutlineGithub } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';

const About = () => {
    return (
        <div className="md:mt-8 flex flex-col items-center justify-center px-4 py-8">
            <div className="max-w-4xl w-full flex flex-col items-center text-center">
                {/* Image Placeholder */}
                <div className="w-64 h-64 mb-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500">Profile Image</span>
                </div>

                {/* About Me Text */}
                <div className="max-w-xl">
                    <p className="text-sm md:text-base text-gray-600 text-center">Hi there! I'm</p>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Sarthak Chugh</h1>
                    <p className="text-sm md:text-base text-gray-600 mb-4 text-justify">
                        I'm a passionate Full Stack Developer with a keen eye for creating robust, scalable,
                        and user-friendly web applications. I have a strong background in web development,
                        with 4 years of experience in the software industry, specializing in the MERN stack
                        (MongoDB, Express.js, React, Node.js). I'm passionate about developing scalable web
                        applications and working on challenging projects. With a strong foundation in both
                        frontend and backend technologies, I transform complex problems into elegant digital
                        solutions.
                    </p>
                    <p className="text-sm md:text-base text-gray-600 mb-4 text-justify">
                        I enjoy working with modern web technologies and continuously learning new skills to
                        stay at the forefront of web development.
                    </p>

                    {/* Links */}
                    <div className="flex justify-center space-x-4 mt-6">
                        <a
                            href="https://github.com/sarthakchugh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2 items-center cursor-pointer bg-black hover:bg-black/80 text-white px-4 py-2 rounded transition duration-300"
                        >
                            <AiOutlineGithub className="w-5 h-5" /> GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sarthak-chugh-3245ab236/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer flex gap-2 items-center bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
                        >
                            <BsLinkedin className="w-5 h-5" /> LinkedIn
                        </a>
                        <a
                            href="https://sarthakchugh.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2 items-center cursor-pointer bg-[#121212] hover:bg-[#121212]/80 text-white px-4 py-2 rounded transition duration-300"
                        >
                            <TbWorld className="w-5 h-5" /> Portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
