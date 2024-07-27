import Link from "next/link";

export default function Contact() {
  return (
    <section className="w-full bg-cover bg-center bg-bgcontact h-screen mb-28 flex items-center justify-center my-auto px-sectionpxsm lg:px-sectionpxlg">
      <div className="flex w-full items-center justify-center lg:justify-start">
        <div className="flex flex-col w-full lg:w-[36%] h-auto px-11 pt-12 lg:pt-14 pb-14 lg:pb-16 gap-9 bg-white">
          <div className="flex flex-col gap-3">
            <h5 className="text-2xl text-black font-medium">Studionarta.</h5>
            <p className="text-[13px] text-black opacity-65 leading-relaxed font-supportingfont">
              Studionarta is a creative studio based in Malang and Jakarta that
              values creativity and design excellence
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h5 className="text-2xl text-black font-medium">Contact.</h5>
            <div className="flex flex-col gap-2">
              <p className="text-[13px] text-neutral-500 font-supportingfont">
                CP -{" "}
                <span className="text-black hover:underline">
                  <Link href="https://wa.me/628123024660">
                    Devina +62 812 3024 660
                  </Link>
                </span>{" "}
                (WhatsApp Only)
              </p>
              <p className="text-[13px] text-neutral-500 font-supportingfont">
                Email -{" "}
                <span className="text-black hover:underline">
                  <Link href={"mailto:hello@studionarta.com"} target="_blank">
                    hello@studionarta.com
                  </Link>
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h5 className="text-2xl text-black font-medium">Follow Us.</h5>
            <Link
              href="https://www.instagram.com/studionarta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pb-2">
                <p className="text-[13px] text-black opacity-65 font-supportingfont">
                  Instagram
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
