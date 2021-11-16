import DVLogoFooter from '../../public/images/dv-logo-footer.png';
import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className='py-20 text-center bg-brand-green text-brand-bg'>
      <div className='contain '>
        <div className='flex justify-center'>
          <div className='w-72'>
            <Image src={DVLogoFooter} alt='DinVinguide logo - sidfot' />
          </div>
        </div>
        <div className='text-center'>
          <p className='max-w-5xl mx-auto mt-5'>
            DinVinguide.se är en guide för människor som har mat, dryck, vin och
            livsnjutning som intressen. Våra namnkunniga skribenter inspirerar,
            utbildar och rapporterar om trender, nyheter och traditioner inom
            vinvärlden. Välkommen till DinVinguide.se!
          </p>

          <a
            href='https://winepublishing.se'
            className='inline-block mt-10 font-bold underline'
          >
            Kontakta oss
          </a>
        </div>
      </div>
      <div className='grid grid-cols-3 py-5 mt-10 border-t contain border-brand-bg'>
        <div className='flex justify-start'>
          {new Date().getFullYear()} © Copyright - DinVinguide.se - All rights
          reserved
        </div>
        <div className='space-x-3'>
          <a
            className='inline-block'
            href='https://www.facebook.com/dinvinguide'
            target='_blank'
            rel='noreferrer'
          >
            FB
          </a>
          <a
            className='inline-block'
            href='https://www.instagram.com/dinvinguide.se/'
            target='_blank'
            rel='noreferrer'
          >
            IG
          </a>
        </div>
        <div className='flex justify-end'>Byggd med ♥ av Capace Media</div>
      </div>
    </footer>
  );
}
