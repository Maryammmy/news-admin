import React, { useContext } from 'react'
import { storecontext } from '../Context/Context';
import YouTube from 'react-youtube';

export default function Title() {
  const { selected } = useContext(storecontext);
  console.log(selected)
  const extractVideoId = (link) => {
    if (link.includes('youtu.be')) {
      const videoId = link.split('youtu.be/')[1].split('?')[0];
      return videoId;
    } else if (link.includes('watch?v=')) {
      const videoId = link.split('watch?v=')[1].split('&')[0];
      return videoId;
    } else {
      console.error('Invalid YouTube link');
      return null;
    }
  };
  return (
    <div className=' w-60 bg-white my-3 shadow margin'>
      <h4 className='px-2 py-2 shadow brdr-top brdr-bottom fw-bolder'>{selected?.categoryName == 'مالتي ميديا' ? 'انفوجراف' : selected?.categoryName}</h4>
      <div className='container-fluid'>
        <div className="row py-3 px-2"  >
          <div className="col-md-12">
            <h5 className='fw-bolder'>{selected?.title}</h5>
          </div>
          <div className="col-md-12 py-1">
            <div className='w-img'>
              <img src={selected.images ? selected.images[0] : ''} alt={'Image'} />
            </div>
          </div>
          <div className="col-md-6 py-1">
            <p>{selected?.description}</p>
          </div>
          <div className="col-md-12 py-1">
            {selected?.youtubeUrl && (
              <YouTube videoId={extractVideoId(selected?.youtubeUrl)} opts={{ height: '200', width: '300', playerVars: { autoplay: 0 } }} />
            )}
          </div>
          <div className="col-md-12 py-1">
            <p>{selected?.date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
