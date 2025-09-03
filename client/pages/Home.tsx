import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TOOLS = [
	{ label: "Text", value: "text", page: "/text" },
	{ label: "Images", value: "images", page: "/images" },
	{ label: "Videos", value: "videos", page: "/videos" },
	{ label: "Audio", value: "audio", page: "/audio" },
	{ label: "Social Posts", value: "social", page: "/social" },
	{ label: "Promo Videos", value: "promo", page: "/promo-video" },
	{ label: "Notes to Slides", value: "slides", page: "/notes-to-slides" },
	{ label: "Team Collab", value: "collab", page: "/realtime-collab" },
];

export default function Home() {
	const [showPrompt, setShowPrompt] = useState(false);
	const [selectedTool, setSelectedTool] = useState(TOOLS[0].value);
	const [input, setInput] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => setShowPrompt(true), 4000);
		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const tool = TOOLS.find((t) => t.value === selectedTool);
		if (tool && input.trim()) {
			navigate(`${tool.page}?prompt=${encodeURIComponent(input)}`);
		}
	};

	return (
		<div className="fixed inset-0 w-screen h-screen">
			<Spline
				scene="https://prod.spline.design/qbjH4XaqahY0Zi-k/scene.splinecode"
				style={{ width: "100vw", height: "100vh" }}
			/>
			{/* Prompt Box Overlay */}
			{showPrompt && (
				<form
					className="absolute left-1/2 bottom-24 transform -translate-x-1/2 w-[600px] max-w-full bg-[#18181b] bg-opacity-90 rounded-2xl shadow-lg border border-[#23232a] p-6 flex flex-col items-center z-20"
					onSubmit={handleSubmit}
				>
					<div className="w-full flex gap-2 mb-4">
						<select
							value={selectedTool}
							onChange={(e) => setSelectedTool(e.target.value)}
							className="px-4 py-3 rounded-xl bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
						>
							{TOOLS.map((tool) => (
								<option key={tool.value} value={tool.value}>
									{tool.label}
								</option>
							))}
						</select>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Ask Fusion to build a full featured, production-read"
							className="flex-1 px-4 py-3 rounded-xl bg-[#23232a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
						/>
					</div>
					<div className="flex w-full justify-start gap-2">
						<button
							type="submit"
							className="px-4 py-2 rounded-lg bg-[#23232a] text-white border border-[#23232a] hover:bg-[#2e2e38] transition"
						>
							Send
						</button>
						<button className="px-4 py-2 rounded-lg bg-[#23232a] text-white border border-[#23232a] hover:bg-[#2e2e38] transition">
							+ Attach
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
