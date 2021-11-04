import Image from 'next/image';
import ImageOne from '../../public/images/static-newsletter/nyhetsbrev-bild.png';

export default function Newsletter() {
  return (
    <div className='grid gap-2 contain lg:grid-cols-2'>
      <div className='flex items-center justify-center p-10 text-center bg-brand-red text-brand-bg'>
        <div>
          <h2 className='text-3xl font-semibold uppercase'>Nyhetsbrev</h2>
        </div>
      </div>
      <div className='relative h-96'>
        <Image
          src={ImageOne}
          layout='fill'
          objectFit='cover'
          alt='DinVinguides nyhetsbrev'
        />
      </div>
    </div>
  );
}
