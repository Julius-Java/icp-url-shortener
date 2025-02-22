import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { url_shortener_backend } from "../../../declarations/url-shortener-backend";
import { useParams } from "react-router";
import { Result } from "./home";

export default function UrlId() {
	const [loading_url, setLoadingUrl] = useState(true);
	const [error, setError] = useState(false);

	const { url_id } = useParams();

	console.log(url_id);

	async function getUrl() {
		setLoadingUrl(true);
		url_shortener_backend
			.getUrl(url_id)
			.then((response: Result) => {
				if (response.status) {
					window.location.href = response.data[0];
                    return;
				}
                console.error(response.message);
                throw new Error(response.message);
			})
			.catch((error: unknown) => {
				console.error(error);
				setError(true);
			})
			.finally(() => {
				setLoadingUrl(false);
			});
	}

	useEffect(() => {
		getUrl();
	}, []);

	return (
		<div className="flex items-center justify-center h-screen">
			{loading_url && (
				<div className="space-y-2">
					<p className="text-center italic">Redirecting...</p>
					<Loader2 className="animate-spin w-5 h-5 mx-auto text-black" />
				</div>
			)}

            {error && (
                <p className="text-center text-red-500">
                    An error occurred while redirecting. Please try again later.
                </p>
            )}
		</div>
	);
}
