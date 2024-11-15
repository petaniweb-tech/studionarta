import Link from "next/link";
import Image from "next/image";

// Import Assets //
import igLogo from "@/assets/images/ig-logo.png";
import linkedinLogo from "@/assets/images/linkedin.png";
export default function ContactUs() {
  return (
    <section className="w-full bg-cover bg-center bg-bgcontact h-screen mb-28 flex items-center justify-center my-auto px-sectionpxsm lg:px-sectionpxlg">
      <div className="flex w-full items-center justify-center lg:justify-start">
        <div className="flex flex-col w-full lg:w-[50%] h-auto px-11 pt-12 lg:pt-14 pb-14 lg:pb-16 gap-9 bg-white">
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
                CP01 -{" "}
                <span className="text-black hover:underline">
                  <Link href="https://wa.me/628123024660">
                    Devina +62 812 3024 660
                  </Link>
                </span>{" "}
                (WhatsApp Only)
              </p>
              <p className="text-[13px] text-neutral-500 font-supportingfont">
                CP02 -{" "}
                <span className="text-black hover:underline">
                  <Link href="https://wa.me/6281803383993">
                    Dio +62 818 0338 3993
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

          <div className="flex flex-col w-full h-full">
            <h5 className="text-xl 2xl:text-2xl text-black font-medium">
              Office Studio
            </h5>
            <p className="text-sm 2xl:text-base text-neutral-500 font-supportingfont mt-3">
              Malang - Raya Wendit Barat No. 7, Malang, 65154
            </p>
            <p className="text-sm 2xl:text-base text-neutral-500 font-supportingfont mt-3">
              Jakarta - Pakubuwono VI No. 70, Jakarta Selatan, 12120
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h5 className="text-2xl text-black font-medium">Follow Us.</h5>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/studionarta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-fit">
                  <Image
                    src={igLogo}
                    alt={`Instagram`}
                    priority={false}
                    width={25}
                    height={25}
                    quality={100}
                  />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/in/studionarta-1b0a87307/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-fit">
                  <Image
                    src={linkedinLogo}
                    alt={`Linkedin`}
                    priority={false}
                    width={25}
                    height={25}
                    quality={100}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
