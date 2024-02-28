import React from 'react'
import { JellyBounceLoader,HelixLoader,GooeyCircleLoader,LinneardLoader,GooeyLoader1 } from 'react-loaders-kit';

function MobileFilter() {
  const loaderProps = {
    loading:true,
    size: 100,
    duration: 0.8,
    // colors: ['#39a0fa', '#39a0fa','#39a0fa','#39a0fa'],
    // colors:['#5e22f0', '#f6b93b','#39a0fa'],
    colors:['#5e22f0', '#f6b93b'],
    // numberOfDots:50,

}
  return (
    <div style={{width:"900px",height:"300px", border:"1px solid black"}}>
      <GooeyLoader1 {...loaderProps} />
    </div>
  )
}

export default MobileFilter