import {Canvas} from '@react-three/fiber';
import {Environment, Center} from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import { useSnapshot } from 'valtio';
import state from '../store';


const CanvasModel = () => {
  const snap = useSnapshot(state)

  return (
    <div className={`w-full h-full transition-all ease-in overflow-hidden ${
      snap.intro ? 'xlplus:ml-40 mt-30' : ''
    }`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 0], fov: 30 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
    </div>
  )
}


export default CanvasModel