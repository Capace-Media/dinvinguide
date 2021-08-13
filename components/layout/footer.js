import DVLogoFooter from '../../public/images/dv-logo-footer.png';
import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className='bg-brand-green text-brand-bg text-center py-20'>
      <div className='contain '>
        <div className='flex justify-center'>
          <div className='w-72'>
            <Image src={DVLogoFooter} />
          </div>
        </div>
        <div className='text-center'>
          <p className='max-w-5xl mt-5 mx-auto'>
            DinVinguide.se är en guide för människor som har mat, dryck, vin och
            livsnjutning som intressen. Våra namnkunniga skribenter inspirerar,
            utbildar och rapporterar om trender, nyheter och traditioner inom
            vinvärlden. Välkommen till DinVinguide.se!
          </p>
          <Link href='/kontakt'>
            <a className='mt-10 inline-block font-bold underline'>
              Kontakta oss
            </a>
          </Link>
        </div>
      </div>
      <div className='contain border-t border-brand-bg grid grid-cols-3 mt-10 py-5'>
        <div className='flex justify-start'>
          {new Date().getFullYear()} © Copyright - DinVinguide.se - All rights
          reserved
        </div>
        <div className='flex justify-center'>FB IG</div>
        <div className='flex justify-end'>Byggd med ♥ av Capace Media</div>
      </div>
    </footer>
  );
}
