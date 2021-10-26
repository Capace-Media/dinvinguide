import Ad from '../../ads/Ad';
import { renderSection } from '../../../utils/acf';

const Blocks = ({ blocks, ads, handleGallery }) => {
  return (
    <>
      {blocks.map((block, i) => {
        const mid = Math.floor(blocks.length / 2) - 2;
        if (ads) {
          if (i === mid) {
            return (
              <>
                {renderSection(block, handleGallery)}
                <div className='contain row'>
                  <Ad ads={ads} position='mid' />
                </div>
              </>
            );
          } else {
            return renderSection(block, handleGallery);
          }
        } else {
          return renderSection(block, handleGallery);
        }
      })}
    </>
  );
};

export default Blocks;
