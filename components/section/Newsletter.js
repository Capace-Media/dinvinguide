import Image from 'next/image';
import ImageOne from '../../public/images/static-newsletter/nyhetsbrev-bild.png';

export default function Newsletter() {
  return (
    <div className='contain grid grid-cols-2 gap-2'>
      <div className='bg-brand-red text-brand-bg p-10 text-center flex items-center justify-center'>
        <div>
          <h2 className='text-3xl font-semibold uppercase'>Nyhetsbrev</h2>
        </div>
      </div>
      <div className='h-96 relative'>
        <Image src={ImageOne} layout='fill' objectFit='cover' />
      </div>
    </div>
  );
}
