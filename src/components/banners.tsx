import { fetch } from "@/services/sanity";
import { queryHero, queryClient } from "@/services/bannersService";
import { BannersProps, BannersType, Client, Hero } from "@/types/bannersType";

async function fetchData(type: BannersType): Promise<Hero | Client> {
  const query = type === "our-client" ? queryClient : queryHero;
  return fetch(query);
}

const BannersComponent: React.FC<BannersProps> = async ({ type }) => {
  const { banners } = await fetchData(type);
  if (!banners) {
    // Handle not found banners
    return null;
  }
  // console.log(banners)
  return <>{banners?.map((b) => <img src={b.url} />)}</>;
};

export default BannersComponent;
