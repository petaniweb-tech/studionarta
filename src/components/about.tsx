import { fetch } from "@/services/sanity";
import { queryClient } from "@/services/bannersService";
import { About } from "@/types/bannersType";

async function fetchData(): Promise<About> {
  return fetch(queryClient);
}

const AboutComponent: React.FC<{}> = async () => {
  const { banners, images } = await fetchData();

  if (!banners && !images) {
    // handle not found banners or images
    return null;
  }

  // console.log(banners)
  return <>{banners?.map((b) => <img src={b.url} />)}</>;
};

export default AboutComponent;
