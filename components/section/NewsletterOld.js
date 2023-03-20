import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import ImageOne from "../../public/images/static-newsletter/nyhetsbrev-bild.png";

export default function NewsletterOld() {
  const [email, setEmail] = useState("");

  return (
    <div className="grid gap-2 contain lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-10 text-center bg-brand-red text-brand-bg">
        <div>
          <h2 className="mb-3 text-3xl font-semibold uppercase">Nyhetsbrev</h2>
          <p>
            <strong>Registrera dig för vårt inspirerande nyhetsbrev</strong> och
            få information om inspirerande artiklar, exklusiva viner,
            erbjudanden samt innehåll om alkoholhaltiga drycker. (Du kan när som
            helst avregistrera dig).
          </p>
        </div>
        <div>
          <form
            action={"https://app.mailerlite.com/webforms/submit/g6z4j7"}
            data-code="g6z4j7"
            method="POST"
            target="_blank"
            className="flex flex-col mt-5 text-white"
          >
            <input
              type="text"
              name="fields[email]"
              id="email"
              placeholder="Skriv din e-postadress här"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-center text-white placeholder-white bg-transparent border-b-2"
            />
            <input type="hidden" name="ml-submit" value="1" />
            {email && (
              <button type="submit" className="w-full px-3 py-2 mt-3 border-2">
                Jag är över 25 år och accepterar mailutskick
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="relative h-96">
        <Image
          src={ImageOne}
          layout="fill"
          objectFit="cover"
          alt="DinVinguides nyhetsbrev"
        />
      </div>
    </div>
  );
}
