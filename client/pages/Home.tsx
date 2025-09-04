import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// HamburgerMenu Component
const HamburgerMenu = ({ tools, selectedTool, setSelectedTool }) => {
	const [open, setOpen] = useState(false);
	const [contentOpen, setContentOpen] = useState(false);
	const [advancedOpen, setAdvancedOpen] = useState(false);
	const [creatorOpen, setCreatorOpen] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="fixed top-8 left-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-transparent shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none"
				aria-label="Open menu"
			>
				<svg
					width="28"
					height="28"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#a78bfa" // Tailwind violet-400
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line x1="4" y1="7" x2="20" y2="7" />
					<line x1="4" y1="12" x2="20" y2="12" />
					<line x1="4" y1="17" x2="20" y2="17" />
				</svg>
			</button>
			{open && (
				<>
					<div className="fixed top-0 left-0 h-full w-80 bg-black shadow-2xl border-r border-violet-600/40 p-8 flex flex-col gap-4 z-50 animate-slide-in overflow-y-auto max-h-screen">
						<div className="flex justify-between items-center mb-6">
							<span className="text-xl font-bold text-violet-400">Menu</span>
							<button
								onClick={() => setOpen(false)}
								className="w-10 h-10 flex items-center justify-center rounded-full bg-[#23232a] text-violet-400 hover:bg-violet-600 hover:text-white transition-all duration-200"
								aria-label="Close menu"
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						</div>
						<div className="flex flex-col gap-2">
							{tools.map((tool) => {
								if (tool.value === "content") {
									return (
										<div key={tool.value}>
											<button
												onClick={() => setContentOpen((v) => !v)}
												className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 font-medium ${contentOpen ? 'bg-gray-800 text-white' : ''}`}
											>
												<span className="text-base">{tool.label}</span>
												<span className={`ml-auto transition-transform duration-300 ${contentOpen ? 'rotate-90' : ''}`}>▶</span>
											</button>
											<div
												className={`overflow-hidden transition-all duration-300 ${contentOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
											>
												<div className="flex flex-col gap-2 pl-6">
													{tools.filter(t => ["text","images","videos"].includes(t.value)).map(subtool => (
														<button
															key={subtool.value}
															onClick={() => {
																setSelectedTool(subtool.value);
																setOpen(false);
																if (subtool.page) navigate(subtool.page);
															}}
															className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 ${selectedTool === subtool.value ? 'bg-gray-800 text-white' : ''}`}
														>
															<span className="text-base">{subtool.label}</span>
														</button>
													))}
												</div>
											</div>
										</div>
									);
								}
								if (tool.value === "advanced") {
									return (
										<div key={tool.value}>
											<button
												onClick={() => setAdvancedOpen((v) => !v)}
												className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 font-medium ${advancedOpen ? 'bg-gray-800 text-white' : ''}`}
											>
												<span className="text-base">{tool.label}</span>
												<span className={`ml-auto transition-transform duration-300 ${advancedOpen ? 'rotate-90' : ''}`}>▶</span>
											</button>
											<div
												className={`overflow-hidden transition-all duration-300 ${advancedOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
											>
												<div className="flex flex-col gap-2 pl-6">
													{tools.filter(t => ["content-sync","ai-personas","realtime-collab","repurposing","ethical-ai","cloud-sec"].includes(t.value)).map(subtool => (
														<button
															key={subtool.value}
															onClick={() => {
																setSelectedTool(subtool.value);
																setOpen(false);
																if (subtool.page) navigate(subtool.page);
															}}
															className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 ${selectedTool === subtool.value ? 'bg-gray-800 text-white' : ''}`}
														>
															<span className="text-base">{subtool.label}</span>
														</button>
													))}
												</div>
											</div>
										</div>
									);
								}
								if (tool.value === "creator") {
									return (
										<div key={tool.value}>
											<button
												onClick={() => setCreatorOpen((v) => !v)}
												className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 font-medium ${creatorOpen ? 'bg-gray-800 text-white' : ''}`}
											>
												<span className="text-base">{tool.label}</span>
												<span className={`ml-auto transition-transform duration-300 ${creatorOpen ? 'rotate-90' : ''}`}>▶</span>
											</button>
											<div
												className={`overflow-hidden transition-all duration-300 ${creatorOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
											>
												<div className="flex flex-col gap-2 pl-6">
													{tools.filter(t => ["social","promo","slides","image-editing","collab"].includes(t.value)).map(subtool => (
														<button
															key={subtool.value}
															onClick={() => {
																setSelectedTool(subtool.value);
																setOpen(false);
																if (subtool.page) navigate(subtool.page);
															}}
															className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 ${selectedTool === subtool.value ? 'bg-gray-800 text-white' : ''}`}
														>
															<span className="text-base">{subtool.label}</span>
														</button>
													))}
												</div>
											</div>
										</div>
									);
								}
								if (["text","images","videos","content-sync","ai-personas","realtime-collab","repurposing","ethical-ai","cloud-sec","social","promo","slides","image-editing","collab"].includes(tool.value)) {
									return null;
								}
								return (
									<button
										key={tool.value}
										onClick={() => {
											setSelectedTool(tool.value);
											setOpen(false);
											if (tool.page) navigate(tool.page);
										}}
										className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 ${selectedTool === tool.value ? 'bg-gray-800 text-white' : ''}`}
									>
										{/* Optionally add an icon here if available: <Icon className="h-5 w-5 mr-2" /> */}
										<span className="text-base">{tool.label}</span>
									</button>
								);
							})}
						</div>
					</div>
					{/* Overlay to close menu when clicking outside, z-40 so sidebar stays above */}
					<div
						className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
						onClick={() => setOpen(false)}
					/>
				</>
			)}
		</>
	);
};

const TOOLS = [
	{ label: "Home", value: "home", page: "/" },
	{ label: "Content Tools", value: "content", page: "/content-tools" },
	{ label: "Creator Tools", value: "creator", page: "/creator-tools" },
	{ label: "Advanced", value: "advanced", page: "/advanced" },
	{ label: "Text", value: "text", page: "/text" },
	{ label: "Images", value: "images", page: "/images" },
	{ label: "Videos", value: "videos", page: "/videos" },
	{ label: "Image Editing", value: "image-editing", page: "/image-editing" },
	{ label: "Content Sync", value: "content-sync", page: "/content-sync" },
	{ label: "AI Personas", value: "ai-personas", page: "/ai-personas" },
	{ label: "Real-time Collab", value: "realtime-collab", page: "/realtime-collab" },
	{ label: "Repurposing", value: "repurposing", page: "/repurposing" },
	{ label: "Ethical AI", value: "ethical-ai", page: "/ethical-ai" },
	{ label: "Cloud Sec", value: "cloud-sec", page: "/cloud-sec" },
	{ label: "Social Posts", value: "social", page: "/social" },
	{ label: "Promo Videos", value: "promo", page: "/promo-video" },
	{ label: "Notes to Slides", value: "slides", page: "/notes-to-slides" },
	{ label: "Team Collab", value: "collab", page: "/realtime-collab" },
	{ label: "History", value: "history", page: "/history" },
];

export default function Home() {
	const [showPrompt, setShowPrompt] = useState(false);
	const [selectedTool, setSelectedTool] = useState("text");
	const [input, setInput] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => setShowPrompt(true), 4000);
		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const tool = TOOLS.find((t) => t.value === selectedTool);
		console.log("Form submitted:", { selectedTool, input, tool });
		if (tool && input.trim()) {
			const navigationUrl = `${tool.page}?prompt=${encodeURIComponent(input)}`;
			console.log("Navigating to:", navigationUrl);
			navigate(navigationUrl);
			setShowPrompt(false);
		}
	};

	return (
		<div className="fixed inset-0 w-screen h-screen">
			<Spline
				scene="https://prod.spline.design/x7i5df0lVdNqAf-o/scene.splinecode"
				style={{ width: "100vw", height: "100vh" }}
			/>
			{/* Prompt Box Overlay */}
			{showPrompt && (
				<form
					className="absolute left-1/2 bottom-24 transform -translate-x-1/2 w-[700px] max-w-[95vw] bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] bg-opacity-95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-violet-500/40 p-6 flex flex-col items-center z-20 transition-all duration-300 hover:scale-[1.01] hover:shadow-violet-700/40 hover:border-violet-400/60"
					onSubmit={handleSubmit}
					autoComplete="off"
				>
					{/* Header */}
					<div className="w-full flex items-center justify-between mb-4">
					</div>

					{/* Input Section */}
					<div className="w-full flex gap-4 mb-4">
						{/* Enhanced Tool Selector */}
						<div className="relative group">
							<select
								value={selectedTool}
								onChange={(e) => setSelectedTool(e.target.value)}
								className="appearance-none px-4 py-3 pr-10 rounded-2xl bg-gradient-to-r from-[#1e1e3f] to-[#2a2a5a] text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 border border-violet-600/50 shadow-lg transition-all duration-300 hover:border-violet-400 hover:shadow-violet-500/25 cursor-pointer min-w-[120px]"
							>
								{TOOLS.filter(tool => [
									"text",
									"images",
									"videos",
									"social",
									"promo",
									"slides",
									"image-editing"
								].includes(tool.value)).map((tool) => (
									<option
										key={tool.value}
										value={tool.value}
										className="bg-[#1e1e3f] text-white py-2"
									>
										{tool.label}
									</option>
								))}
							</select>

							{/* Custom dropdown arrow */}
							<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-violet-300 group-hover:text-violet-200 transition-colors duration-200"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>

							{/* Glow effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
						</div>

						{/* Enhanced Input Field */}
						<div className="flex-1 relative group">
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="How can I assist you today?"
								className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1e1e3f]/80 to-[#2a2a5a]/80 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 border border-violet-600/50 shadow-lg transition-all duration-300 hover:border-violet-400 hover:shadow-violet-500/25 backdrop-blur-sm"
							/>

							{/* Input glow effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
						</div>
					</div>

					{/* Button Section */}
					<div className="flex w-full justify-end">
						<button
							type="submit"
							className="px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 text-white font-semibold shadow-lg border-none hover:from-violet-700 hover:via-fuchsia-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 relative overflow-hidden group flex items-center justify-center"
							tabIndex={0}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 pointer-events-none"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
							</svg>
							{/* Removed 'Send' text */}
							<div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none"></div>
						</button>
					</div>

					{/* Bottom decoration */}
					<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent rounded-full"></div>
				</form>
			)}

			<HamburgerMenu
				tools={TOOLS}
				selectedTool={selectedTool}
				setSelectedTool={setSelectedTool}
			/>
		</div>
	);
}
