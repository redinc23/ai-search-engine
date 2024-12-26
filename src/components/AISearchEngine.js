import React, { useState } from 'react';
import { Search, Image, Code, MessageSquare, Brain, Loader2, Video } from 'lucide-react';

const AISearchEngine = () => {
  const [query, setQuery] = useState('');
  const [activeMode, setActiveMode] = useState('smart');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const modes = [
    { id: 'smart', icon: Brain, name: 'Smart Search', 
      description: 'AI-enhanced search with natural language understanding' },
    { id: 'image', icon: Image, name: 'Image Analysis', 
      description: 'Search and analyze images with AI' },
    { id: 'video', icon: Video, name: 'Video Generation', 
      description: 'Generate videos from text descriptions' },
    { id: 'code', icon: Code, name: 'Code Assistant', 
      description: 'Search and generate code snippets' },
    { id: 'chat', icon: MessageSquare, name: 'AI Chat', 
      description: 'Have a conversation about your search' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        type: activeMode,
        content: generateSampleResults(activeMode, query)
      });
      setIsLoading(false);
    }, 1000);
  };

  const generateSampleResults = (mode, query) => {
    switch (mode) {
      case 'smart':
        return {
          answer: "Here's an AI-enhanced analysis of your query...",
          sources: [
            { title: "Related Article 1", url: "#", relevance: "95%" },
            { title: "Research Paper", url: "#", relevance: "87%" }
          ]
        };
      case 'image':
        return {
          analysis: "Image analysis would show here...",
          similarImages: ["/api/placeholder/200/200", "/api/placeholder/200/200"]
        };
      case 'video':
        return {
          status: "Generating video...",
          preview: "/api/placeholder/640/360",
          details: {
            duration: "00:30",
            style: "Cinematic",
            resolution: "1080p"
          },
          generationSteps: [
            "Analyzing text description",
            "Generating storyboard",
            "Creating animation frames",
            "Adding transitions and effects",
            "Rendering final video"
          ]
        };
      case 'code':
        return {
          snippet: "console.log('Hello AI World!');",
          explanation: "This code demonstrates...",
          suggestions: ["Try using async/await", "Consider error handling"]
        };
      case 'chat':
        return {
          messages: [
            { role: "assistant", content: "How can I help you understand this topic better?" },
            { role: "user", content: query }
          ]
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">AI Search Hub</h1>
        <p className="text-center text-gray-600">Powered by Multiple AI Tools</p>
      </header>

      <div className="max-w-4xl mx-auto mb-8">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask anything..."
            />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Search className="w-6 h-6" />
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`p-4 rounded-lg border transition-all ${
              activeMode === mode.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
            }`}
          >
            <mode.icon className={`w-6 h-6 mb-2 ${
              activeMode === mode.id ? 'text-blue-500' : 'text-gray-600'
            }`} />
            <h3 className="font-semibold mb-1">{mode.name}</h3>
            <p className="text-sm text-gray-600">{mode.description}</p>
          </button>
        ))}
      </div>

      {results && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {results.type === 'smart' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">AI-Enhanced Results</h2>
                <p className="mb-4">{results.content.answer}</p>
                <h3 className="font-semibold mb-2">Sources:</h3>
                <ul className="space-y-2">
                  {results.content.sources.map((source, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <a href={source.url} className="text-blue-500 hover:underline">
                        {source.title}
                      </a>
                      <span className="text-gray-500">Relevance: {source.relevance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.type === 'image' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Image Analysis</h2>
                <p className="mb-4">{results.content.analysis}</p>
                <div className="grid grid-cols-2 gap-4">
                  {results.content.similarImages.map((img, index) => (
                    <img 
                      key={index}
                      src={img}
                      alt={`Similar image ${index + 1}`}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {results.type === 'video' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Video Generation</h2>
                <div className="mb-6">
                  <img 
                    src={results.content.preview} 
                    alt="Video preview"
                    className="w-full rounded-lg shadow-md mb-4"
                  />
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="block text-gray-600">Duration</span>
                      <span className="font-semibold">{results.content.details.duration}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="block text-gray-600">Style</span>
                      <span className="font-semibold">{results.content.details.style}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="block text-gray-600">Resolution</span>
                      <span className="font-semibold">{results.content.details.resolution}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Generation Progress</h3>
                  <div className="space-y-2">
                    {results.content.generationSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-sm">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {results.type === 'code' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Code Assistant</h2>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                  {results.content.snippet}
                </pre>
                <p className="mb-4">{results.content.explanation}</p>
                <h3 className="font-semibold mb-2">Suggestions:</h3>
                <ul className="list-disc pl-5">
                  {results.content.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-600">{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {results.type === 'chat' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">AI Chat</h2>
                <div className="space-y-4">
                  {results.content.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        message.role === 'assistant' 
                          ? 'bg-blue-50' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearchEngine;
