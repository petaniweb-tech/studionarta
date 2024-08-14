import { sanityClient } from "@/services/sanity";
import { ConfigurationDataType } from "@/types/configuration";

export const queryConfiguration = `
  *[_type == "configCodeAndExpiryDate" && code == $code && expiryDate > now()][0]{
    code,
    expiryDate
  }
`;

export const fetchConfiguration = async (
	code: string
): Promise<ConfigurationDataType | null> => {
	try {
		const config = await sanityClient.fetch<ConfigurationDataType>(
			queryConfiguration,
			{ code }
		);
		return config;
	} catch (error) {
		console.error("Error fetching configuration:", error);
		return null;
	}
};
