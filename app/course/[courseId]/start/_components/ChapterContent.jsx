import React from 'react'
import YouTube from 'react-youtube'
import ReactMarcdowm from 'react-markdown'
const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

function ChapterContent({chapter,content}) {
  return (
    <div className='p-10'>
        <h1 className='font-bold text-2xl'>{chapter?.chapter_name}</h1>
        <p className='text-gray-400 mt-5'>{chapter?.about}</p>
        {/* video */}
        <div className='flex justify-center my-6'>
            <YouTube videoId={content?.videoId} opts={opts} />
        </div>

        <div>
            {content?.content.map((item,index)=>(
                <div className='p-5 bg-sky-50 mb-3 rounded-lg'>
                    <h2 className='font-md text-lg'>{item?.title}</h2>
                    <ReactMarcdowm>{item?.description}</ReactMarcdowm>
                    {item?.code&&(<div className='p-4 bg-black text-white border-purple-300 rounded-xl mt-3'>
                        <pre>
                            <code>{item?.code}</code>
                        </pre>
                    </div>)}
                </div>
            ))}
        </div>

        {/* content */}
    </div>
  )
}

export default ChapterContent