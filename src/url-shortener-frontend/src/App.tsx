import { Toaster, toast } from "sonner";
import { Routes, Route } from "react-router";
import Home from "./pages/home";
import UrlId from "./pages/url-id";

function App() {
	return (
		<>
			{/* <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
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
			</main> */}
			<Routes>
				<Route index element={<Home />} />

        <Route path=":url_id" element={<UrlId/>} />
			</Routes>

			<Toaster richColors position="bottom-center" />
		</>
	);
}

export default App;
