import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, Check } from "lucide-react";
import { Toaster, toast } from "sonner";
import { url_shortener_backend } from "../../../declarations/url-shortener-backend";

export type Result = {
	data: any;
	status: boolean;
	message: string;
};

export default function Home() {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);

	async function handleShorten() {
		setLoading(true);
		setShortUrl("");
		url_shortener_backend
			.shorten_url(url)
			.then((response: Result) => {
				setShortUrl(response.data[0]);
				toast.success(response.message);
				setUrl("");
			})
			.catch((error: unknown) => {
				console.error(error);
				toast.error("An error occurred");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
		setCopied(true);
		toast.success("Copied!", {
			description: "Short URL copied to clipboard.",
		});
		setTimeout(() => setCopied(false), 2000);
	};


	return (
		<main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
			<Card className="w-full max-w-md p-10 bg-white shadow-lg rounded-2xl">
				<CardContent className="space-y-4">
					<h2 className="text-2xl font-semibold text-center">
						URL Shortener
					</h2>
					<Input
						type="url"
						placeholder="Enter your valid URL here"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className="p-2 border rounded-md w-full"
					/>
					<Button
						className="w-full flex items-center justify-center gap-2"
						onClick={handleShorten}
						disabled={loading || !isValidUrl(url)}
					>
						{loading ? (
							<Loader2 className="animate-spin w-5 h-5" />
						) : (
							"Shorten URL"
						)}
					</Button>
					{shortUrl && (
						<div className="p-3 bg-gray-200 rounded-lg flex items-center justify-between">
							<a
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 font-medium"
							>
								{shortUrl.length > 30
									? shortUrl.slice(0, 30) + "..."
									: shortUrl}
							</a>
							<Button
								size="icon"
								variant="ghost"
								onClick={handleCopy}
							>
								{copied ? (
									<Check className="w-5 h-5 text-green-500" />
								) : (
									<Copy className="w-5 h-5" />
								)}
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</main>
	);
}
