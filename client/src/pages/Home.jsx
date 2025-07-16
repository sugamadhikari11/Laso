import React, { useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton, Navbar } from '../components';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion'

const Home = () => {

    const snap = useSnapshot(state);

    useEffect(() => {
    state.canvasOffsetRight = snap.intro;
    }, [snap.intro]);

  return (
    <AnimatePresence>
        {snap.intro &&(
            <motion.section id='Home' className="home" {...slideAnimation('left')}>
                <motion.header {...slideAnimation("down")}>
                    {/* <img
                        src='./threejs.png'
                        alt="logo"
                        className="w-8 h-8 object-contain"
                    /> */}
                    <Navbar/>
                </motion.header>

                <motion.div className='home-content' {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                            LASO <br className='xl:block hidden'/>
                        </h1>
                        <h2 className='slogan-text'>Wear Your Vision — Designed by You, Perfected by Us.</h2>
                    </motion.div>
                    <motion.div>
                        <p className='max-w-md font-normal text-gray-600 text-base mb-6'>Create and Customize your own Jersey with our tool.
                            <strong> Unleash your Potential</strong>{" "} and define your own style.
                        </p>
                       <div className="flex justify-center md:justify-start">
                        <CustomButton
                            type="filled"
                            title="Customize It"
                            handleClick={()=> {
                                state.intro = false;
                                state.canvasOffsetRight = false; // reset when going to Customizer

                            }}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm flex}"
                           />
                        </div>
                    </motion.div>
                   </motion.div>

                  
            </motion.section>

        )}
        
    </AnimatePresence>
     
  )
}

export default Home

